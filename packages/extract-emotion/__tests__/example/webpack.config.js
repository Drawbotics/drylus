const Self = require('../../');


module.exports = {
  entry: './index.js',
  plugins: [
    new Self({
      filename: '[name].css',
    }),
  ],
};
