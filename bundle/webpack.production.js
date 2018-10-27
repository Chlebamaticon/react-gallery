const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',

    devtool: 'none',

    entry: './index.tsx',

    output: {
        filename: 'b.[hash:8].js',
        chunkFilename: 'c.[hash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                                require('cssnano'),
                                require('css-mqpacker'),
                                require('postcss-merge-rules'),
                                require('postcss-minify-font-values'),
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([ 'dist/*' ], { 
            root: path.resolve(__dirname, '..'),
            beforeEmit: true 
        }),
        new MiniCssExtractPlugin({
            filename: 'b[id].[hash].css',
            chunkFilename: 'c[id].[chunkhash].css',
            publicPath: "/"
        })
    ]
}