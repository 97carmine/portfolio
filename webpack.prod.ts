import { resolve } from "path";
import { Configuration, WebpackPluginInstance } from "webpack";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
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
		generator: { filename: "assets/[name].[contenthash][ext]", emit: client },
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
	new MiniCssExtractPlugin({
		filename: client ? "css/[name].[contenthash].css" : "static/css/[name].[contenthash].css",
		chunkFilename: client ? "css/[chunkhash].chunk.css" : "static/css/[chunkhash].chunk.css",
	}),
];

const commonConfig: Configuration = {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			() => ({ extractComments: false, terserOptions: { format: { comments: false } } }),
			`...`,
			() => ({ minimizerOptions: { preset: ["default", { discardComments: { removeAll: true } }] } }),
		],
	},
	resolve: { extensions: [".js", ".ts", ".tsx"] },
};

const serverConfig: Configuration = {
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
		(compiler) => {
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
		filename: "js/[name].[contenthash].js",
		crossOriginLoading: "anonymous",
		chunkFilename: "js/[name].[chunkhash].chunk.js",
	},
	module: { rules: [...commonRules(true)] },
	plugins: [
		...commonPlugins(true),
		new WebpackAssetsManifest({ publicPath: true }),
		new FaviconsWebpackPlugin({
			logo: "src/common/assets/images/logo.png",
			mode: "light",
			cache: true,
			outputPath: resolve(__dirname, "build/static"),
		}),
	],
};

const config: Configuration[] = [clientConfig, serverConfig];

export default config;
