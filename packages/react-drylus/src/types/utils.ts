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

// TODO
// export all the interface props
// Table: dont extend record, add any key value, expose TableEntry + limit to keys in data
// Alert: dont make onClickDismissed required
// Fix number input
