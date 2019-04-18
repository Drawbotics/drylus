const fs = require('fs');
const path = require('path');


function setFontSize(size, file) {
  const contents = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, contents.replace(/font-size: inherit;/gm, `font-size: ${size}px;`));
}


module.exports = {
  setFontSize,
}
