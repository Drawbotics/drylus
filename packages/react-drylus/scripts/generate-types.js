const fs = require('fs');
const path = require('path');

const { generate } = require('./generate');
const { generateCustomDefinitions } = require('./custom-definitions');


const targetFile = path.resolve(__dirname, '../index.d.ts');

const cache = path.resolve(__dirname, '../.cache');

if (! fs.existsSync(cache)) {
  fs.mkdirSync(cache);
}


const folders = [
  path.resolve(__dirname, '../src/base'),
  path.resolve(__dirname, '../src/components'),
  path.resolve(__dirname, '../src/forms'),
  path.resolve(__dirname, '../src/layout'),
];


 let types = [generateCustomDefinitions()];


for (const folder of folders) {
  const dir = fs.readdirSync(folder);
  const files = dir.filter((element) => element.match(/.*\.jsx/ig));

  for (const file of files) {
    const input = `${folder}/${file}`;
    const fileName = path.basename(input);
    const componentName = fileName.replace('.jsx', '');

    console.info('Gonna generate', file);

    try {
      let result = generate({
        input,
        isBaseClass: false,
        output: `${cache}/temp.d.ts`,
      });

      // remove react import
      // result = result.substring(result.indexOf('\n') + 1);

      // change class to function component definition
      result = result.replace(
        /export default class.*?{}/gms,
        `export const ${componentName}: React.FunctionComponent<${componentName}Props>;`
      );
  
      types.push(result);
    }
    catch(error) {
      console.warn(`Impossible to create definition for ${file}. Will use custom definition.`);
    }
  }
}

const text = types.join('\n');


fs.writeFileSync(targetFile, text, 'utf-8');
