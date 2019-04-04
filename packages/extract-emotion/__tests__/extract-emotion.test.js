import path from 'path';
import fs from 'fs';
import webpack from 'webpack';


describe('ExtractEmotion', () => {
  it('should extract the CSS from the generated HTML head', (done) => {
    const example = path.resolve(__dirname, 'example');
    const exampleConfig = require(path.resolve(example, 'webpack.config.js'));
    const outputDirectory = path.resolve(example, 'output');
    const config = {
      ...exampleConfig,
      mode: 'development',
      context: example,
      cache: false,
      output: {
        path: outputDirectory,
      },
    };
    webpack(config, (err, stats) => {
      if (err) {
        done(err);
        return;
      }
      done();

      if (stats.hasErrors()) {
        done(
          new Error(
            stats.toString({
              context: path.resolve(__dirname, '..'),
              errorDetails: true,
            })
          )
        );
        return;
      }

      const expectedDirectory = path.resolve(example, 'expected');
      // remove whitespace to avoid inequality over mismatch
      const expectedContent = fs.readFileSync(path.resolve(expectedDirectory, 'style.css'), 'utf-8').replace(/\s/gm, '');
      const actualContent = fs.readFileSync(path.resolve(outputDirectory, 'emotion.css'), 'utf-8').replace(/\s/gm, '');
      expect(actualContent).toEqual(expectedContent);
    });
  });
});
