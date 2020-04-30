import PropTypes from 'prop-types';

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

type FunctionComponent = (props: React.PropsWithChildren<any>) => React.ReactElement;

export function checkProps(
  props: Record<string, any | undefined>,
  expectedTypes: Record<string, FunctionComponent | Array<FunctionComponent>>,
): boolean {
  return Object.keys(props).reduce<boolean>((memo, propName) => {
    const expectedType = expectedTypes[propName];
    const currentProp = props[propName];
    let currentType;
    let isTypeValid = true;
    if (
      expectedType == null ||
      currentProp == null ||
      (currentProp!.type == null && !Array.isArray(currentProp))
    ) {
      return memo;
    }
    if (Array.isArray(currentProp)) {
      isTypeValid = currentProp.every((prop: any) => {
        if (prop.type == null) {
          // dont consider props that are not components with a type
          return true;
        }
        if (Array.isArray(expectedType)) {
          return expectedType.includes(prop.type);
        }
        currentType = prop.type?.name;
        return prop.type === expectedType;
      });
    } else {
      if (Array.isArray(expectedType)) {
        isTypeValid = expectedType.includes(currentProp.type);
      } else {
        isTypeValid = currentProp.type === expectedType;
      }
      currentType = currentProp.type?.name;
    }
    if (!isTypeValid) {
      console.warn(
        `Prop \`${propName}\` is not valid (currently \`${currentType}\` component), accepted component types are: ${
          Array.isArray(expectedType)
            ? expectedType.map((func) => func.name).join(', ')
            : expectedType.name
        }`,
      );
    }
    return memo && isTypeValid;
  }, true);
}
