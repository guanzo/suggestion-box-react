const path = require('path')
const paths = require('./paths');

module.exports = {
    output:{
        libraryTarget: 'umd'
    },
    resolve:{
        alias: {
        '@': path.resolve(__dirname, '../src'),
        '@shared': path.resolve('../shared'),
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        },
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
        'redux': {
            root: 'Redux',
            commonjs2: 'redux',
            commonjs: 'redux',
            amd: 'redux',
            umd: 'redux',
        },
        'react-redux': {
            root: 'ReactRedux',
            commonjs2: 'react-redux',
            commonjs: 'react-redux',
            amd: 'react-redux',
            umd: 'react-redux',
        },
        'redux-thunk': {
            root: 'ReduxThunk',
            commonjs2: 'redux-thunk',
            commonjs: 'redux-thunk',
            amd: 'redux-thunk',
            umd: 'redux-thunk',
        },
        'reselect': {
            root: 'Reselect',
            commonjs2: 'reselect',
            commonjs: 'reselect',
            amd: 'reselect',
            umd: 'reselect',
        },
        'react-transition-group': {
            root: 'ReactTransitionGroup',
            commonjs2: 'react-transition-group',
            commonjs: 'react-transition-group',
            amd: 'react-transition-group',
            umd: 'react-transition-group',
        },
        'axios':'axios',
        'moment':'moment',
        lodash : {
            commonjs: "lodash",
            commonjs2: "lodash",
            amd: "lodash",
            umd: 'lodash',
            root: "_" // indicates global variable
        }
    },
}