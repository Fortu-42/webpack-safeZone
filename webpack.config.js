var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var extractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css'
});

module.exports = {
    entry: {
        main: './src/js/main.js',
        map: './src/js/map.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
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
            // {
            //     test: /\.(jpg|png|svg|ico)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: "./dist/[path][name].[hash].[ext]",
            //             context: '',
            //             useRelativePath: true
            //         }
            //     }
            // },
            // {
            //     test: /\.(jpg|png|svg|ico)$/,
            //     use:{
            //         loader: 'url-loader?limit=100000',
            //         options:{
            //             name: "./dist/[path][name].[hash].[ext]"
            //         }
            //     }
            // }
        ]
    },
    plugins: [
<<<<<<< HEAD
        // new BundleAnalyzerPlugin({
        //     reportFilename : path.resolve(__dirname, 'dist')
        // }),
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
        extractPlugin,
        new CopyWebpackPlugin([
            { from: './src/img', to: './img' }
          ]),
        new CopyWebpackPlugin([
            {from: './src/svg', to:'./svg'}
        ]),
        new CopyWebpackPlugin([
            {from: './src/favicon.ico', to: './'}
        ])
=======
        extractPlugin,
        /*new BundleAnalyzerPlugin({
            reportFilename : path.resolve(__dirname, 'dist')
        })*/
        myHtmlWebpackPlugin
>>>>>>> 55ed170d53233773a116cbd9b17aad7147479e1f
    ],
    mode: 'production'
};