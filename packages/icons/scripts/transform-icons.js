const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');


function removeWhitespace(string) {
  return string.replace(/(\r?\n|\r)|(\s\s)/gm, '');
}


function removeUnused(svgString) {
  const noG = svgString.replace(/(.*)(?!use>).*(<g.*?\/g>)/gm, '$1');
  const noMask = noG.replace(/<mask.*mask>/gm, '');
  return noMask;
}


function transform(iconsFolder, cacheFolder) {
  // clean icons cache
  rimraf.sync(cacheFolder);

  // create folder
  fs.mkdirSync(cacheFolder);

  const iconFiles = fs.readdirSync(iconsFolder);
  for (let filename of iconFiles) {
    const contents = fs.readFileSync(path.resolve(iconsFolder, filename), 'utf8');
    const flat = removeWhitespace(contents)
    const cleaned = removeUnused(flat);
    fs.writeFileSync(path.resolve(cacheFolder, filename), cleaned);
  }
}


module.exports = transform;
