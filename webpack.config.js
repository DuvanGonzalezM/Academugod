const path = require('path');

module.exports = {
  entry: [
    './public/js/generic.js',
    './public/js/panel_solar.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
  },
};