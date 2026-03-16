/* global process, console */
import path from 'path';
import { fileURLToPath } from 'url';
import s3sync from '@drawbotics/s3sync';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const version = require('../package.json').version;
const cloudfront = new CloudFrontClient({ region: 'eu-west-1' });

function invalidateDistribution(folder) {
  const command = new CreateInvalidationCommand({
    DistributionId: 'E2S7MPSAFSXZ32',
    InvalidationBatch: {
      CallerReference: `${Math.floor(new Date().getTime() / 1000)}`,
      Paths: {
        Quantity: 1,
        Items: [ `/${folder}*` ],
      },
    },
  });
  return cloudfront.send(command);
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
