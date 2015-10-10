'use strict';


var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var _ = require('lodash');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var srcDir = path.resolve(process.cwd(), 'src');
var build = 'build/';
var sourceMap = require('./src/sourcemap.json');

var excludeFromStats = [
	/node_modules[\\\/]/
];

var generateEntries = function() {
	var jsDir = path.resolve(srcDir, 'js');
	var names = fs.readdirSync(jsDir);
	var map = {};

	names.forEach(function(name) {
		var m = name.match(/(.+)\.js$/);
		var entry = m ? m[1] : '';
		var entryPath = entry ? path.resolve(jsDir, name) : '';

		if (entry) map[entry] = entryPath;
	});
	return map;
}

var webpackConfig = function(options) {
	options = options || {};

	var debug = options.debug !== undefined ? options.debug : true;
	var entries = generateEntries();
	var chunks = Object.keys(entries);
	var config = {
		entry: entries,

		output: {
			path: path.resolve(debug ? '__build' : build),
			filename: debug ? '[name].js' : 'js/[chunkhash:8].[name].min.js',
			chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
			hotUpdateChunkFilename: debug ? '[id].[chunkhash:8].js' : 'js/[id].[chunkhash:8].min.js',
			publicPath: debug ? '/__build/' : ''
		},

		resolve: {
			root: [srcDir, './node_modules'],
			alias: sourceMap,
			extensions: ['', '.js', '.scss', '.css', '.png', '.jpg']
		},

		resolveLoader: {
			root: path.join(__dirname, 'node_modules')
		},

		module: {
			noParse: ['jquery', 'react', 'react-dom'],
			loaders: [{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'image?{bypassOnDebug: true, progressive:true, \
                            optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
					
					'url?limit=10000&name=img/[hash:8].[name].[ext]',
				]
			}, {
				test: /\.(woff|eot|ttf)$/i,
				loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'jsx'
			}]
		},

		plugins: [
			new CommonsChunkPlugin({
				name: 'vendors',
				chunks: chunks,
				minChunks: chunks.length
			}),
			//page b 和 page c 公用的js将被打包位common－bc
			new CommonsChunkPlugin({
				name: 'common-bc',
				chunks: ['b', 'c'],
				minChunks: 2
			})
		],

		devServer: {
			stats: {
				cached: false,
				exclude: excludeFromStats,
				colors: true
			}
		}
	};

	if (debug) {
		var cssLoader = {
			test: /\.css$/,
			loader: 'style!css'
		};
		var sassLoader = {
			test: /\.scss$/,
			loader: 'style!css!sass'
		};

		config.module.loaders.push(cssLoader);
		config.module.loaders.push(sassLoader);
	} else {
		var cssLoader = {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css?minimize')
		};
		var sassLoader = {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css?minimize', 'sass')
		};

		config.module.loaders.push(cssLoader);
		config.module.loaders.push(sassLoader);
		config.plugins.push(
			new ExtractTextPlugin('css/[contenthash:8].[name].min.css', {
				allChunks: false
			})
		);

		var pages = fs.readdirSync(srcDir);

		pages.forEach(function(filename) {
			var m = filename.match(/(.+)\.html$/);

			if (m) {
				var conf = {
					template: path.resolve(srcDir, filename),
					filename: filename
				};

				if (m[1] in config.entry) {
					conf.inject = 'body';
					conf.chunks = ['vendors', m[1]];
				}
				config.plugins.push(new HtmlWebpackPlugin(conf));
			}
		});
	}
	return config;
}

module.exports = webpackConfig;