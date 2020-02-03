const fs = require('fs');
const path = require('path');
const extractEmotion = require('@drawbotics/extract-emotion');

const options = {
  inputFile: path.resolve(__dirname, '../src/react-components'),
  output: path.resolve(__dirname, '../dist'),
  filename: 'drylus.css',
  prefix: 'Drylus',
};

fs.watch(
  path.resolve(__dirname, '../../react-drylus/lib'),
  { recursive: true },
  (eventType, filename) => {
    if (eventType === 'change') {
      extractEmotion(options);
    }
  },
);

// NOTE initial call
extractEmotion(options);
