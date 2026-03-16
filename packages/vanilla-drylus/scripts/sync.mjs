/* global process */
import path from 'path';
import { fileURLToPath } from 'url';
import s3sync from '@drawbotics/s3sync';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const version = require('../package.json').version;

function sync() {
  const isDev = process.env.NODE_ENV !== 'production';
  s3sync({
    sourceDir: path.resolve(__dirname, '../dist'),
    folder: 'vanilla-drylus',
    version,
    dev: isDev,
    forceSync: true,
  });
}

sync();
