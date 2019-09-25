const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        main: ['babel-polyfill', './src/main.js'],
        // main: './src/main',
        vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, './dist')

    },
    devServer: {
        compress: true,
        hot: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8888,
        inline: true,

    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "windows.jQuery": "jquery"
        // })
    ],
    module: {
        rules: [{
                test: /.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: ['file-loader']
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
};