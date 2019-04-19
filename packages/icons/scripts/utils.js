const fs = require('fs');
const path = require('path');


function setFontSize(size, file) {
  const contents = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, contents.replace(/font-size: inherit;/gm, `font-size: ${size}px;`));
}


function generateJSString(file) {
  const contents = fs.readFileSync(file, 'utf8');
  const withRequire = contents.replace(/url\((\S+)\)/gm, 'url(${require($1)})');
  const jsString = `module.exports = \`${withRequire}\`;`;
  fs.writeFileSync(file.replace('.css', '.js'), jsString);
}


module.exports = {
  setFontSize,
  generateJSString,
}
