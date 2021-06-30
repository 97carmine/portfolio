import { resolve } from "path";
import { Compiler, Configuration, WebpackPluginInstance } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { transform } from "@formatjs/ts-transformer";

const commonRules = (client: boolean) => [
	{
		test: /\.ts(|x)$/i,
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
		use: [
			{ loader: MiniCssExtractPlugin.loader },
			{ loader: "css-loader" },
			{ loader: "sass-loader", options: { implementation: require("sass") } },
		],
	},
];

const commonPlugins = (client: boolean): WebpackPluginInstance[] => [
	new ESLintPlugin({ fix: true }),
	new StylelintPlugin({ fix: true }),
	(compiler: Compiler) => {
		const MiniCssExtractPlugin = require("mini-css-extract-plugin");
		new MiniCssExtractPlugin({
			filename: client ? "css/[name].css" : "static/css/[name].css",
			chunkFilename: client ? "css/[chunkhash].chunk.css" : "static/css/[chunkhash].chunk.css",
		}).apply(compiler);
	},
];

const commonConfig: Configuration = {
	mode: "development",
	watch: true,
	devtool: "inline-source-map",
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
		fallback: { crypto: false }, // https://github.com/dequelabs/axe-core-npm/issues/210
	},
};

const serverConfig: Configuration = {
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
		(compiler: Compiler) => {
			const CopyPlugin = require("copy-webpack-plugin");
			new CopyPlugin({
				patterns: [{ from: "src/server/web/views", to: "views" }],
			}).apply(compiler);
		},
	],
	externals: { express: 'require("express")' },
};

const clientConfig: Configuration = {
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
		(compiler: Compiler) => {
			const WebpackAssetsManifest = require("webpack-assets-manifest");
			new WebpackAssetsManifest({ output: "asset-manifest.json", publicPath: true }).apply(compiler);
		},
	],
};

const config: Configuration[] = [clientConfig, serverConfig];

export default config;
