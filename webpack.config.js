const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack_mode = process.env.npm_lifecycle_event; // this pulls either 'dev' or 'build'

const package = require('./package.json');

// TODO:
// const mode = process.env.ENV || "development";

const config = {
	devtool: 'source-map',
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
		vendor: Object.keys(package.dependencies),
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].bundle[hash].js',
		// publicPath: '/assets/',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(s[ac]ss|css$)/i,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(js)$/,
				use: ['babel-loader'],
				exclude: [/\.spec\.js$/],
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
				},
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'url-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			utils: path.resolve(__dirname, 'src/utils/'),
		},
		extensions: ['*', '.js', '.jsx'],
		fallback: { path: false },
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			favicon: false,
			showErrors: true,
			cache: true,
			myPageHeader: 'React App',
			title: 'React with Webpack application',
			template: './src/index.html',
			hash: true,
			minify: true,
			removeComments: true,
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
				// Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			},
		}),
		new webpack.ProgressPlugin(),
	],
	optimization: {
		minimize: true,
	},
	devServer: {
		port: 8080,
		contentBase: path.resolve(__dirname, './dist'),
		hot: true,
		historyApiFallback: true,
	},
};

if (webpack_mode === 'build') {
	config.mode = 'production';
	config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: 'main.[hash].css',
		}),
		new CleanWebpackPlugin()
	);
}

module.exports = (env, { mode, presets } = { mode: 'production', presets: [] }) => {
	console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
	console.log('Production: ', env.production); // true

	return {
		...config,
	};
};
