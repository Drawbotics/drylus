const fs = require('fs');
const camelCase = require('lodash/camelCase');


const ICONS_CDN_PATH = 'https://cdn.drawbotics.com/drycons';


function setFontSize(size, file) {
  const contents = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, contents.replace(/font-size: inherit;/gm, `font-size: ${size}px; font-family: drycons !important;`));
}


function generateObjectMappings(targetFile, iconsFolder) {
  const icons = fs.readdirSync(iconsFolder);
  const iconNames = icons.map((fileName) => fileName.replace('.svg', ''));
  const mapping = iconNames.reduce((memo, icon) => ({
    ...memo,
    [camelCase(icon)]: icon,
  }), {});
  const jsString = `const mapping = ${JSON.stringify(mapping)};`;
  const exportString = `module.exports = { generateIconStyles, mapping }`;
  const finalContent = `
    ${jsString}

    ${exportString};
  `;

  fs.writeFileSync(targetFile, finalContent, { flag: 'a' });
}


function generateJSFunction(file) {
  const contents = fs.readFileSync(file, 'utf8');
  const withPattern = contents.replace(/url\(".\/(\S+)"\)/gm, `url(${ICONS_CDN_PATH}/#{version}/$1)`);
  const jsString = `function generateIconStyles(version) {
    return \`${withPattern}\`.replace(/#{version}/gm, version);
  }`;
  const escapedContent = jsString.replace(/(content: "\\)/gm, '$1\\');
  fs.writeFileSync(file.replace('.css', '.js'), escapedContent);
}


module.exports = {
  setFontSize,
  generateJSFunction,
  generateObjectMappings,
}
