const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    forkTsCheckerWebpackPlugin: config => {
        config.context = path.resolve(__dirname, '../');
        config.resolve.extensions = ['.ts', '.tsx', '.js'];
        config.module.rules.push({
            test: /\.tsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        });
        config.plugins.push(
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true
                    },
                    mode: 'write-references'
                }
            })
        );
    }
};
