export type Style = Record<string, any>;

export interface Responsive<T> {
  XS?: Partial<T>;
  S?: Partial<T>;
  M?: Partial<T>;
  L?: Partial<T>;
  XL?: Partial<T>;
  HUGE?: Partial<T>;
}

export interface Option {
  value: number | string;
  label: string;
}

export type OnClickCallback<T> = (event: React.MouseEvent<T, MouseEvent>) => void;
