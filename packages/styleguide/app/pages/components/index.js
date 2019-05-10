import button from './button';
import title from './title';
import roundIcon from './round-icon';
import segmentedControl from './segmented-control';


const components = {
  button,
  title,
  roundIcon,
  segmentedControl,
};


export default Object.keys(components)
  .sort()
  .reduce((memo, key) => ({ ...memo, [key]: components[key] }), {});
