const path = require('path');
const s3sync = require('@drawbotics/s3sync');
const aws = require('aws-sdk');

const version = require('../package.json').version;
const cloudfront = new aws.CloudFront();

function invalidateDistribution(folder) {
  const params = {
    DistributionId: 'E2S7MPSAFSXZ32',
    InvalidationBatch: {
      CallerReference: `${Math.floor(new Date().getTime() / 1000)}`,
      Paths: {
        Quantity: 1,
        Items: [ `/${folder}*` ],
      },
    },
  };
  return new Promise((resolve, reject) => {
    cloudfront.createInvalidation(params, (err, data) => err ? reject(err) : resolve(data));
  });
}

async function sync() {
  const isDev = process.env.NODE_ENV !== 'production';
  const folder = 'drycons';

  await s3sync({
    sourceDir: path.resolve(__dirname, '../dist'),
    folder,
    version,
    dev: isDev,
    forceSync: true,
  });

  if (isDev) {
    console.log('Uploading to dev, invalidating cdn distribution...');
    invalidateDistribution(folder + '/dev');
  }
}

sync();
