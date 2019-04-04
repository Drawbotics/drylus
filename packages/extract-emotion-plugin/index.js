const { JSDOM } = require('jsdom');


function removeHash(css, replacement) {
  return css.replace(/(css-).*?(-)/gm, replacement ? `${replacement}-` : '');
}


function runBrowser(code) {
  const dom = new JSDOM(`
    <html>
      <head></head>
      <body>
        <script>${code}</script>
      </body>
    </html>
  `, { runScripts: 'dangerously' });
  const styles = dom.window.document.styleSheets.map((sheet) =>
    sheet.cssRules.map((rules) => rules.cssText)
  );
  const stylesList = styles.reduce((memo, list) => [ ...memo, ...list.reduce((memo, rule) => [ ...memo, rule ], [])], []);
  return stylesList.join('');
}


class ExtractEmotionPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('ExtractEmotionPlugin', (compilation, callback) => {
      const assetsList = Object.keys(compilation.assets);
      const entryName = this.options.bundleName || 'main';
      const asset = compilation.assets[`${entryName}.js`];

      if (! asset) {
        callback(new Error('[extract-emotion-plugin] bundleName not specified'));
        return;
      }

      const optionsFilename = this.options.filename;
      const filename = optionsFilename.includes('[name]') ? optionsFilename.replace('[name]', entryName) : optionsFilename || 'main.css';
      const jsSource = asset.source();

      const css = runBrowser(jsSource);
      const noHashCSS = removeHash(css, this.options.prefix);

      // remove JS bundle from which we build the CSS
      delete compilation.assets[`${entryName}.js`];

      // assign new CSS bundle for the CSS
      compilation.assets[filename] = {
        source: () => noHashCSS,
        size: () => asset.length,
      };

      callback();
    });
  }
}


module.exports = ExtractEmotionPlugin;
