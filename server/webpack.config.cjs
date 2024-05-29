const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server.js',
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
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