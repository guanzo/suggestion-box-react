
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
    output:{
        libraryTarget: 'umd'
    },
    externals:{
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        },
        'react-router-dom': {
            root: 'ReactRouterDOM',
            commonjs2: 'react-router-dom',
            commonjs: 'react-router-dom',
            amd: 'react-router-dom',
            umd: 'react-router-dom',
            },
        'axios':'axios',
        lodash : {
            commonjs: "lodash",
            commonjs2: "lodash",
            amd: "lodash",
            umd: 'lodash',
            root: "_" // indicates global variable
        }
    },
}