const Self = require('../../');


module.exports = {
  entry: {
    app: './index.js',
    emotion: './index.js',
  },
  plugins: [
    new Self({
      bundleName: 'emotion',
      filename: '[name].css',
    }),
  ],
};
