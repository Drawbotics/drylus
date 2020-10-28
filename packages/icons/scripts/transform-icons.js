const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const svgFixer = require('oslllo-svg-fixer');

function printProgress(progress, extra) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress + '% | ' + extra);
}

function fixDimensions(string) {
  return string.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');
}

async function transform(iconsFolder, cacheFolder) {
  // clean icons cache
  rimraf.sync(cacheFolder);

  // create folder
  fs.mkdirSync(cacheFolder);

  await svgFixer(iconsFolder, cacheFolder, { showProgressBar: true }).fix();

  const iconFiles = fs.readdirSync(cacheFolder);

  let i = 0;
  for (let filename of iconFiles) {
    printProgress(i / iconFiles.length, 'Processing ' + filename);
    const contents = fs.readFileSync(path.resolve(cacheFolder, filename), 'utf8');
    const fixed = fixDimensions(contents);
    fs.writeFileSync(path.resolve(cacheFolder, filename), fixed);
    i++;
  }
}

module.exports = transform;
