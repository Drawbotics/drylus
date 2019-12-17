const sizeDescription = `
interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

interface SizeDescription {
  top?: Size;
  right?: Size;
  bottom?: Size;
  left?: Size;
}

declare interface SizeDescriptionAlt {
  vertical?: Size;
  horizontal?: Size;
}
`;


const margin = `
export interface MarginProps {
  size?: Size | SizeDescription | SizeDescriptionAlt;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Margin: React.FunctionComponent<MarginProps>;
`;


const padding = `
export interface PaddingProps {
  size?: Size | SizeDescription | SizeDescriptionAlt;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Padding: React.FunctionComponent<PaddingProps>;
`;


module.exports = {
  sizeDescription,
  padding,
  margin,
};