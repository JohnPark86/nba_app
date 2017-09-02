/*
    ./webpack.config.js
*/
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/, 
        query: {
          presets: ['es2015']
        } },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/, 
        query: {
          presets: ['es2015']
        } }
    ]
  },
}


