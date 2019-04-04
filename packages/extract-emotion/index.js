


class ExtractEmotionPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('ExtractEmotionPlugin', (compilation, callback) => {
      const assetsList = Object.keys(compilation.assets);
      const entryName = this.options.bundleName || 'main';
      const entry = compilation.assets[`${entryName}.js`];

      if (! entry) {
        callback(new Error('[extract-emotion-plugin] bundleName not specified'));
        return;
      }

      // Create a header string for the generated file:
      var filelist = 'In this build:\n\n';

      // Loop through all compiled assets,
      // adding a new line item for each filename.
      for (var _filename in compilation.assets) {
        filelist += '- ' + _filename + '\n';
      }

      // Insert this list into the webpack build as a new file asset:
      const optionsFilename = this.options.filename;
      const filename = optionsFilename.includes('[name]') ? optionsFilename.replace('[name]', entryName) : optionsFilename || 'main.css';
      console.log(entry);
      compilation.assets = {
        [filename]: {
          source: () => entry,
          size: () => entry.length,
        },
      };

      callback();
    });
  }
}


module.exports = ExtractEmotionPlugin;
