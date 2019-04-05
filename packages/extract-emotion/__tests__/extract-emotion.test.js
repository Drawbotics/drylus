import path from 'path';
import fs from 'fs';

import extractEmotion from '../lib';


describe('ExtractEmotion', () => {
  it('should generate the bundle from already transpiled code', async () => {
    const example = path.resolve(__dirname, 'example');
    const outputDirectory = path.resolve(example, 'output');
    const expectedDirectory = path.resolve(example, 'expected');
    const entryPoint = path.resolve(example, 'index.js');

    await extractEmotion({ inputFile: entryPoint, output: outputDirectory, filename: 'emotion.css' });

    // remove whitespace to avoid inequality over mismatch
    const expectedContent = fs.readFileSync(path.resolve(expectedDirectory, 'style.css'), 'utf-8').replace(/\s/gm, '');
    const actualContent = fs.readFileSync(path.resolve(outputDirectory, 'emotion.css'), 'utf-8').replace(/\s/gm, '');
    expect(actualContent).toEqual(expectedContent);
  });
  it('should properly add the prefix to all css classes', async () => {
    const example = path.resolve(__dirname, 'example');
    const outputDirectory = path.resolve(example, 'output');
    const expectedDirectory = path.resolve(example, 'expected');
    const entryPoint = path.resolve(example, 'index.js');

    await extractEmotion({ inputFile: entryPoint, output: outputDirectory, filename: 'emotion-with-prefix.css', prefix: 'MyPrefix' });

    // remove whitespace to avoid inequality over mismatch
    const expectedContent = fs.readFileSync(path.resolve(expectedDirectory, 'style-with-prefix.css'), 'utf-8').replace(/\s/gm, '');
    const actualContent = fs.readFileSync(path.resolve(outputDirectory, 'emotion-with-prefix.css'), 'utf-8').replace(/\s/gm, '');
    expect(actualContent).toEqual(expectedContent);
  });
});
