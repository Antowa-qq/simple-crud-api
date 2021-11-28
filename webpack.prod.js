const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
      http: false,
      url: false,
    },
  },
};
