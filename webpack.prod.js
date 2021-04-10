const { resolve } = require("path");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonRules = (client) => [
	{
		test: /\.js(|x)$/i,
		use: { loader: "babel-loader" },
	},
	{
		test: /\.(pdf|png|webp)$/i,
		use: {
			loader: "file-loader",
			options: {
				name: "[name].[contenthash].[ext]",
				outputPath: client ? "assets/" : "static/assets/",
				publicPath: "/assets/",
			},
		},
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
	new MiniCssExtractPlugin({
		filename: client ? "css/[name].[contenthash].css" : "static/css/[name].[contenthash].css",
		chunkFilename: client ? "css/[chunkhash].chunk.css" : "static/css/[chunkhash].chunk.css",
	}),
];

const commonConfig = {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({ terserOptions: { format: { comments: false } }, extractComments: false }),
			new CssMinimizerPlugin({ minimizerOptions: { preset: ["default", { discardComments: { removeAll: true } }] } }),
		],
	},
};

const config = [
	// Server
	{
		...commonConfig,
		target: "node",
		entry: { server: resolve(__dirname, "src/server/index.js") },
		output: {
			path: resolve(__dirname, "build"),
			filename: "[name].js",
			chunkFilename: "[name].[chunkhash].chunk.js",
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
			filename: "js/[name].[contenthash].js",
			crossOriginLoading: "anonymous",
			chunkFilename: "js/[name].[chunkhash].chunk.js",
		},
		module: { rules: [...commonRules(true)] },
		plugins: [
			...commonPlugins(true),
			new HtmlWebpackPlugin({ template: "src/common/templates/index.html" }),
			new FaviconsWebpackPlugin({
				logo: "src/common/assets/images/logo.png",
				cache: true,
				outputPath: resolve(__dirname, "build/static"),
				prefix: "/",
				favicons: {
					appName: "Axel Gabriel Calle Granda's porfolio",
					appShortName: "Axel Calle's porfolio",
					appDescription: "I'm Axel Gabriel Calle Granda",
					icons: {
						android: true,
						appleIcon: true,
						appleStartup: true,
						coast: true,
						favicons: true,
						firefox: true,
						windows: true,
						yandex: true,
					},
				},
			}),
			new SubresourceIntegrityPlugin(),
		],
	},
];

module.exports = config;
