const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/start',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/client/`,
  },
};
