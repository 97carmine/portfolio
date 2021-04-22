const { resolve } = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonRules = (client) => [
	{
		test: /\.js(|x)$/i,
		use: { loader: "babel-loader" },
	},
	{
		test: /\.(pdf|png|webp)$/i,
		type: "asset/resource",
		generator: { filename: "assets/[name][ext]", emit: client },
	},
	{
		test: /\.(s[ac]|c)ss$/i,
		use: [
			{ loader: MiniCssExtractPlugin.loader, options: { publicPath: "/" } },
			{ loader: "css-loader" },
			{ loader: "sass-loader", options: { implementation: require("sass") } },
		],
	},
];

const commonPlugins = (client) => [
	new ESLintPlugin({ fix: true }),
	new StylelintPlugin({ fix: true }),
	new MiniCssExtractPlugin({
		filename: client ? "css/[name].css" : "static/css/[name].css",
		chunkFilename: client ? "css/[chunkhash].chunk.css" : "static/css/[chunkhash].chunk.css",
	}),
];

const commonConfig = { mode: "development", watch: true, devtool: "eval-cheap-module-source-map" };

const config = [
	// Server
	{
		...commonConfig,
		target: "node",
		entry: { server: resolve(__dirname, "src/server/index.js") },
		output: {
			path: resolve(__dirname, "build"),
			publicPath: "/",
			filename: "[name].js",
			chunkFilename: "[name].chunk.js",
		},
		module: { rules: [...commonRules(false)] },
		plugins: [...commonPlugins(false)],
		externals: { express: 'require("express")' },
	},
	// Client
	{
		...commonConfig,
		entry: { client: resolve(__dirname, "src/client/index.js") },
		output: {
			path: resolve(__dirname, "build/static"),
			publicPath: "/",
			filename: "js/[name].js",
			chunkFilename: "js/[name].chunk.js",
		},
		module: { rules: [...commonRules(true)] },
		plugins: [
			...commonPlugins(true),
			new HtmlWebpackPlugin({ template: "src/common/templates/index.html", minify: true }),
			new FaviconsWebpackPlugin({
				logo: "src/common/assets/images/logo.png",
				cache: true,
				outputPath: resolve(__dirname, "build/static"),
				prefix: "/",
			}),
		],
	},
];

module.exports = config;
