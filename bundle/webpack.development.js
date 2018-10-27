module.exports = {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map',

    entry: [
        'react-hot-loader/patch',
        './index.tsx'
    ],

    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
}