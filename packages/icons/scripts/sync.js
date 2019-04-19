const path = require('path');
const s3sync = require('@drawbotics/s3sync');


const version = require('../package.json').version;


function sync() {
  const isDev = process.env.NODE_ENV !== 'production';
  s3sync({
    sourceDir: path.resolve(__dirname, '../dist'),
    folder: 'drycons',
    version,
    dev: isDev,
  });
}


sync();
