'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const srcPath = path.join(__dirname, 'app', 'index.js');
const buildPath = path.join(__dirname, 'public', 'build');
//const root =  path.join(__dirname, 'app');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: srcPath,
        reactVendor: ['react', 'react-dom', 'react-router'],
        coreVendor: ['lodash', 'moment', 'jquery'],
        bootstrapVendor: ['react-bootstrap']
    },
    output: {
        path: path.join(buildPath),
        filename: '[name].[hash].js',
        publicPath: '',
        pathinfo: true
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('styles.[hash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['reactVendor', 'coreVendor', 'bootstrapVendor'],
            filename: '[name].js'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: true,
        //     // Analyzer HTTP-server port
        //     analyzerPort: 8889
        // })
    ],
    resolve: {
        root: path,
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /.json?$/,
                loader: 'json-loader'
            },
            {
                test: /\.svg$/,
                loaders: ['babel?presets[]=es2015,presets[]=react', 'svg-react']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')

            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?name=img/img-[hash:6].[ext]'
            }, {
                test: /\.(woff|otf|ttf)$/,
                loader: 'file-loader?name=fonts/font-[hash:6].[ext]'
            }
        ]
    }
};