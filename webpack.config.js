const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('client/public/dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      // { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ],
  },
};
