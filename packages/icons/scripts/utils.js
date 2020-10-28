const fs = require('fs');
const camelCase = require('lodash/camelCase');

const ICONS_CDN_PATH = process.env.NODE_ENV !== "production" ? 'https://drawbotics-cdn.s3-eu-west-1.amazonaws.com/drycons' : 'https://cdn.drawbotics.com/drycons';

// Maintain backward compatibility with old icon names
const aliases = {
  'next': ['arrow-right-line'],
  'outdoor': ['beach-umbrella'],
  'room': ['bed'],
  'insights': ['data-points'],
  'budget': ['money-bag'],
  'send': ['paper-plane-horizontal'],
  'drone-shoot': ['drone-shooting'],
  'virtual-tour-exterior': ['exterior-tour-3d'],
  'virtual-tour-interior': ['interior-tour-3d'],
  'landing': ['landing-page'],
  'maquette-360': ['model-360'],
  'photo-shoot': ['photo-shooting'],
  'revo': ['revo-alt'],
  'tourama': ['tour-3d'],
  'vr-headset': ['vr'],
};

function addAliases(file) {
  const contents = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(
    file,
    contents.replace(
      /Drycon-(\S+)::before/gm,
      (_, $1) => aliases[$1] != null
        ? `Drycon-${$1}::before, ${aliases[$1].map((alias) => `.Drycon-${alias}::before`).join(', ')}`
        : `Drycon-${$1}::before`,
    ),
  );
}

function setFontSize(size, file) {
  const contents = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(
    file,
    contents.replace(
      /font-size: inherit;/gm,
      `font-size: ${size}px; font-family: drycons !important;`,
    ),
  );
}

function generateObjectMappings(targetFile, iconsFolder) {
  const icons = fs.readdirSync(iconsFolder);
  const iconNames = icons.map((fileName) => fileName.replace('.svg', ''));
  const mapping = iconNames.reduce(
    (memo, icon) => ({
      ...memo,
      [camelCase(icon)]: icon,
    }),
    {},
  );
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
  const withPattern = contents.replace(
    /url\(".\/(\S+)"\)/gm,
    `url(${ICONS_CDN_PATH}/#{version}/$1)`,
  );
  const jsString = `function generateIconStyles(version) {
    return \`${withPattern}\`.replace(/#{version}/gm, version);
  }`;
  const escapedContent = jsString.replace(/(content: "\\)/gm, '$1\\');
  fs.writeFileSync(file.replace('.css', '.js'), escapedContent);
}

function generateTSType(targetFile, iconsFolder) {
  const icons = fs.readdirSync(iconsFolder);
  const iconNames = icons.map((fileName) => fileName.replace('.svg', ''));
  const list = iconNames.map((name) => `"${name}"`).join(' | ');
  const types = iconNames.map((name) => `"${camelCase(name)}"`).join(' | ');

  const finalContent = `
    export type Icons = ${list};
    export type IconKeys = ${types};
  `;

  fs.writeFileSync(targetFile, finalContent, { flag: 'a' });
}

module.exports = {
  addAliases,
  setFontSize,
  generateJSFunction,
  generateObjectMappings,
  generateTSType,
};
