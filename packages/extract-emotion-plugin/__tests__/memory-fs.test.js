import path from 'path';
import MemoryFS from 'memory-fs';
import webpack from 'webpack';


const assetsNames = (json) => json.assets.map((asset) => asset.name);


describe('MemoryFS', () => {
  it('should preserve asset even if not emitted', (done) => {
    const example = path.resolve(__dirname, 'example');
    const webpackConfig = require(path.resolve(example, 'webpack.config.js'));
    const compiler = webpack({
      ...webpackConfig,
      mode: 'development',
      context: example,
      cache: false,
    });
    compiler.outputFileSystem = new MemoryFS();
    compiler.run((err1, stats1) => {
      if (err1) {
        done(err1);
        return;
      }
      compiler.run((err2, stats2) => {
        if (err2) {
          done(err2);
          return;
        }
        expect(assetsNames(stats1.toJson())).toEqual(
          assetsNames(stats2.toJson())
        );
        done();
      });
    });
  });
});
