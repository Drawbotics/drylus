const { mapping } = require('@drawbotics/icons/dist/drycons');

const filter = `
export interface BaseFilterProps {
  clearLabel?: string;
  label: string;
  onClear?: OnClickCallback;
  children?: React.ReactNode;
  align?: Align.LEFT | Align.RIGHT;
  active?: boolean;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  closeOnClick?: boolean;
  responsive?: Responsive;
}

interface Option {
  value?: string | number;
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export declare const BaseFilter: React.FunctionComponent<BaseFilterProps>;

export interface SelectFilterProps extends BaseFilterProps {
  options?: Array<Option>;
  value?: string | number;
  valueKey?: string;
  labelKey?: string;
  onChange(value: string | number): void;
  style?: React.CSSProperties;
}

export declare const SelectFilter: React.FunctionComponent<SelectFilterProps>;

export interface CheckboxFilterProps {
  options?: Array<Option>;
  values?: Array<string | number>;
  valueKey?: string;
  labelKey?: string;
  onChange(values: Array<string | number>): void;
  style?: React.CSSProperties;
}

export declare const CheckboxFilter: React.FunctionComponent<CheckboxFilterProps>;
`;

const icon = `
export interface IconProps {
  name: IconName;
  bold?: boolean;
  onClick?: OnClickCallback;
  category?:
    | Category.DANGER
    | Category.INFO
    | Category.SUCCESS
    | Category.WARNING
    | Category.BRAND;
  style?: React.CSSProperties;
}

export declare const Icon: React.FunctionComponent<IconProps>;
`;

const generatedIconType = Object.values(mapping)
  .map((v) => `'${v}'`)
  .join(' | ');

const icons = `
type IconName = ${generatedIconType};
`;

module.exports = {
  filter,
  icons,
  icon,
};
