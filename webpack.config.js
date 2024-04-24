const path = require('path');

module.exports = {
  entry: [
    './public/js/particles.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
  },
};