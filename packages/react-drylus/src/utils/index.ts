import PropTypes from 'prop-types';

export * from './enums';
export * from './inject-global-styles';
export * from './normalize';

export const Deprecated = (() => {
  return (props: any, propName: string, componentName: string) => {
    if (props[propName]) {
      console.warn(
        `Deprecation warning: \`${propName}\` has been deprecated. It will be removed in the next major version (${componentName})`,
      );
    }

    return PropTypes.checkPropTypes({}, props, propName, componentName);
  };
})();
