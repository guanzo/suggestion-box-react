const path = require('path')
const paths = require('./paths');

module.exports = {
    output:{
        libraryTarget: 'umd'
    },
    resolve:{
        alias: {
        /* '@': path.resolve(__dirname, '../src'),
        '@shared': path.resolve('../shared'), */
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
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        'react-transition-group': 'ReactTransitionGroup',
        'reselect': 'Reselect',
        'axios':'axios',
		'moment':'moment',
		'runtime-module':'regeneratorRuntime',
		'velocity-animate':'Velocity',
		'lodash' : '_',
    },
}