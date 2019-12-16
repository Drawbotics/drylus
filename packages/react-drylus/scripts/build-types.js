const path = require('path');

const { generateTypes } = require('./generate-types');


const targetFile = path.resolve(__dirname, '../index.d.ts');


generateTypes(targetFile);