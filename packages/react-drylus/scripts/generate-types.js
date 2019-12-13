const path = require('path');
const { generate } = require('react-dts-generator');


const input = path.resolve(__dirname, '../src/components/Button.jsx');

const fileName = path.basename(input);


generate({
  input,
  isBaseClass: true,
  output: input.replace(fileName, `types/${fileName.replace('.jsx', '')}.d.ts`),
});