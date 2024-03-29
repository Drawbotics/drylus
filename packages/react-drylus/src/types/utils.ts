import { CSSProperties } from 'react';

import { Size } from '../enums';

export type Style = CSSProperties;

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

export interface Directional {
  left?: Size;
  top?: Size;
  right?: Size;
  bottom?: Size;
}

export interface HTMLElementWithDisabled extends HTMLElement {
  disabled?: boolean;
}
