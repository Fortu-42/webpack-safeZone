var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        extractPlugin,
        new BundleAnalyzerPlugin({
            reportFilename : path.resolve(__dirname, 'dist')
        })
    ],
    mode: 'production'
};