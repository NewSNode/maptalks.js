const alias = require('./alias');
const commonjs = require('rollup-plugin-commonjs'),
    nodeResolve = require('rollup-plugin-node-resolve'),
    localResolve = require('rollup-plugin-local-resolve');

module.exports = {
    frameworks: ['mocha', 'expect', 'expect-maptalks', 'sinon', 'happen'],
    basePath: '..',
    files: [
        'src/maptalks.js',
        'test/core/ClassSpec.js',
        'test/**/*.js',
        {
            pattern: 'assets/css/**/*.css',
            included: false
        }, {
            pattern: 'assets/images/**/*.png',
            watched: false,
            included: false,
            served: true
        }, {
            pattern: 'test/resources/*',
            watched: false,
            included: false,
            served: true
        }
    ],
    proxies: {
        '/images/': '/base/assets/images/',
        '/css/': '/base/assets/css/',
        '/lib/': '/base/assets/lib/',
        '/resources/': '/base/test/resources/'
    },
    preprocessors: {
        'test/core/ClassSpec.js' : ['babel'],
        'src/maptalks.js': ['rollup'],
    },
    rollupPreprocessor: {
        plugins : [
            require('rollup-plugin-alias')(alias),
            localResolve(),
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            //convert zousan to es6 modules
            commonjs(),
            require('rollup-plugin-buble')(),
        ],
        format: 'iife',               // helps prevent naming collisions
        moduleName: 'maptalks', // required for 'iife' format
        sourceMap: 'inline',          // sensible for testing
    },
    babelPreprocessor: {
        'options': {
            'presets': [
                'es2015'
            ],
            'sourceMap' : 'inline',
            'plugins': [
                // ["transform-es2015-modules-umd"],
            ]
        }
    },
    customLaunchers: {
        IE10: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE10'
        },
        IE9: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE9'
        }
    }
};