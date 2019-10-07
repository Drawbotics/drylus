const fs = require('fs');


const ICONS_CDN_PATH = 'https://cdn.drawbotics.com/drycons';


function setFontSize(size, file) {
  const contents = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, contents.replace(/font-size: inherit;/gm, `font-size: ${size}px; font-family: drycons !important;`));
}


function generateJSFunction(file) {
  const contents = fs.readFileSync(file, 'utf8');
  const withPattern = contents.replace(/url\(".\/(\S+)"\)/gm, `url(${ICONS_CDN_PATH}/#{version}/$1)`);
  const jsString = `module.exports = function(version) {
    return \`${withPattern}\`.replace(/#{version}/gm, version);
  }`;
  const escapedContent = jsString.replace(/(content: "\\)/gm, '$1\\');
  fs.writeFileSync(file.replace('.css', '.js'), escapedContent);
}


module.exports = {
  setFontSize,
  generateJSFunction,
}
