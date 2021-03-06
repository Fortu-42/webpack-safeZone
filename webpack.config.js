var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var extractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
});

module.exports = {
    entry: {
        main: './src/js/pages/main.js',
        map: './src/js/pages/map.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        // publicPath: './'
    },
    module: {
        rules: [
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
                test: /\.html$/,
                use: [ {
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
                }]
            },
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
                test: /\.(jpg|png|svg|ico)$/,
                use: {
                    loader: 'file-loader',
                    // options: {
                    //     name: "./dist/[path][name].[hash].[ext]",
                    //     context: '',
                    //     useRelativePath: true
                    // }
                }
            },
            {
                test: /\.(jpg|png|svg|ico)$/,
                use:{
                    loader: 'url-loader?limit=100000',
                    // options:{
                    //     name: "./dist/[path][name].[hash].[ext]"
                    // }
                }
            }
        ]
    },
    plugins: [
        extractPlugin,
        /*new BundleAnalyzerPlugin({
            reportFilename : path.resolve(__dirname, 'dist')
        })*/
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'map.html',
            template: './src/map.html',
            chunks: ['map']
        }),
        new CopyWebpackPlugin([
            { from: './src/img', to: './img' }
          ]),
        new CopyWebpackPlugin([
            {from: './src/svg', to:'./svg'}
        ]),
        new CopyWebpackPlugin([
            {from: './src/favicon.ico', to: './'}
        ])
    ],
    mode: 'production'
};