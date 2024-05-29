const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.cjs',
  },
  target: 'node',
  externals: {
    express: 'express',
  },
};