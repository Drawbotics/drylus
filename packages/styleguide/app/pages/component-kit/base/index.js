import constants from './constants';
import pageAndContent from './page-and-content';
import providers from './providers';

const components = {
  providers,
  constants,
  pageAndContent,
};

export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
