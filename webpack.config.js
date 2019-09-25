const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const webpack = require('webpack');
module.exports = {
    entry:  {
        index: path.resolve("./src/main.js"),
        another: path.resolve("./src/another_module.js")
    },//已多次提及的唯一入口文件
    output: {
        path: path.resolve("public/dist"),//打包后的文件存放的地方
        // filename: "bundle.js",//打包后输出文件的文件名
        filename: '[hash].js',
        publicPath: './public/dist/'
    },
    plugins: [new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['./public']
    }),new HtmlWebpackPlugin({
        title: 'Caching',
        // path: '../../index.html'
        filename: '../index.html',
        template: "./index.html"
    })],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use:['file-loader']
            }

        ]
    }
}