const path = require('path');
const fs = require('fs');
const webfont = require('webfont').default;

async function generate(options) {
  return new Promise((resolve, reject) => {
    // Original code from webfont CLI
    webfont(options)
      .then(async (result) => {
        const { fontName, dest } = result.config;

        let destTemplate = null;

        if (result.template) {
          ({ destTemplate } = result.config);

          if (!destTemplate) {
            destTemplate = dest;
          }

          if (result.usedBuildInTemplate) {
            destTemplate = path.join(
              destTemplate,
              `${result.config.fontName}.${result.config.template}`,
            );
          } else {
            destTemplate = path.join(
              destTemplate,
              path.basename(result.config.template).replace('.njk', ''),
            );
          }
        }

        for (let type of Object.keys(result)) {
          if (type !== 'config' && type !== 'usedBuildInTemplate' && type !== 'glyphsData') {
            const content = result[type];
            let file = null;

            if (type !== 'template') {
              file = path.resolve(path.join(dest, `${fontName}.${type}`));
            } else {
              file = path.resolve(destTemplate);
            }
            console.log('Writing', `${fontName}.${type}`);

            await new Promise((resolve1) => fs.writeFile(file, content, resolve1));
          }
        }

        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = generate;
