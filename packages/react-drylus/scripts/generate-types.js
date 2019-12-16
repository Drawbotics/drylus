const fs = require('fs');
const path = require('path');

const { generate } = require('./generate');
const { generateCustomDefinitions } = require('./custom-definitions');


const folders = [
  path.resolve(__dirname, '../src/base'),
  path.resolve(__dirname, '../src/components'),
  path.resolve(__dirname, '../src/forms'),
  path.resolve(__dirname, '../src/layout'),
];


function generateTypes(targetFile) {
  const skippedComponents = ['Filter', 'Padding', 'Margin'];

  let types = [generateCustomDefinitions()];

  for (const folder of folders) {
    const dir = fs.readdirSync(folder);
    const files = dir.filter((element) => element.match(/.*\.jsx/ig));

    for (const file of files) {
      const input = `${folder}/${file}`;
      const fileName = path.basename(input);
      const componentName = fileName.replace('.jsx', '');

      if (skippedComponents.includes(componentName)) {
        console.warn('Skipping', componentName);
        continue;
      }

      console.info('Gonna generate', file);

      try {
        let result = generate({
          input,
          isBaseClass: false,
        });

        // replace style object with more precise definition
        result = result.replace('style?: object', 'style?: React.CSSProperties');

        // replace generic onClick with specific definition
        result = result.replace(/onClick(.*?)\?\(\): void/gm, 'onClick$1: OnClickCallback');

        // replace generic onChange with specific definition
        result = result.replace(/onChange(.*?\(\)): void/gm, 'onChange$1: OnChangeCallback');

        // change class to function component definition
        result = result.replace(
          /export default class (\S*) .*? \{\}/gms,
          'export const $1: React.FunctionComponent<$1Props>;'
        );
    
        types.push(result);
      }
      catch(error) {
        console.warn(`Impossible to create definition for ${file}. Will use custom definition.`);
      }
    }
  }

  const text = types.join('\n');

  if (targetFile != null) {
    fs.writeFileSync(targetFile, text, 'utf-8');
  }

  return text;
}


module.exports = {
  generateTypes,
};