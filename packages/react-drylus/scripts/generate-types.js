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

      console.info(`Gonna generate ${file} definitions`);

      try {
        let result = generate({
          input,
          isBaseClass: false,
        });

        // replace style object with more precise definition
        result = result.replace('style?: object', 'style?: React.CSSProperties');

        // replace generic onClick with specific definition
        result = result.replace(/onClick(.*?)\(\): void/gm, 'onClick$1: OnClickCallback');

        // replace generic onChange with specific definition
        result = result.replace(/onChange(.*?)\(\): void/gm, 'onChange$1: OnChangeCallback');

        // replace shape by any for now
        // TODO handle nested props
        result = result.replace(': shape', ': any');

        // change class to function component definition
        result = result.replace(
          /export default class (\S*) extends (.*?) \{\}/gms,
          (match, p1, p2='') => p2.includes(p1)
            ? `export declare const ${p1}: React.FunctionComponent<${p1}Props>;`
            : `export declare const ${p1}: React.FunctionComponent;`,
        );

        // TODO move this to separate function
        // replace renderValue in NumberInput to specific function
        result = result.replace('renderValue?(): void', 'renderValue?(v: React.ReactText): string');
    
        types.push(result);
      }
      catch(error) {
        console.error(`Impossible to create definition for ${file}. ${error}`);
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