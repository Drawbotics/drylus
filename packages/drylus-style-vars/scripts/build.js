const fs = require('fs-extra');
const path = require('path');
const { kebabCase } = require('lodash');

const vars = require('../tmp/vars.js');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const TMP_DIR = path.resolve(__dirname, '../tmp');

async function createJs() {
  const lines = [];
  lines.push('module.exports = {');
  Object.keys(vars).forEach((key) => lines.push(`  ${key}: '${vars[key]}',`));
  lines.push('};');
  let text = lines.join('\n');

  // append functions from colors.js
  const colorsJs = await fs.readFile(path.resolve(__dirname, '../tmp/colors.js'), 'utf-8');
  text += `\n\n${colorsJs}`;

  await fs.writeFile(path.resolve(BUILD_DIR, './vars.js'), text, 'utf-8');
}

async function createTs() {
  const lines = [];
  const vars = await fs.readFile(path.resolve(TMP_DIR, './vars.d.ts'), 'utf-8');
  const colors = await fs.readFile(path.resolve(TMP_DIR, './colors.d.ts'), 'utf-8');
  lines.push(vars);
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
