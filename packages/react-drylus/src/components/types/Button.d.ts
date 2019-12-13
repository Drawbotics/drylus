declare module '@drawbotics/react-drylus' {

  declare interface Responsive {
    XS?: object;
    S?: object;
    M?: object;
    L?: object;
    XL?: object;
    HUGE?: object;
  }

  interface ButtonProps {
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

  // export default class Button<T = any> extends React.Component<T> {}
  export const Button: FunctionComponent<ButtonProps>;

}