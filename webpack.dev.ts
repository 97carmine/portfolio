import { resolve } from "path";
import ESLintPlugin from "eslint-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import CopyPlugin from "copy-webpack-plugin";
import { transform } from "@formatjs/ts-transformer";

const commonRules = (client: boolean) => [
	{
		test: /\.tsx?$/i,
		use: {
			loader: "ts-loader",
			options: {
				getCustomTransformers() {
					return { before: [transform({ removeDefaultMessage: true, ast: true })] };
				},
			},
		},
	},
	{
		test: /\.(pdf|png|webp)$/i,
		type: "asset/resource",
		generator: { filename: "assets/[name][ext]", emit: client },
	},
	{
		test: /\.(s[ac]|c)ss$/i,
		use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }, { loader: "sass-loader" }],
	},
];

const commonPlugins = (client: boolean) => [
	new ESLintPlugin({ extensions: ["ts", "tsx"], fix: true }),
	new StylelintPlugin({ fix: true }),
	new MiniCssExtractPlugin({
		filename: client ? "css/[name].css" : "static/css/[name].css",
		chunkFilename: client ? "css/[chunkhash].chunk.css" : "static/css/[chunkhash].chunk.css",
	}),
];

const commonConfig = {
	mode: "development",
	watch: true,
	devtool: "inline-source-map",
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
		fallback: { crypto: false }, // https://github.com/dequelabs/axe-core-npm/issues/210
	},
};

const serverConfig = {
	...commonConfig,
	target: "node",
	entry: { server: resolve(__dirname, "src/server/index.ts") },
	output: {
		path: resolve(__dirname, "build"),
		publicPath: "/",
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
	},
	module: { rules: [...commonRules(false)] },
	plugins: [
		...commonPlugins(false),
		new CopyPlugin({
			patterns: [{ from: "src/server/web/views", to: "views" }],
		}),
	],
	externals: { express: 'require("express")' },
};

const clientConfig = {
	...commonConfig,
	entry: { client: resolve(__dirname, "src/client/index.tsx") },
	output: {
		path: resolve(__dirname, "build/static"),
		publicPath: "/",
		filename: "js/[name].js",
		chunkFilename: "js/[name].chunk.js",
	},
	module: {
		rules: [...commonRules(true)],
	},
	plugins: [
		...commonPlugins(true),
		new FaviconsWebpackPlugin({
			logo: "src/common/assets/images/logo.png",
			cache: true,
			outputPath: resolve(__dirname, "build/static"),
		}),
		new WebpackAssetsManifest({ output: "asset-manifest.json", publicPath: true }),
	],
};

const config = [clientConfig, serverConfig];

export default config;
