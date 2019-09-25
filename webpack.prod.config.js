const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "production";';
    // fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
    fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});

});

module.exports = (env) => {
    console.log(`当前打包环境${env === 'production' ? JSON.stringify('production') : JSON.stringify('test')}`)
    return merge(webpackBaseConfig, {
        // mode: 'production',
        devtool: 'source-map',
        output: {
            publicPath: '/dist/',
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].chunk.js'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ExtractTextPlugin({
                filename: '[name].[hash].css',
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                filename: 'vendors.[hash].js'
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: env === 'production' ? JSON.stringify('production') : JSON.stringify('test')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,//console
                    pure_funcs: ['console.log']//移除console
                },
                sourceMap: 'productionSourceMap'
            }),
            new HtmlWebpackPlugin({
                filename: '../index_prod.html',
                template: './src/template/index.ejs',
                favicon: './c.ico',
                inject: true,
            })
        ]
    });
}
