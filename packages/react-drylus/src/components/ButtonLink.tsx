import { css, cx } from 'emotion';
import React from 'react';

import { Size, Tier } from '../enums';
import { colorEnumToCategory, getEnumAsClass, run, useResponsiveProps } from '../utils';
import { ButtonProps, buttonStyles } from './Button';

const styles = {
  ...buttonStyles,
  disabled: css`
    cursor: not-allowed !important;
    opacity: 0.5;
    box-shadow: none !important;
  `,
};

export interface ButtonLinkProps extends ButtonProps {}

export const ButtonLink = ({ responsive, ...rest }: ButtonLinkProps) => {
  const {
    children,
    onClick,
    category: _category,
    size = Size.DEFAULT,
    tier = Tier.PRIMARY,
    leading,
    trailing,
    fullWidth,
    style,
    color,
    inversed,
    disabled,
    className,
  } = useResponsiveProps<ButtonLinkProps>(rest, responsive);

  if (!children && trailing && leading) {
    throw new Error('If no children are given, only pass trailing or leading, but not both');
  }
  const round = children == null && (trailing != null || leading != null);

  const category = color ? colorEnumToCategory(color) : _category;

  return (
    <span
      style={style}
      onClick={onClick}
      className={cx(
        styles.root,
        {
          [styles[getEnumAsClass<typeof styles>(size)]]: size != null,
          [styles.round]: round === true,
          [styles.roundSmall]: round === true && size === Size.SMALL,
          [styles[getEnumAsClass<typeof styles>(category)]]:
            category != null && tier === Tier.PRIMARY,
          [styles[getEnumAsClass<typeof styles>(tier)]]: tier != null,
          [styles[`${category?.toLowerCase() ?? ''}Alt` as keyof typeof styles]]:
            category != null && tier !== Tier.PRIMARY,
          [styles.fullWidth]: fullWidth === true,
          [styles.inversed]: inversed === true,
          [styles.secondaryInversed]: inversed === true && tier === Tier.SECONDARY,
          [styles.tertiaryInversed]: inversed === true && tier === Tier.TERTIARY,
          [styles.disabled]: disabled === true,
        },
        className,
      )}>
      {run(() => {
        if (leading) {
          return <div className={cx({ [styles.leading]: !round })}>{leading}</div>;
        }
      })}
      {children}
      {run(() => {
        if (trailing) {
          return <div className={cx({ [styles.trailing]: !round })}>{trailing}</div>;
        }
      })}
    </span>
  );
};
