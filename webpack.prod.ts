import { resolve } from "path";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
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
		generator: { filename: "assets/[name].[contenthash][ext]", emit: client },
	},
	{
		test: /\.(s[ac]|c)ss$/i,
		use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }, { loader: "sass-loader" }],
	},
];

const commonPlugins = (client: boolean) => [
	new MiniCssExtractPlugin({
		filename: client ? "css/[name].[contenthash].css" : "static/css/[name].[contenthash].css",
		chunkFilename: client ? "css/[name].[chunkhash].chunk.css" : "static/css/[name].[chunkhash].chunk.css",
	}),
];

const commonConfig = {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			() => ({ extractComments: false, terserOptions: { format: { comments: false } } }),
			`...`,
			new CssMinimizerPlugin({ minimizerOptions: { preset: ["default", { discardComments: { removeAll: true } }] } }),
		],
	},
	resolve: { extensions: [".js", ".ts", ".tsx"] },
};

const serverConfig = {
	...commonConfig,
	target: "node",
	entry: { server: resolve(__dirname, "src/server/index.ts") },
	output: {
		path: resolve(__dirname, "build"),
		publicPath: "/",
		filename: "[name].js",
		chunkFilename: "[name].[chunkhash].chunk.js",
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
		filename: "js/[name].[contenthash].js",
		crossOriginLoading: "anonymous",
		chunkFilename: "js/[name].[chunkhash].chunk.js",
	},
	module: { rules: [...commonRules(true)] },
	plugins: [
		...commonPlugins(true),
		new FaviconsWebpackPlugin({
			logo: "src/common/assets/images/logo.png",
			mode: "light",
			cache: true,
			outputPath: resolve(__dirname, "build/static"),
		}),
		new WebpackAssetsManifest({
			output: "asset-manifest.json",
			publicPath: true,
			integrity: true,
			integrityHashes: ["sha512"],
		}),
	],
};

const config = [clientConfig, serverConfig];

export default config;
