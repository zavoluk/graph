const path = require('path');

module.exports = {
    styles: config => {
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../../')
        });
    }
};
