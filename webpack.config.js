/*
    ./webpack.config.js
*/
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "assets", "index"),
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.eot|.svg|.woff|.woff2|.ttf$/,
                use: ['url-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: ['url-loader?limit=10000', 'img-loader']
            },
            {
                test: /\.scss$/,
                use: ["style-loader","css-loader","sass-loader"]
            }
        ]
    }
}


