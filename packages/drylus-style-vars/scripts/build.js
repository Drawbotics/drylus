const fs = require('fs-extra');
const path = require('path');
const { kebabCase } = require('lodash');

const vars = require('../tmp/vars.js');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const TMP_DIR = path.resolve(__dirname, '../tmp');

async function createJs() {
  const lines = [];
  lines.push("const tc = require('tinycolor2');");
  lines.push('');
  lines.push('module.exports = {');
  Object.keys(vars).forEach((key) => lines.push(`  ${key}: '${vars[key]}',`));
  lines.push('};');

  // Color utility functions
  lines.push('');
  lines.push('module.exports.lighten = function lighten(color, amount) {');
  lines.push('  return tc(color).lighten(amount).toString();');
  lines.push('};');
  lines.push('');
  lines.push('module.exports.fade = function fade(color, amount) {');
  lines.push('  return tc(color).setAlpha(amount / 100).toString();');
  lines.push('};');
  lines.push('');
  lines.push('module.exports.darken = function darken(color, amount) {');
  lines.push('  return tc(color).darken(amount).toString();');
  lines.push('};');

  const text = lines.join('\n');
  await fs.writeFile(path.resolve(BUILD_DIR, './vars.js'), text, 'utf-8');
}

async function createTs() {
  const lines = [];
  Object.keys(vars).forEach((key) => lines.push(`  export const ${key} = '${vars[key]}';`));
  const colors = await fs.readFile(path.resolve(TMP_DIR, './colors.d.ts'), 'utf-8');
  lines.push(colors);
  const text = lines.join('\n');

  await fs.writeFile(path.resolve(BUILD_DIR, './vars.d.ts'), text, 'utf-8');
}

async function createLess() {
  const lines = [];
  Object.keys(vars).forEach((key) => {
    const value = vars[key];
    if (value.match(/\sonly\s|\sscreen\s|\sand\s|max-width:/) != null) {
      // is media query
      lines.push(`@${kebabCase(key)}: ~'${value}';`);
    } else {
      lines.push(`@${kebabCase(key)}: ${value};`);
    }
  });
  const text = lines.join('\n');
  await fs.writeFile(path.resolve(BUILD_DIR, './vars.less'), text, 'utf-8');
}

async function createCss() {
  const lines = [];
  lines.push(':root {');
  Object.keys(vars).forEach((key) => lines.push(`  --${kebabCase(key)}: ${vars[key]};`));
  lines.push('}');
  const text = lines.join('\n');
  await fs.writeFile(path.resolve(BUILD_DIR, './vars.css'), text, 'utf-8');
}

async function main() {
  await fs.ensureDir(BUILD_DIR);
  await createJs();
  await createTs();
  await createLess();
  await createCss();
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
