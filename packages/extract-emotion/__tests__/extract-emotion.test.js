import path from 'path';
import fs from 'fs';
import webpack from 'webpack';


describe('ExtractEmotion', () => {
  it('should extract the CSS from the generated HTML head', (done) => {
    const example = path.resolve(__dirname, 'example');
    const exampleConfig = require(path.resolve(example, 'webpack.config.js'));
    const config = {
      ...exampleConfig,
      mode: 'development',
      context: example,
      cache: false,
      output: {
        path: path.resolve(example, 'output'),
      },
    };
    webpack(config, (err, stats) => {
      if (err) {
        done(err);
        return;
      }
      done();
      // BELOW TO BE MODIFIED

      console.log(
        stats.toString({
          context: path.resolve(__dirname, '..'),
          chunks: true,
          chunkModules: true,
          modules: false,
        })
      );

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
      // read here
    });
  });
});
