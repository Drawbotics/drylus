import { Size } from '../enums';

export type Style = Record<string, any>;

export interface Responsive<T> {
  XS?: Partial<T>;
  S?: Partial<T>;
  M?: Partial<T>;
  L?: Partial<T>;
  XL?: Partial<T>;
  HUGE?: Partial<T>;
}

export interface Option<T> {
  value: T;
  label: string;
}

export type OnClickCallback<T> = (event: React.MouseEvent<T, MouseEvent>) => void;

export interface Rectangular {
  vertical?: Size;
  horizontal?: Size;
}

export interface Variable {
  left?: Size;
  top?: Size;
  right?: Size;
  bottom?: Size;
}

// TODO
// Table: dont extend record, add any key value, expose TableEntry + limit to keys in data
// Fix number input
