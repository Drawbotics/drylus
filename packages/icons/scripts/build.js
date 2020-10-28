const path = require('path');

const generate = require('./webfont-generate');
const transformIcons = require('./transform-icons');
const {
  setFontSize,
  generateJSFunction,
  generateObjectMappings,
  generateTSType,
  addAliases,
} = require('./utils');

const ICONS_FOLDER = path.resolve(__dirname, '../icons');
const CACHE_FOLDER = path.resolve(__dirname, '../.cache');
const DIST_FOLDER = path.resolve(__dirname, '../dist');

async function build() {
  await transformIcons(ICONS_FOLDER, CACHE_FOLDER);
  console.log('Transformed sketch icons');

  // Config same as for webfont
  await generate({
    files: path.resolve(CACHE_FOLDER, '*.svg'),
    dest: DIST_FOLDER,
    template: 'css',
    fontName: 'drycons',
    fontHeight: 150,
    templateClassName: 'Drycon',
  });
  console.log('Generated fonts');

  // Extra modifications
  setFontSize(18, path.resolve(DIST_FOLDER, 'drycons.css'));
  addAliases(path.resolve(DIST_FOLDER, 'drycons.css'));
  generateJSFunction(path.resolve(DIST_FOLDER, 'drycons.css'));
  generateObjectMappings(path.resolve(DIST_FOLDER, 'drycons.js'), ICONS_FOLDER);
  generateTSType(path.resolve(DIST_FOLDER, 'drycons.ts'), ICONS_FOLDER);
  console.log('Finished applying transforms');
}

build();
