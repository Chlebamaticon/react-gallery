const webpackMerge = require('webpack-merge');

module.exports = (args = {}, env) => {
    const { NODE_ENV } = args;

    const commonConfig = require('./webpack.common');
    const environmentConfig = NODE_ENV === 'production'
        ? require('./webpack.production')
        : require('./webpack.development');

    return webpackMerge(
        commonConfig,
        environmentConfig
    );
}