const path = require('path');

const { forkTsCheckerWebpackPlugin } = require('./forkTsCheckerWebpackPlugin');
const { styles } = require('./webpack/styles');

module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    core: {
        builder: 'webpack5'
    },
    webpackFinal: async config => {
        config.resolve.modules = ['node_modules', path.resolve(__dirname, '../src')];
        styles(config);
        forkTsCheckerWebpackPlugin(config);

        return config;
    }
};
