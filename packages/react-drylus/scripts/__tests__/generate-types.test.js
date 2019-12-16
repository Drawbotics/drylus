const fs = require('fs');
const path = require('path');

const { generateTypes } = require('../generate-types');


const typeDefinitions = path.resolve(__dirname, './snapshot.d.ts');
const currentVersion = fs.readFileSync(typeDefinitions, 'utf-8');


describe('generate-types', () => {
  describe('generated types', () => {
    it('matches previous version', () => {
      const definitions = generateTypes();
      
      expect(definitions).toMatch(currentVersion);
    });
  });
});