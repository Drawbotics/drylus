import button from './button';
import title from './title';


const components = {
  button,
  title,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
