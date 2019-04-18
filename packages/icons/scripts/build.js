const path = require('path');
const transformIcons = require('./transform-icons');


const ICONS_FOLDER = path.resolve(__dirname, '../icons');
const CACHE_FOLDER = path.resolve(__dirname, '../.cache');


async function build() {
  await transformIcons(ICONS_FOLDER, CACHE_FOLDER);
  // build code
}


build();
