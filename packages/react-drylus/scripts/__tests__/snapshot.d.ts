import React from 'react';

type OnClickCallback = (event?: React.MouseEvent<React.MouseEvent>) => void;
type OnChangeCallback = (value: any, name?: string) => void;


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

export enum Align {
  LEFT   = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum Position {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum Color {
  BRAND = 'BRAND',
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  PRIMARY = 'PRIMARY',
}

export enum Shade {
  DARK = 'DARK',
  MEDIUM = 'MEDIUM',
  LIGHT = 'LIGHT',
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
export enum FlexDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export enum FlexJustify {
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
  SPACE_AROUND = 'SPACE_AROUND',
  SPACE_BETWEEN = 'SPACE_BETWEEN',
  SPACE_EVENLY = 'SPACE_EVENLY',
}

export enum FlexAlign {
  STRETCH = 'STRETCH',
  START = 'START',
  END = 'END',
  CENTER = 'CENTER',
}

// Utils/date
export enum ShowDateTime {
  DEFAULT = 'DEFAULT',
  ALWAYS = 'ALWAYS',
  NEVER = 'NEVER',
}


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


type IconName = 'activity' | 'airplay' | 'alert-circle' | 'alert-octagon' | 'alert-triangle' | 'align-center' | 'align-justify' | 'align-left' | 'align-right' | 'anchor' | 'aperture' | 'arrow-down-left' | 'arrow-down-right' | 'arrow-down' | 'arrow-left' | 'arrow-right' | 'arrow-up-left' | 'arrow-up-right' | 'arrow-up' | 'at-sign' | 'award' | 'bar-chart-2' | 'bar-chart' | 'battery-charging' | 'battery' | 'bell-off' | 'bell' | 'billboard' | 'bluetooth' | 'book' | 'bookmark' | 'box' | 'brand-id' | 'briefcase' | 'brochure' | 'burger' | 'calendar' | 'camera-off' | 'camera' | 'cast' | 'check-circle' | 'check-square' | 'check' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevrons-down' | 'chevrons-left' | 'chevrons-right' | 'chevrons-up' | 'chrome' | 'circle' | 'clipboard' | 'clock' | 'cloud-drizzle' | 'cloud-lightning' | 'cloud-off' | 'cloud-rain' | 'cloud-snow' | 'cloud' | 'command' | 'commercial-floorplan' | 'compass' | 'copy' | 'corner-down-left' | 'corner-down-right' | 'corner-left-down' | 'corner-left-up' | 'corner-right-down' | 'corner-right-up' | 'corner-up-left' | 'corner-up-right' | 'cpu' | 'credit-card' | 'crosshair' | 'delete' | 'disc' | 'download-cloud' | 'download' | 'drawbotics' | 'drone-shooting' | 'droplet' | 'edit-2' | 'edit-3' | 'edit' | 'exterior-3d' | 'exterior-restyling' | 'external-link' | 'eye-off' | 'eye' | 'facebook' | 'fast-forward' | 'feather' | 'file-minus' | 'file-plus' | 'file-text' | 'file' | 'film' | 'filter' | 'flag' | 'flyer' | 'folder' | 'github' | 'globe' | 'grid' | 'hash' | 'headphones' | 'heart' | 'home' | 'image' | 'inbox' | 'index.js' | 'info' | 'instagram' | 'interior-3d' | 'interior-tour-3d' | 'landing-page' | 'layers' | 'layout' | 'life-buoy' | 'link-2' | 'link' | 'loader' | 'lock' | 'log-in' | 'log-out' | 'mail' | 'map-pin' | 'map' | 'maximize-2' | 'maximize' | 'media-kit' | 'menu' | 'message-circle' | 'message-square' | 'mic-off' | 'mic' | 'minimize-2' | 'minimize' | 'minus-circle' | 'minus-square' | 'minus' | 'model-360' | 'monitor' | 'moon' | 'more-horizontal' | 'more-vertical' | 'move' | 'music' | 'navigation-2' | 'navigation' | 'newsletter' | 'octagon' | 'package' | 'panorama-360' | 'pause-circle' | 'pause' | 'percent' | 'phone-call' | 'phone-forwarded' | 'phone-incoming' | 'phone-missed' | 'phone-off' | 'phone-outgoing' | 'phone' | 'photo-editing' | 'photo-shooting' | 'pie-chart' | 'plan-2d' | 'play-circle' | 'play' | 'plus-circle' | 'plus-square' | 'plus' | 'pocket' | 'power' | 'printer' | 'radio' | 'refresh-ccw' | 'refresh-cw' | 'repeat' | 'revo-alt' | 'revo' | 'rewind' | 'rotate-ccw' | 'rotate-cw' | 'save' | 'scissors' | 'search' | 'server' | 'settings' | 'share-2' | 'share' | 'shield' | 'shoebox' | 'shuffle' | 'sidebar' | 'site-plan' | 'skip-back' | 'skip-forward' | 'slack' | 'slash' | 'smartphone' | 'social-media-kit' | 'speaker' | 'square' | 'star' | 'stop-circle' | 'sun' | 'sunrise' | 'sunset' | 'tablet' | 'tag' | 'target' | 'thermometer' | 'thumbs-down' | 'thumbs-up' | 'toggle-left' | 'toggle-right' | 'tour-3d' | 'trash-2' | 'trash' | 'trending-down' | 'trending-up' | 'triangle' | 'twitter' | 'type' | 'umbrella' | 'unlock' | 'upload-cloud' | 'upload' | 'user-check' | 'user-minus' | 'user-plus' | 'user-x' | 'user' | 'users' | 'video-animation' | 'video-off' | 'video' | 'voicemail' | 'volume-1' | 'volume-2' | 'volume-x' | 'volume' | 'vr' | 'watch' | 'website' | 'wifi' | 'wind' | 'x-circle' | 'x-square' | 'x' | 'zap' | 'zoom-in' | 'zoom-out';


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
  size?: Size | SizeDescription | SizeDescriptionAlt;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Padding: React.FunctionComponent<PaddingProps>;


export interface MarginProps {
  size?: Size | SizeDescription | SizeDescriptionAlt;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Margin: React.FunctionComponent<MarginProps>;


// components/AlertsProvider
export function showAlert(args: { text: string; id?: string; category?: Category }): void;

export function hideAlert(args: { id: string }): void;

export function useAlert(): { showAlert: typeof showAlert; hideAlert: typeof hideAlert };

// components/Text - Date/Price formatting
export function formatDate(args: { date: Date, options?: any, locale?: string }): string;

interface Price {
  value: number;
  currency: string;
}

export function formatPrice(args: { price: Price, locale?: string, options?: any }): string;

export interface ContentProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export declare const Content: React.FunctionComponent<ContentProps>;

export interface DrylusProviderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const DrylusProvider: React.FunctionComponent<DrylusProviderProps>;

export interface PageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const Page: React.FunctionComponent<PageProps>;

export interface ThemeProviderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const ThemeProvider: React.FunctionComponent<ThemeProviderProps>;

export interface AlertProps {
  text: string;
  category:
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  onClickDismiss?: OnClickCallback;
  id?: number | string;
  hideDelay?: number;
}

export declare const Alert: React.FunctionComponent<AlertProps>;

export interface AlertsProviderProps {
  children: React.ReactNode;
}

export declare const AlertsProvider: React.FunctionComponent<AlertsProviderProps>;

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
  category?: any;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  backgroundColor?: string;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Avatar: React.FunctionComponent<AvatarProps>;

export interface BadgeProps {
  value: number;
  max?: number;
  category?:
    | Category.BRAND
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING
    | Category.DANGER;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  style?: React.CSSProperties;
}

export declare const Badge: React.FunctionComponent<BadgeProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

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
  responsive?: Responsive;
}

export declare const Banner: React.FunctionComponent<BannerProps>;

export interface BigCheckboxProps {
  onChange: OnChangeCallback;
  value: boolean;
  children?: React.ReactNode;
  label: string;
  name?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare const BigCheckbox: React.FunctionComponent<BigCheckboxProps>;

export interface BigRadioProps {
  checked?: boolean;
  onChange: OnChangeCallback;
  value: string | number;
  children?: React.ReactNode;
  label: string;
  name?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare const BigRadio: React.FunctionComponent<BigRadioProps>;

export interface BreadcrumbsProps {
  crumbs: any[];
  linkComponent?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps>;

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
  onClick?: OnClickCallback;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING
    | Category.PRIMARY;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  tier?: Tier.PRIMARY | Tier.SECONDARY | Tier.TERTIARY;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Button: React.FunctionComponent<ButtonProps>;

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
  onClick?: OnClickCallback;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  tier?: Tier.PRIMARY | Tier.SECONDARY | Tier.TERTIARY;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const ButtonLink: React.FunctionComponent<ButtonLinkProps>;

export interface CalloutProps {
  children: React.ReactNode;
  category:
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  style?: React.CSSProperties;
}

export declare const Callout: React.FunctionComponent<CalloutProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface CircularProgressProps {
  percentage?: number;
  text?: string;
  category?: any;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE | Size.EXTRA_LARGE;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const CircularProgress: React.FunctionComponent<CircularProgressProps>;

export interface CollapsibleProps {
  title: React.ReactNode | string;
  isOpen?: boolean;
  children: React.ReactNode;
  onClick?: OnClickCallback;
  style?: React.CSSProperties;
}

export declare const Collapsible: React.FunctionComponent<CollapsibleProps>;

export interface DotProps {
  category?: any;
  color?:
    | Color.BRAND
    | Color.RED
    | Color.BLUE
    | Color.GREEN
    | Color.ORANGE
    | Color.PRIMARY;
  style?: React.CSSProperties;
}

export declare const Dot: React.FunctionComponent<DotProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

declare interface CssTransitionCallbacks {
  onEnter?: any;
  onEntering?: any;
  onEntered?: any;
  onExit?: any;
  onExiting?: any;
  onExited?: any;
}

export interface DrawerProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  visible: boolean;
  onClickClose?: OnClickCallback;
  onClickOverlay?: OnClickCallback;
  asOverlay?: boolean;
  width?: number | string;
  raw?: boolean;
  title?: string;
  style?: React.CSSProperties;
  responsive?: Responsive;
  side?: Position.LEFT | Position.RIGHT;
  cssTransitionCallbacks?: CssTransitionCallbacks;
}

export declare const Drawer: React.FunctionComponent<DrawerProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface DropdownOptionProps {
  text: string;
  disabled?: boolean;
  onClick?: OnClickCallback;
  icon?: IconName;
  category?: Category.DANGER | Category.SUCCESS | Category.WARNING;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const DropdownOption: React.FunctionComponent<DropdownOptionProps>;

export interface DropdownTitleProps {
  text: string;
  style?: object;
}

export declare const DropdownTitle: React.FunctionComponent<DropdownTitleProps>;

export declare const DropdownSeparator: React.FunctionComponent;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface DropdownProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: object;
  responsive?: Responsive;
}

export declare const Dropdown: React.FunctionComponent<DropdownProps>;

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

export declare const EmptyState: React.FunctionComponent<EmptyStateProps>;

export interface FilterGroupProps {
  label: string;
  icon: IconName;
  filters?: React.ReactNode;
  children: React.ReactNode;
  renderButton?(...args: Array<any>): void;
  clearAllLabel?: string;
  onClear(...args: Array<any>): void;
  active?: boolean;
}

export declare const FilterGroup: React.FunctionComponent<FilterGroupProps>;

export interface LabelProps {
  children?: string | React.ReactNode;
  ellipsized?: boolean;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
}

export declare const Label: React.FunctionComponent<LabelProps>;

export interface ListItemProps {
  children: React.ReactNode;
  category?: any;
  color?:
    | Color.BRAND
    | Color.RED
    | Color.BLUE
    | Color.GREEN
    | Color.ORANGE
    | Color.PRIMARY;
  icon?: IconName;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare const ListItem: React.FunctionComponent<ListItemProps>;

export interface ListProps {
  children: React.ReactNode;
  ordered?: boolean;
  style?: object;
}

export declare const List: React.FunctionComponent<ListProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface LoadingPlaceholderProps {
  height?: number | string;
  width?: number | string;
  responsive?: Responsive;
}

export declare const LoadingPlaceholder: React.FunctionComponent<LoadingPlaceholderProps>;

export interface MapProps {
  height?: number;
  interactive?: boolean;
  zoom?: number;
  accessToken: string;
  markers: any[];
  style?: React.CSSProperties;
}

export declare const Map: React.FunctionComponent<MapProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

declare interface CssTransitionCallbacks {
  onEnter?: any;
  onEntering?: any;
  onEntered?: any;
  onExit?: any;
  onExiting?: any;
  onExited?: any;
}

export interface ModalProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  visible: boolean;
  onClickClose?: OnClickCallback;
  size?: Size.DEFAULT | Size.LARGE;
  raw?: boolean;
  title?: string;
  style?: React.CSSProperties;
  responsive?: Responsive;
  cssTransitionCallbacks?: CssTransitionCallbacks;
}

export declare const Modal: React.FunctionComponent<ModalProps>;

export interface PaginationProps {
  pages: number;
  prevLabel?: string;
  nextLabel?: string;
  onChange: OnChangeCallback;
  value?: number;
  maxVisiblePages?: number;
  style?: React.CSSProperties;
}

export declare const Pagination: React.FunctionComponent<PaginationProps>;

export interface PanelHeaderProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export declare const PanelHeader: React.FunctionComponent<PanelHeaderProps>;

export interface PanelBodyProps {
  children: React.ReactNode;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export declare const PanelBody: React.FunctionComponent<PanelBodyProps>;

export interface PanelSectionProps {
  children: React.ReactNode;
  title?: string;
  style?: object;
}

export declare const PanelSection: React.FunctionComponent<PanelSectionProps>;

export interface PanelFooterProps {
  children: React.ReactNode;
  noPadding?: boolean;
  style?: object;
}

export declare const PanelFooter: React.FunctionComponent<PanelFooterProps>;

export interface PanelProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  style?: object;
}

export declare const Panel: React.FunctionComponent<PanelProps>;

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

export declare const Paragraph: React.FunctionComponent<ParagraphProps>;

export interface PopoverProps {
  message?: React.ReactNode;
  content?: React.ReactNode;
  children: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: React.CSSProperties;
  exitOnClick?: boolean;
}

export declare const Popover: React.FunctionComponent<PopoverProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ProgressBarProps {
  percentage?: number;
  category?: any;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const ProgressBar: React.FunctionComponent<ProgressBarProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface RoundIconProps {
  name: string;
  size?: any;
  bold?: boolean;
  category?: any;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const RoundIcon: React.FunctionComponent<RoundIconProps>;

export interface SegmentedControlProps {
  options?: any;
  valueKey?: string;
  labelKey?: string;
  value?: string | number;
  onChange?: OnChangeCallback;
  style?: React.CSSProperties;
}

export declare const SegmentedControl: React.FunctionComponent<SegmentedControlProps>;

export interface SeparatorProps {
  vertical?: boolean;
  style?: React.CSSProperties;
}

export declare const Separator: React.FunctionComponent<SeparatorProps>;

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
  category?: any;
  color?: Color.BRAND | Color.BLUE;
  inversed?: boolean;
  fullSize?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Spinner: React.FunctionComponent<SpinnerProps>;

export interface SplashScreenProps {
  visible?: any;
  text?: string;
}

export declare const SplashScreen: React.FunctionComponent<SplashScreenProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface SteppedProgressBarProps {
  steps: number;
  activeStep: number;
  percentage?: number;
  category?: any;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const SteppedProgressBar: React.FunctionComponent<SteppedProgressBarProps>;

export interface TabNavigationProps {
  options?: any;
  valueKey?: string;
  labelKey?: string;
  value?: string | number;
  onChange?: OnChangeCallback;
  vertical?: boolean;
  linkComponent?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const TabNavigation: React.FunctionComponent<TabNavigationProps>;

export declare const TCell: React.FunctionComponent;

export interface TRowProps {
  children: React.ReactNode;
  highlighted?: boolean;
  onClick?: OnClickCallback;
  clickable?: boolean;
  style?: React.CSSProperties;
}

export declare const TRow: React.FunctionComponent<TRowProps>;

export declare const THead: React.FunctionComponent;

export declare const TBody: React.FunctionComponent;

declare interface ActiveHeader {
  key?: string;
  direction?: any;
}

export interface TableProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  withNesting?: boolean;
  data?: any[];
  renderCell?(...args: Array<any>): void;
  renderChildCell?(...args: Array<any>): void;
  header?: any;
  childHeader?: string[];
  sortableBy?: string[];
  activeHeader?: ActiveHeader;
  onClickHeader?(...args: Array<any>): void;
  highlighted?: boolean;
  clickable?: boolean;
  isLoading?: boolean;
  onClickRow?: OnClickCallback;
  activeRow?: any;
  emptyContent?: React.ReactNode;
  style?: object;
}

export declare const Table: React.FunctionComponent<TableProps>;

export interface TagProps {
  children: string;
  category?: any;
  color?: Color.BRAND | Color.RED | Color.BLUE | Color.GREEN | Color.ORANGE;
  onClickRemove?: OnClickCallback;
  inversed?: boolean;
  style?: React.CSSProperties;
}

export declare const Tag: React.FunctionComponent<TagProps>;

declare interface Children {
  currency?: string;
  value: number;
}

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

declare interface DateOptions {
  showTime?: any;
  asArchive?: boolean;
  format?: any;
}

export interface TextProps {
  inversed?: boolean;
  bold?: boolean;
  light?: boolean;
  size?: Size.SMALL | Size.DEFAULT | Size.LARGE;
  tier?: Tier.PRIMARY | Tier.SECONDARY | Tier.TERTIARY;
  shade?: Shade.DARK | Shade.MEDIUM | Shade.LIGHT;
  disabled?: boolean;
  children: any;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  style?: React.CSSProperties;
  responsive?: Responsive;
  dateOptions?: DateOptions;
  priceOptions?: any;
  locale?: string;
}

export declare const Text: React.FunctionComponent<TextProps>;

export interface TextLinkProps {
  children?: string;
  category?:
    | Category.BRAND
    | Category.DANGER
    | Category.SUCCESS
    | Category.INFO
    | Category.WARNING;
  shade?: Shade.DARK | Shade.MEDIUM | Shade.LIGHT;
  underlined?: LinkUnderlined.ALWAYS | LinkUnderlined.HOVER;
  style?: React.CSSProperties;
}

export declare const TextLink: React.FunctionComponent<TextLinkProps>;

export interface TileProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  noPadding?: boolean;
}

export declare const Tile: React.FunctionComponent<TileProps>;

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

export declare const Title: React.FunctionComponent<TitleProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ToggleProps {
  onChange: OnChangeCallback;
  disabled?: boolean;
  value: boolean;
  size?: Size.SMALL | Size.DEFAULT;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Toggle: React.FunctionComponent<ToggleProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface TooltipProps {
  message?: React.ReactNode;
  content?: React.ReactNode;
  children: React.ReactNode;
  side?: Position.LEFT | Position.RIGHT | Position.TOP | Position.BOTTOM;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Tooltip: React.FunctionComponent<TooltipProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface CheckboxProps {
  children?: string;
  onChange?: OnChangeCallback;
  disabled?: boolean;
  value?: boolean;
  name?: string;
  error?: string | boolean;
  size?: Size.LARGE | Size.DEFAULT;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
  responsive?: Responsive;
}

export declare const Checkbox: React.FunctionComponent<CheckboxProps>;

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

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface DateInputProps {
  value: any;
  onChange?: OnChangeCallback;
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
  align?: Align.LEFT | Align.RIGHT;
  responsive?: Responsive;
}

export declare const DateInput: React.FunctionComponent<DateInputProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface FormGroupProps {
  label: React.ReactNode;
  input: React.ReactNode;
  horizontal?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const FormGroup: React.FunctionComponent<FormGroupProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface HintProps {
  children: string;
  category?: Category.DANGER;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Hint: React.FunctionComponent<HintProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface InputProps {
  value: string | number;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: OnChangeCallback;
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
  responsive?: Responsive;
}

export declare const Input: React.FunctionComponent<InputProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface InputGroupProps {
  children: React.ReactNode;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const InputGroup: React.FunctionComponent<InputGroupProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface MultiSelectProps {
  options?: any;
  values: any[];
  name?: string;
  disabled?: boolean;
  valueKey?: string;
  labelKey?: string;
  placeholder?: string;
  onChange?: OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const MultiSelect: React.FunctionComponent<MultiSelectProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface NumberInputProps {
  value: any;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  renderValue?(v: React.ReactText): string;
  max?: number;
  min?: number;
  withCounter?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  step?: number;
  responsive?: Responsive;
}

export declare const NumberInput: React.FunctionComponent<NumberInputProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface RadioGroupProps {
  options?: any;
  name?: string;
  valueKey?: string;
  labelKey?: string;
  onChange?: OnChangeCallback;
  disabled?: boolean;
  value?: string | number;
  error?: string | boolean;
  className?: string;
  hint?: string;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
  responsive?: Responsive;
}

export declare const RadioGroup: React.FunctionComponent<RadioGroupProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface RangeInputProps {
  min: number;
  max: number;
  value: any;
  step?: number;
  onChange: OnChangeCallback;
  onUpdate?(...args: Array<any>): void;
  disabled?: boolean;
  renderValue?(v: React.ReactText): string;
  responsive?: Responsive;
}

export declare const RangeInput: React.FunctionComponent<RangeInputProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface SearchInputProps {
  options?: string[];
  value: string;
  name?: string;
  onChange: OnChangeCallback;
  noResultLabel?: string;
  placeholder?: string;
  isLoading?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const SearchInput: React.FunctionComponent<SearchInputProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface SelectProps {
  options?: any;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  valueKey?: string;
  labelKey?: string;
  placeholder?: string;
  onChange?: OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const Select: React.FunctionComponent<SelectProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface TextAreaProps {
  value: string | number;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: OnChangeCallback;
  hint?: string;
  error?: string | boolean;
  valid?: boolean;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  isPlaceholder?: boolean;
  responsive?: Responsive;
}

export declare const TextArea: React.FunctionComponent<TextAreaProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface FlexItemProps {
  flex?: boolean | number;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const FlexItem: React.FunctionComponent<FlexItemProps>;

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

export declare const Flex: React.FunctionComponent<FlexProps>;

export interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  style?: React.CSSProperties;
}

export declare const GridItem: React.FunctionComponent<GridItemProps>;

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

export declare const Grid: React.FunctionComponent<GridProps>;

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

export declare const Layout: React.FunctionComponent<LayoutProps>;

declare interface Responsive {
  XS?: object;
  S?: object;
  M?: object;
  L?: object;
  XL?: object;
  HUGE?: object;
}

export interface ListTileProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: OnClickCallback;
  style?: React.CSSProperties;
  responsive?: Responsive;
}

export declare const ListTile: React.FunctionComponent<ListTileProps>;
