const { mapping } = require('@drawbotics/icons/dist/drycons');


const filter = `
export interface BaseFilterProps {
  clearLabel?: string;
  label: string;
  onClear?(): OnClickCallback<HTMLButtonElement>;
  children?: React.ReactNode;
  align?: Align.LEFT | Align.RIGHT;
  active?: boolean;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

interface Option {
  value?: string | number;
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

type OnChangeOptionCallback = (value: string | number) => void;

export const Filter: React.FunctionComponent<FilterProps>;

export interface SelectFilterProps extends BaseFilterProps {
  options?: Array<Option>;
  value?: string | number;
  valueKey?: string;
  labelKey?: string;
  onChange(): OnChangeOptionCallback;
  style?: CSSProperties;
}

export const SelectFilter: React.FunctionComponent<SelectFilterProps>;

interface Value = string | number;

export interface CheckboxFilterProps {
  options?: Array<Option>;
  values?: Array<Value>;
  valueKey?: string;
  labelKey?: string;
  onChange(): OnChangeOptionCallback;
  style?: CSSProperties;
}

export const CheckboxFilter: React.FunctionComponent<CheckboxFilterProps>;
`;


const generatedIconType = Object.values(mapping).map((v) => `'${v}'`).join(' | ');

const icons = `
type Icons = ${generatedIconType};
`;


module.exports = {
  filter,
  icons,
};