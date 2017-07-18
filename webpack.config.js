const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  //extract css from js file
const autoprefixer = require('autoprefixer');

// JavaScript
const javascript = {
  test: /\.(js)$/, 
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'] }
  }],
};

/*
  Sass
*/
const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({
        browsers: 'last 3 versions'
      })];
    }
  }
};

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const config = {
  entry: {
    App: './client/javascripts/app.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

module.exports = config;