/* tslint:disable */
const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',

    context: path.resolve(__dirname, '..', 'src'),

    devtool: 'source-map',

    entry: './index.tsx',

    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
        plugins: [
            new TsconfigPathsWebpackPlugin({
                configFile: path.resolve(__dirname, '../src', 'tsconfig.json'),
                extensions: [
                    '.js', '.jsx', '.ts', '.tsx'
                ]
            })
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        chunkFilename: '[name].[hash:8].chunk.js'
    },

    module: {
        rules: [

            {
                test: /\.(js|ts)x?/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true
                    }
                },
            },

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

        new ForkTsCheckerWebpackPlugin({
            tsconfig: './tsconfig.json',
            tslint: './tslint.json',
            checkSyntacticErrors: true,
        }),

        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'React boilerplate'
        })
    ],

    devServer: {
        port: 4200,
        host: '0.0.0.0',
        hot: true,
    },

    optimization: {
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true
                }
            }
        }
    }
};