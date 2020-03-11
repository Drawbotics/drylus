export type Style = Record<string, any>;

export interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface Option {
  value: number | string;
  label: string;
}
