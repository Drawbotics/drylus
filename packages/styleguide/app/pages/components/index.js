import button from './button';
import title from './title';
import roundIcon from './round-icon';


const components = {
  button,
  title,
  roundIcon,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
