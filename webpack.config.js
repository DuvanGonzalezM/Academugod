const path = require('path');

module.exports = {
  entry: [
    './public/js/generic.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
  },
};