/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    entry: path.resolve('src/index.tsx'),
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(t|j)sx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: [path.resolve('src'), 'node_modules']
    }
};
