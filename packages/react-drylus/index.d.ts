import React from 'react';

export enum Category {
  BRAND = 'BRAND',
  INFO = 'INFO',
  DANGER = 'DANGER',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  PRIMARY = 'PRIMARY',
}

export enum Size {
  EXTRA_SMALL = 'EXTRA_SMALL',
  SMALL = 'SMALL',
  DEFAULT = 'DEFAULT',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE',
  HUGE = 'HUGE',
  EXTRA_HUGE = 'EXTRA_HUGE',
  MASSIVE = 'MASSIVE',
}

export enum Tier {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
}

export enum Position {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}


export interface ContentProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  style?: object;
}

export const Content: React.FunctionComponent<ContentProps>;


export interface DrylusProviderProps {
  children: React.ReactNode;
  style?: object;
}

export const DrylusProvider: React.FunctionComponent<DrylusProviderProps>;


export interface PageProps {
  children: React.ReactNode;
  style?: object;
}

export const Page: React.FunctionComponent<PageProps>;


export interface ThemeProviderProps {
  children: React.ReactNode;
  style?: object;
}

export const ThemeProvider: React.FunctionComponent<ThemeProviderProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface AvatarProps {
  image?: string;
  text?: string;
  hint?: string;
  size?: any;
  category?:
    | Category.DANGER
    | Category.INFO
    | Category.SUCCESS
    | Category.WARNING
    | Category.BRAND;
  backgroundColor?: string;
  style?: object;
  responsive?: Responsive;
}

export const Avatar: React.FunctionComponent<AvatarProps>;


export interface BadgeProps {
  value: number;
  max?: number;
  category?:
    | Category.BRAND
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING
    | Category.DANGER;
  style?: object;
}

export const Badge: React.FunctionComponent<BadgeProps>;


export interface BannerProps {
  children: React.ReactNode;
  title?: string;
  category:
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  style?: object;
  trailing?: React.ReactNode;
}

export const Banner: React.FunctionComponent<BannerProps>;


export interface BigCheckboxProps {
  onChange(): void;
  value: boolean;
  children?: React.ReactNode;
  label: string;
  name?: string;
  disabled?: boolean;
  style?: object;
}

export const BigCheckbox: React.FunctionComponent<BigCheckboxProps>;


export interface BigRadioProps {
  checked?: boolean;
  onChange(): void;
  value: string | number;
  children?: React.ReactNode;
  label: string;
  name?: string;
  disabled?: boolean;
  style?: object;
}

export const BigRadio: React.FunctionComponent<BigRadioProps>;


export interface BreadcrumbsProps {
  crumbs: shape[];
  linkComponent?: React.ReactNode;
  style?: object;
}

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ButtonProps {
  children?: string;
  disabled?: boolean;
  onClick?(): void;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING
    | Category.PRIMARY;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  tier?: Tier.PRIMARY | Tier.SECONDARY | Tier.TERTIARY;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  fullWidth?: boolean;
  style?: object;
  responsive?: Responsive;
}

export const Button: React.FunctionComponent<ButtonProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ButtonLinkProps {
  children?: string;
  disabled?: boolean;
  onClick?(): void;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  tier?: Tier.PRIMARY | Tier.SECONDARY | Tier.TERTIARY;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  fullWidth?: boolean;
  style?: object;
  responsive?: Responsive;
}

export const ButtonLink: React.FunctionComponent<ButtonLinkProps>;


export interface CalloutProps {
  children: React.ReactNode;
  category:
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  style?: object;
}

export const Callout: React.FunctionComponent<CalloutProps>;


export interface CircularProgressProps {
  percentage?: number;
  text?: string;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;
  style?: object;
}

export const CircularProgress: React.FunctionComponent<CircularProgressProps>;


export interface CollapsibleProps {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
  onClick?(): void;
  style?: object;
}

export const Collapsible: React.FunctionComponent<CollapsibleProps>;


export interface DotProps {
  category?:
    | Category.BRAND
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING
    | Category.DANGER
    | Category.PRIMARY;
  style?: object;
}

export const Dot: React.FunctionComponent<DotProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface DrawerProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  visible: boolean;
  onClickClose?(): void;
  onClickOverlay?(): void;
  asOverlay?: boolean;
  width?: number | string;
  raw?: boolean;
  title?: string;
  style?: object;
  responsive?: Responsive;
  side?: Position.LEFT | Position.RIGHT;
}

export const Drawer: React.FunctionComponent<DrawerProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actions?: any;
  children?: any;
  style?: object;
  variation?:
    | EmptyStateVariations.DEFAULT
    | EmptyStateVariations.PROCESSING
    | EmptyStateVariations.NOT_FOUND
    | EmptyStateVariations.NOT_ALLOWED
    | EmptyStateVariations.FAILED;
  responsive?: Responsive;
}

export const EmptyState: React.FunctionComponent<EmptyStateProps>;


export interface FilterGroupProps {
  label: string;
  icon: string;
  filters: React.ReactNode;
  renderButton?(): void;
  clearAllLabel?: string;
  onClear(): void;
  active?: boolean;
}

export const FilterGroup: React.FunctionComponent<FilterGroupProps>;


export interface IconProps {
  name: string;
  bold?: boolean;
  onClick?(): void;
  category?:
    | Category.DANGER
    | Category.INFO
    | Category.SUCCESS
    | Category.WARNING
    | Category.BRAND;
  style?: object;
}

export const Icon: React.FunctionComponent<IconProps>;


export interface LabelProps {
  children?: string | React.ReactNode;
  ellipsized?: boolean;
  style?: object;
  isPlaceholder?: boolean;
}

export const Label: React.FunctionComponent<LabelProps>;


export interface LoadingPlaceholderProps {
  height?: number | string;
  width?: number | string;
}

export const LoadingPlaceholder: React.FunctionComponent<LoadingPlaceholderProps>;


export interface MapProps {
  height?: number;
  interactive?: boolean;
  zoom?: number;
  accessToken: string;
  markers: shape[];
  style?: object;
}

export const Map: React.FunctionComponent<MapProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ModalProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  visible: boolean;
  onClickClose?(): void;
  size?: Size.DEFAULT | Size.LARGE;
  raw?: boolean;
  title?: string;
  style?: object;
  responsive?: Responsive;
}

export const Modal: React.FunctionComponent<ModalProps>;


export interface PaginationProps {
  pages: number;
  prevLabel?: string;
  nextLabel?: string;
  onChange(): void;
  value?: number;
  maxVisiblePages?: number;
  style?: object;
}

export const Pagination: React.FunctionComponent<PaginationProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ParagraphProps {
  children?: React.ReactNode;
  style?: object;
  align?: Align.CENTER | Align.LEFT | Align.RIGHT;
  responsive?: Responsive;
}

export const Paragraph: React.FunctionComponent<ParagraphProps>;


export interface PopoverProps {
  message?: any;
  content?: any;
  children: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: object;
  exitOnClick?: boolean;
}

export const Popover: React.FunctionComponent<PopoverProps>;


export interface ProgressBarProps {
  percentage?: number;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  style?: object;
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps>;


export interface RoundIconProps {
  name: string;
  size?: any;
  bold?: boolean;
  category?:
    | Category.DANGER
    | Category.INFO
    | Category.SUCCESS
    | Category.WARNING
    | Category.BRAND;
  style?: object;
}

export const RoundIcon: React.FunctionComponent<RoundIconProps>;


export interface SegmentedControlProps {
  options?: any;
  valueKey?: string;
  labelKey?: string;
  value?: string | number;
  onChange?(): void;
  style?: object;
}

export const SegmentedControl: React.FunctionComponent<SegmentedControlProps>;


export interface SeparatorProps {
  vertical?: boolean;
  style?: object;
}

export const Separator: React.FunctionComponent<SeparatorProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface SpinnerProps {
  size?: Size.DEFAULT | Size.SMALL | Size.LARGE;
  category?: Category.BRAND | Category.INFO;
  inversed?: boolean;
  fullSize?: boolean;
  style?: object;
  responsive?: Responsive;
}

export const Spinner: React.FunctionComponent<SpinnerProps>;


export interface SplashScreenProps {
  visible?: any;
  text?: string;
}

export const SplashScreen: React.FunctionComponent<SplashScreenProps>;


export interface TabNavigationProps {
  options?: any;
  valueKey?: string;
  labelKey?: string;
  value?: string | number;
  onChange?(): void;
  vertical?: boolean;
  linkComponent?: React.ReactNode;
  style?: object;
}

export const TabNavigation: React.FunctionComponent<TabNavigationProps>;


export interface TagProps {
  children: string;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  onClickRemove?(): void;
  inversed?: boolean;
  style?: object;
}

export const Tag: React.FunctionComponent<TagProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface TextProps {
  inversed?: boolean;
  bold?: boolean;
  light?: boolean;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  tier?: Tier.PRIMARY | Tier.SECONDARY | Tier.TERTIARY;
  disabled?: boolean;
  children?: string | number;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  style?: object;
  responsive?: Responsive;
}

export const Text: React.FunctionComponent<TextProps>;


export interface TextLinkProps {
  children?: string;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  underlined?: LinkUnderlined.ALWAYS | LinkUnderlined.HOVER;
  style?: object;
}

export const TextLink: React.FunctionComponent<TextLinkProps>;


export interface TileProps {
  title?: string;
  children: React.ReactNode;
  style?: object;
  noPadding?: boolean;
}

export const Tile: React.FunctionComponent<TileProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface TitleProps {
  children?: React.ReactNode | string;
  size?: 1 | 2 | 3 | 4;
  noMargin?: boolean;
  style?: object;
  align?: Align.CENTER | Align.LEFT | Align.RIGHT;
  responsive?: Responsive;
}

export const Title: React.FunctionComponent<TitleProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ToggleProps {
  onChange(): void;
  disabled?: boolean;
  value: boolean;
  size?: Size.SMALL | Size.DEFAULT;
  style?: object;
  responsive?: Responsive;
}

export const Toggle: React.FunctionComponent<ToggleProps>;


export interface TooltipProps {
  message?: any;
  content?: any;
  children: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: object;
}

export const Tooltip: React.FunctionComponent<TooltipProps>;


export interface CheckboxProps {
  children?: string;
  onChange?(): void;
  disabled?: boolean;
  value?: boolean;
  name?: string;
  error?: string | boolean;
  size?: Size.LARGE | Size.DEFAULT;
  style?: object;
  isPlaceholder?: boolean;
}

export const Checkbox: React.FunctionComponent<CheckboxProps>;


declare interface Value {
  day: number;
  month: number;
  year: number;
}

declare interface MaxDate {
  day: number;
  month: number;
  year: number;
}

declare interface MinDate {
  day: number;
  month: number;
  year: number;
}

declare interface ActiveStartDate {
  day: number;
  month: number;
  year: number;
}

export interface DateInputProps {
  value: any;
  onChange?(): void;
  name?: string;
  locale?: string;
  disabled?: boolean;
  placeholder?: string;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  displayOptions?: object;
  calendarOptions?: object;
  maxDate?: MaxDate;
  minDate?: MinDate;
  activeStartDate?: ActiveStartDate;
  loading?: boolean;
  style?: object;
}

export const DateInput: React.FunctionComponent<DateInputProps>;


export interface FormGroupProps {
  label: React.ReactNode;
  input: React.ReactNode;
  horizontal?: boolean;
  style?: object;
}

export const FormGroup: React.FunctionComponent<FormGroupProps>;


export interface HintProps {
  children: string;
  category?: Category.DANGER;
  style?: object;
}

export const Hint: React.FunctionComponent<HintProps>;


export interface InputGroupProps {
  children: React.ReactNode;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  style?: object;
}

export const InputGroup: React.FunctionComponent<InputGroupProps>;


export interface MultiSelectProps {
  options?: any;
  values: any[];
  name?: string;
  disabled?: boolean;
  valueKey?: string;
  labelKey?: string;
  placeholder?: string;
  onChange?(): void;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  loading?: boolean;
  style?: object;
}

export const MultiSelect: React.FunctionComponent<MultiSelectProps>;


export interface NumberInputProps {
  value: any;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?(): void;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  renderValue?(): void;
  max?: number;
  min?: number;
  withCounter?: boolean;
  loading?: boolean;
  style?: object;
}

export const NumberInput: React.FunctionComponent<NumberInputProps>;


export interface RadioGroupProps {
  options?: any;
  name?: string;
  valueKey?: string;
  labelKey?: string;
  onChange?(): void;
  disabled?: boolean;
  value?: string | number;
  error?: string | boolean;
  className?: string;
  hint?: string;
  style?: object;
  isPlaceholder?: boolean;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps>;


export interface SearchInputProps {
  options?: string[];
  value: string;
  name?: string;
  onChange(): void;
  noResultLabel?: string;
  placeholder?: string;
  isLoading?: boolean;
  style?: object;
}

export const SearchInput: React.FunctionComponent<SearchInputProps>;


export interface SelectProps {
  options?: any;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  valueKey?: string;
  labelKey?: string;
  placeholder?: string;
  onChange?(): void;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  loading?: boolean;
  style?: object;
}

export const Select: React.FunctionComponent<SelectProps>;


declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface LayoutProps {
  children: React.ReactNode;
  bar: React.ReactNode;
  position: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  fixed?: boolean;
  barScrollable?: boolean;
  style?: object;
  responsive?: Responsive;
}

export const Layout: React.FunctionComponent<LayoutProps>;


export interface ListTileProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?(): void;
  style?: object;
}

export const ListTile: React.FunctionComponent<ListTileProps>;


declare interface Size {
  vertical?: any;
  horizontal?: any;
}

declare interface Size {
  left?: any;
  right?: any;
  bottom?: any;
  top?: any;
}

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface MarginProps {
  size?: any;
  children?: React.ReactNode;
  style?: object;
  responsive?: Responsive;
}

export const Margin: React.FunctionComponent<MarginProps>;


declare interface Size {
  vertical?: any;
  horizontal?: any;
}

declare interface Size {
  left?: any;
  right?: any;
  bottom?: any;
  top?: any;
}

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface PaddingProps {
  size?: any;
  children?: React.ReactNode;
  style?: object;
  responsive?: Responsive;
}

export const Padding: React.FunctionComponent<PaddingProps>;
