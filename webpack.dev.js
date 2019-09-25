const merge = require('webpack-merge')
const basic = require('./webpack.config')
module.exports = merge(basic,{
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join('dist'),
        compress: true,
        port: 8080
    },
})