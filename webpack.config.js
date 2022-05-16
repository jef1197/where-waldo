const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main4.js',
      path: path.resolve(__dirname, 'public/scripts'),
    },
  };