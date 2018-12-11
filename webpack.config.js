var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var myHtmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './index.html'
});

var extractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
});
module.exports = {
    entry: {
        main: './js/main.js',
        map: './js/map.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /mapbox-gl/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    // 'style-loader'
                ],
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        /*new BundleAnalyzerPlugin({
            reportFilename : path.resolve(__dirname, 'dist')
        })*/
        myHtmlWebpackPlugin
    ],
    mode: 'development'
};