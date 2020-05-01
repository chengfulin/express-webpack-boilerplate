const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: process.env.ENV || 'production',
    target: 'node',
    entry: {
        server: path.join(__dirname, 'src', 'server.ts')
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: '/node_modules/' },
        ]
    },
    node: {
    // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [
        nodeExternals(),
        {
            firebase: 'firebase',
            moment: 'moment'
        }
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    }
};