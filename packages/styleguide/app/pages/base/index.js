import providers from './providers';
import constants from './constants';


const components = {
  providers,
  constants,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
