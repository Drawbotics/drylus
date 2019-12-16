import React from 'react';

type OnClickCallback<T> = (event: React.MouseEvent<T, React.MouseEvent>) => void;
type OnChangeCallback<T> = (event: React.ChangeEvent<T>) => void;


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

// components/EmptyState
export enum EmptyStateVariation {
  DEFAULT = 'DEFAULT',
  PROCESSING = 'PROCESSING',
  NOT_FOUND = 'NOT_FOUND',
  NOT_ALLOWED = 'NOT_ALLOWED',
  FAILED = 'FAILED',
}

// components/TextLink
export enum LinkUnderlined {
  ALWAYS = 'ALWAYS',
  HOVER = 'HOVER',
}

// components/Flex
export enum FlexDirection = {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export enum FlexJustify = {
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
  SPACE_AROUND = 'SPACE_AROUND',
  SPACE_BETWEEN = 'SPACE_BETWEEN',
  SPACE_EVENLY = 'SPACE_EVENLY',
}

export enum FlexAlign = {
  STRETCH = 'STRETCH',
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
}


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


type Icons = 'activity' | 'airplay' | 'alert-circle' | 'alert-octagon' | 'alert-triangle' | 'align-center' | 'align-justify' | 'align-left' | 'align-right' | 'anchor' | 'aperture' | 'arrow-down-left' | 'arrow-down-right' | 'arrow-down' | 'arrow-left' | 'arrow-right' | 'arrow-up-left' | 'arrow-up-right' | 'arrow-up' | 'at-sign' | 'award' | 'bar-chart-2' | 'bar-chart' | 'battery-charging' | 'battery' | 'bell-off' | 'bell' | 'billboard' | 'bluetooth' | 'book' | 'bookmark' | 'box' | 'brand-id' | 'briefcase' | 'brochure' | 'burger' | 'calendar' | 'camera-off' | 'camera' | 'cast' | 'check-circle' | 'check-square' | 'check' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevrons-down' | 'chevrons-left' | 'chevrons-right' | 'chevrons-up' | 'chrome' | 'circle' | 'clipboard' | 'clock' | 'cloud-drizzle' | 'cloud-lightning' | 'cloud-off' | 'cloud-rain' | 'cloud-snow' | 'cloud' | 'command' | 'commercial-floorplan' | 'compass' | 'copy' | 'corner-down-left' | 'corner-down-right' | 'corner-left-down' | 'corner-left-up' | 'corner-right-down' | 'corner-right-up' | 'corner-up-left' | 'corner-up-right' | 'cpu' | 'credit-card' | 'crosshair' | 'delete' | 'disc' | 'download-cloud' | 'download' | 'drawbotics' | 'drone-shooting' | 'droplet' | 'edit-2' | 'edit-3' | 'edit' | 'exterior-3d' | 'exterior-restyling' | 'external-link' | 'eye-off' | 'eye' | 'facebook' | 'fast-forward' | 'feather' | 'file-minus' | 'file-plus' | 'file-text' | 'file' | 'film' | 'filter' | 'flag' | 'flyer' | 'folder' | 'github' | 'globe' | 'grid' | 'hash' | 'headphones' | 'heart' | 'home' | 'image' | 'inbox' | 'index.js' | 'info' | 'instagram' | 'interior-3d' | 'interior-tour-3d' | 'landing-page' | 'layers' | 'layout' | 'life-buoy' | 'link-2' | 'link' | 'loader' | 'lock' | 'log-in' | 'log-out' | 'mail' | 'map-pin' | 'map' | 'maximize-2' | 'maximize' | 'media-kit' | 'menu' | 'message-circle' | 'message-square' | 'mic-off' | 'mic' | 'minimize-2' | 'minimize' | 'minus-circle' | 'minus-square' | 'minus' | 'model-360' | 'monitor' | 'moon' | 'more-horizontal' | 'more-vertical' | 'move' | 'music' | 'navigation-2' | 'navigation' | 'newsletter' | 'octagon' | 'package' | 'panorama-360' | 'pause-circle' | 'pause' | 'percent' | 'phone-call' | 'phone-forwarded' | 'phone-incoming' | 'phone-missed' | 'phone-off' | 'phone-outgoing' | 'phone' | 'photo-editing' | 'photo-shooting' | 'pie-chart' | 'plan-2d' | 'play-circle' | 'play' | 'plus-circle' | 'plus-square' | 'plus' | 'pocket' | 'power' | 'printer' | 'radio' | 'refresh-ccw' | 'refresh-cw' | 'repeat' | 'revo-alt' | 'revo' | 'rewind' | 'rotate-ccw' | 'rotate-cw' | 'save' | 'scissors' | 'search' | 'server' | 'settings' | 'share-2' | 'share' | 'shield' | 'shoebox' | 'shuffle' | 'sidebar' | 'site-plan' | 'skip-back' | 'skip-forward' | 'slack' | 'slash' | 'smartphone' | 'social-media-kit' | 'speaker' | 'square' | 'star' | 'stop-circle' | 'sun' | 'sunrise' | 'sunset' | 'tablet' | 'tag' | 'target' | 'thermometer' | 'thumbs-down' | 'thumbs-up' | 'toggle-left' | 'toggle-right' | 'tour-3d' | 'trash-2' | 'trash' | 'trending-down' | 'trending-up' | 'triangle' | 'twitter' | 'type' | 'umbrella' | 'unlock' | 'upload-cloud' | 'upload' | 'user-check' | 'user-minus' | 'user-plus' | 'user-x' | 'user' | 'users' | 'video-animation' | 'video-off' | 'video' | 'voicemail' | 'volume-1' | 'volume-2' | 'volume-x' | 'volume' | 'vr' | 'watch' | 'website' | 'wifi' | 'wind' | 'x-circle' | 'x-square' | 'x' | 'zap' | 'zoom-in' | 'zoom-out';


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


export interface PaddingProps {
  size?: Sizes | SizeDescription | SizeDescriptionAlt;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Padding: React.FunctionComponent<PaddingProps>;


export interface MarginProps {
  size?: Sizes | SizeDescription | SizeDescriptionAlt;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Margin: React.FunctionComponent<MarginProps>;

export interface ContentProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const Content: React.FunctionComponent<ContentProps>;

export interface DrylusProviderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const DrylusProvider: React.FunctionComponent<DrylusProviderProps>;

export interface PageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Page: React.FunctionComponent<PageProps>;

export interface ThemeProviderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ThemeProvider: React.FunctionComponent<ThemeProviderProps>;

export interface AlertProps {
  text: string;
  category:
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  onClickDismiss: OnClickCallback;
  id?: number | string;
  hideDelay?: number;
}

export const Alert: React.FunctionComponent<AlertProps>;

export interface AlertsProviderProps {
  children: React.ReactNode;
}

export const AlertsProvider: React.FunctionComponent<AlertsProviderProps>;

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
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
  trailing?: React.ReactNode;
}

export const Banner: React.FunctionComponent<BannerProps>;

export interface BigCheckboxProps {
  onChange(): OnChangeCallback;
  value: boolean;
  children?: React.ReactNode;
  label: string;
  name?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const BigCheckbox: React.FunctionComponent<BigCheckboxProps>;

export interface BigRadioProps {
  checked?: boolean;
  onChange(): OnChangeCallback;
  value: string | number;
  children?: React.ReactNode;
  label: string;
  name?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const BigRadio: React.FunctionComponent<BigRadioProps>;

export interface BreadcrumbsProps {
  crumbs: shape[];
  linkComponent?: React.ReactNode;
  style?: React.CSSProperties;
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
  onClick: OnClickCallback;
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
  style?: React.CSSProperties;
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
  onClick: OnClickCallback;
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
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
}

export const CircularProgress: React.FunctionComponent<CircularProgressProps>;

export interface CollapsibleProps {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
  onClick: OnClickCallback;
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  onClickClose: OnClickCallback;
  onClickOverlay: OnClickCallback;
  asOverlay?: boolean;
  width?: number | string;
  raw?: boolean;
  title?: string;
  style?: React.CSSProperties;
  responsive?: Responsive;
  side?: Position.LEFT | Position.RIGHT;
}

export const Drawer: React.FunctionComponent<DrawerProps>;

export interface DropdownOptionProps {
  text: string;
  disabled?: boolean;
  onClick: OnClickCallback;
  icon?: string;
  category?: Category.DANGER | Category.SUCCESS | Category.WARNING;
  style?: React.CSSProperties;
}

export const DropdownOption: React.FunctionComponent<DropdownOptionProps>;

export interface DropdownTitleProps {
  text: string;
  style?: object;
}

export const DropdownTitle: React.FunctionComponent<DropdownTitleProps>;

export const DropdownSeparator: React.FunctionComponent<DropdownSeparatorProps>;

export interface DropdownProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: object;
}

export const Dropdown: React.FunctionComponent<DropdownProps>;

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
  actions?: React.ReactNode[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  variation?:
    | EmptyStateVariation.DEFAULT
    | EmptyStateVariation.PROCESSING
    | EmptyStateVariation.NOT_FOUND
    | EmptyStateVariation.NOT_ALLOWED
    | EmptyStateVariation.FAILED;
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
  onClick: OnClickCallback;
  category?:
    | Category.DANGER
    | Category.INFO
    | Category.SUCCESS
    | Category.WARNING
    | Category.BRAND;
  style?: React.CSSProperties;
}

export const Icon: React.FunctionComponent<IconProps>;

export interface LabelProps {
  children?: string | React.ReactNode;
  ellipsized?: boolean;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
}

export const Label: React.FunctionComponent<LabelProps>;

export interface ListItemProps {
  children: React.ReactNode;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING
    | Category.PRIMARY;
  icon?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const ListItem: React.FunctionComponent<ListItemProps>;

export interface ListProps {
  children: React.ReactNode;
  ordered?: boolean;
  style?: object;
}

export const List: React.FunctionComponent<ListProps>;

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
  style?: React.CSSProperties;
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
  onClickClose: OnClickCallback;
  size?: Size.DEFAULT | Size.LARGE;
  raw?: boolean;
  title?: string;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Modal: React.FunctionComponent<ModalProps>;

export interface PaginationProps {
  pages: number;
  prevLabel?: string;
  nextLabel?: string;
  onChange(): OnChangeCallback;
  value?: number;
  maxVisiblePages?: number;
  style?: React.CSSProperties;
}

export const Pagination: React.FunctionComponent<PaginationProps>;

export interface PanelHeaderProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export const PanelHeader: React.FunctionComponent<PanelHeaderProps>;

export interface PanelBodyProps {
  children: React.ReactNode;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export const PanelBody: React.FunctionComponent<PanelBodyProps>;

export interface PanelSectionProps {
  children: React.ReactNode;
  title?: string;
  style?: object;
}

export const PanelSection: React.FunctionComponent<PanelSectionProps>;

export interface PanelFooterProps {
  children: React.ReactNode;
  noPadding?: boolean;
  style?: object;
}

export const PanelFooter: React.FunctionComponent<PanelFooterProps>;

export interface PanelProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  style?: object;
}

export const Panel: React.FunctionComponent<PanelProps>;

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
  style?: React.CSSProperties;
  align?: Align.CENTER | Align.LEFT | Align.RIGHT;
  responsive?: Responsive;
}

export const Paragraph: React.FunctionComponent<ParagraphProps>;

export interface PopoverProps {
  message?: React.ReactNode;
  content?: React.ReactNode;
  children: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
}

export const RoundIcon: React.FunctionComponent<RoundIconProps>;

export interface SegmentedControlProps {
  options?: any;
  valueKey?: string;
  labelKey?: string;
  value?: string | number;
  onChange?(): OnChangeCallback;
  style?: React.CSSProperties;
}

export const SegmentedControl: React.FunctionComponent<SegmentedControlProps>;

export interface SeparatorProps {
  vertical?: boolean;
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  onChange?(): OnChangeCallback;
  vertical?: boolean;
  linkComponent?: React.ReactNode;
  style?: React.CSSProperties;
}

export const TabNavigation: React.FunctionComponent<TabNavigationProps>;

export const TCell: React.FunctionComponent<TCellProps>;

export interface TRowProps {
  children: React.ReactNode;
  highlighted?: boolean;
  onClick: OnClickCallback;
  clickable?(): void;
  style?: React.CSSProperties;
}

export const TRow: React.FunctionComponent<TRowProps>;

export const THead: React.FunctionComponent<THeadProps>;

export const TBody: React.FunctionComponent<TBodyProps>;

declare interface ActiveHeader {
  key?: string;
  direction?: any;
}

export interface TableProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  withNesting?: boolean;
  data?: shape[];
  renderCell?(): void;
  renderChildCell?(): void;
  header?: any;
  childHeader?: string[];
  sortableBy?: string[];
  activeHeader?: ActiveHeader;
  onClickHeader: OnClickCallback;
  highlighted?: boolean;
  clickable?: boolean;
  isLoading?: boolean;
  onClickRow: OnClickCallback;
  activeRow?: any;
  emptyContent?: React.ReactNode;
  style?: object;
}

export const Table: React.FunctionComponent<TableProps>;

export interface TagProps {
  children: string;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  onClickRemove: OnClickCallback;
  inversed?: boolean;
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
}

export const TextLink: React.FunctionComponent<TextLinkProps>;

export interface TileProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
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
  style?: React.CSSProperties;
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
  onChange(): OnChangeCallback;
  disabled?: boolean;
  value: boolean;
  size?: Size.SMALL | Size.DEFAULT;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Toggle: React.FunctionComponent<ToggleProps>;

export interface TooltipProps {
  message?: React.ReactNode;
  content?: React.ReactNode;
  children: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: React.CSSProperties;
}

export const Tooltip: React.FunctionComponent<TooltipProps>;

export interface CheckboxProps {
  children?: string;
  onChange?(): OnChangeCallback;
  disabled?: boolean;
  value?: boolean;
  name?: string;
  error?: string | boolean;
  size?: Size.LARGE | Size.DEFAULT;
  style?: React.CSSProperties;
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
  onChange?(): OnChangeCallback;
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
  style?: React.CSSProperties;
}

export const DateInput: React.FunctionComponent<DateInputProps>;

export interface FormGroupProps {
  label: React.ReactNode;
  input: React.ReactNode;
  horizontal?: boolean;
  style?: React.CSSProperties;
}

export const FormGroup: React.FunctionComponent<FormGroupProps>;

export interface HintProps {
  children: string;
  category?: Category.DANGER;
  style?: React.CSSProperties;
}

export const Hint: React.FunctionComponent<HintProps>;

export const Input: React.FunctionComponent<InputProps>;

export interface InputProps {
  value: string | number;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?(): OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  type?: "text" | "password" | "email" | "tel" | "url";
  loading?: boolean;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
}

export const Input: React.FunctionComponent<InputProps>;

export interface InputGroupProps {
  children: React.ReactNode;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  style?: React.CSSProperties;
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
  onChange?(): OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
}

export const MultiSelect: React.FunctionComponent<MultiSelectProps>;

export interface NumberInputProps {
  value: any;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?(): OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  renderValue?(): void;
  max?: number;
  min?: number;
  withCounter?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
}

export const NumberInput: React.FunctionComponent<NumberInputProps>;

export interface RadioGroupProps {
  options?: any;
  name?: string;
  valueKey?: string;
  labelKey?: string;
  onChange?(): OnChangeCallback;
  disabled?: boolean;
  value?: string | number;
  error?: string | boolean;
  className?: string;
  hint?: string;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps>;

export interface SearchInputProps {
  options?: string[];
  value: string;
  name?: string;
  onChange(): OnChangeCallback;
  noResultLabel?: string;
  placeholder?: string;
  isLoading?: boolean;
  style?: React.CSSProperties;
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
  onChange?(): OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
}

export const Select: React.FunctionComponent<SelectProps>;

export const Input: React.FunctionComponent<InputProps>;

export interface TextAreaProps {
  value: string | number;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?(): OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
}

export const TextArea: React.FunctionComponent<TextAreaProps>;

export interface FlexItemProps {
  flex?: boolean | number;
  style?: React.CSSProperties;
}

export const FlexItem: React.FunctionComponent<FlexItemProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface FlexProps {
  direction?: FlexDirection.HORIZONTAL | FlexDirection.VERTICAL;
  justify?:
    | FlexJustify.START
    | FlexJustify.END
    | FlexJustify.CENTER
    | FlexJustify.SPACE_AROUND
    | FlexJustify.SPACE_BETWEEN
    | FlexJustify.SPACE_EVENLY;
  align?:
    | FlexAlign.STRETCH
    | FlexAlign.START
    | FlexAlign.END
    | FlexAlign.CENTER;
  wrap?: boolean;
  style?: object;
  className?: string;
  responsive?: Responsive;
}

export const Flex: React.FunctionComponent<FlexProps>;

export interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  style?: React.CSSProperties;
}

export const GridItem: React.FunctionComponent<GridItemProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface GridProps {
  children: React.ReactNode;
  columns: number;
  hGutters?:
    | Size.EXTRA_SMALL
    | Size.SMALL
    | Size.DEFAULT
    | Size.LARGE
    | Size.EXTRA_LARGE;
  vGutters?:
    | Size.EXTRA_SMALL
    | Size.SMALL
    | Size.DEFAULT
    | Size.LARGE
    | Size.EXTRA_LARGE;
  style?: object;
  responsive?: Responsive;
}

export const Grid: React.FunctionComponent<GridProps>;

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
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export const Layout: React.FunctionComponent<LayoutProps>;

export interface ListTileProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick: OnClickCallback;
  style?: React.CSSProperties;
}

export const ListTile: React.FunctionComponent<ListTileProps>;
