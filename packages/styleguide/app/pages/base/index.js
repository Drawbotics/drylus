import providers from './providers';
import constants from './constants';
import pageAndContent from './page-and-content';


const components = {
  providers,
  constants,
  pageAndContent,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
