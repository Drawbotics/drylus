import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Text } from '../components';
import { Responsive, Style } from '../types';
import { run, useResponsiveProps } from '../utils';
import { Flex, FlexItem } from './Flex';

const styles = {
  root: css`
    display: inline-block;
  `,
  clickable: css`
    &:hover {
      cursor: pointer;
    }
  `,
  leading: css`
    display: flex;
    align-items: center;
    margin-right: ${sv.marginExtraSmall};
  `,
  trailing: css`
    display: flex;
    align-items: center;
    margin-left: ${sv.marginExtraSmall};
  `,
  title: css`
    color: ${sv.colorPrimary};
  `,
  subtitle: css`
    color: ${sv.colorSecondary};
    font-size: 0.9rem;
  `,
  withMargin: css`
    margin-bottom: calc(${sv.marginExtraSmall} / 2);
  `,
};

interface ListTileProps {
  /** Main text to be displayed */
  title: React.ReactNode;

  /** Smaller text displayed below the title */
  subtitle?: React.ReactNode;

  /** Can be anything, will appear centered to the left of the title and/or subtitle */
  leading?: React.ReactNode;

  /** Can be anything, will appear centered to the right of the title and/or subtitle */
  trailing?: React.ReactNode;

  /** Triggered when the component is clicked */
  onClick?: () => void;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const ListTile = ({ responsive, ...rest }: ListTileProps) => {
  const { title, subtitle, leading, trailing, onClick, style } = useResponsiveProps<ListTileProps>(
    rest,
    responsive,
  );

  return (
    <div
      style={style}
      className={cx(styles.root, { [styles.clickable]: !!onClick })}
      onClick={onClick}>
      <Flex>
        {run(() => {
          if (leading) {
            return (
              <FlexItem>
                <div className={styles.leading}>{leading}</div>
              </FlexItem>
            );
          }
        })}
        <FlexItem flex>
          {run(() => {
            if (title != null) {
              if (typeof title === 'string' || (title as React.ReactElement).type === Text) {
                return (
                  <div className={cx(styles.title, { [styles.withMargin]: subtitle != null })}>
                    {title}
                  </div>
                );
              } else {
                return <div className={styles.withMargin}>{title}</div>;
              }
            }
          })}
          {run(() => {
            if (subtitle != null) {
              if (typeof subtitle === 'string' || (subtitle as React.ReactElement).type === Text) {
                return <div className={styles.subtitle}>{subtitle}</div>;
              } else {
                return subtitle;
              }
            }
          })}
        </FlexItem>
        {run(() => {
          if (trailing != null) {
            return (
              <FlexItem>
                <div className={styles.trailing}>{trailing}</div>
              </FlexItem>
            );
          }
        })}
      </Flex>
    </div>
  );
};
