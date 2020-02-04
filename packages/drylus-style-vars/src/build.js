const fs = require('fs-extra');
const path = require('path');
const { kebabCase } = require('lodash');

const vars = require('./vars-build');

async function createJs(vars, buildDir) {
  const lines = [];
  lines.push('module.exports = {');
  Object.keys(vars).forEach((key) => lines.push(`  ${key}: '${vars[key]}',`));
  lines.push('};');
  let text = lines.join('\n');

  // append functions from colors.js
  const colorsJs = await fs.readFile(path.resolve(__dirname, 'colors.js'), 'utf-8');
  text += `\n\n${colorsJs}`;

  await fs.writeFile(path.resolve(buildDir, './vars.js'), text, 'utf-8');
}

async function createTs(vars, buildDir) {
  const lines = [];
  lines.push(`declare module '@drawbotics/drylus-style-vars' {`);
  Object.keys(vars).forEach((key) => lines.push(`  export const ${key} = '${vars[key]}';`));
  lines.push('}');
  const text = lines.join('\n');

  await fs.writeFile(path.resolve(buildDir, './vars.d.ts'), text, 'utf-8');
}

async function createLess(vars, buildDir) {
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
  await fs.writeFile(path.resolve(buildDir, './vars.less'), text, 'utf-8');
}

async function createCss(vars, buildDir) {
  const lines = [];
  lines.push(':root {');
  Object.keys(vars).forEach((key) => lines.push(`  --${kebabCase(key)}: ${vars[key]};`));
  lines.push('}');
  const text = lines.join('\n');
  await fs.writeFile(path.resolve(buildDir, './vars.css'), text, 'utf-8');
}

async function main() {
  const buildDir = path.resolve(__dirname, '../dist');
  await fs.ensureDir(buildDir);
  await createJs(vars, buildDir);
  await createTs(vars, buildDir);
  await createLess(vars, buildDir);
  await createCss(vars, buildDir);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
