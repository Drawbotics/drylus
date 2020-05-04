import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Size } from '../enums';
import { Flex, FlexAlign, FlexItem, FlexJustify, Margin } from '../layout';
import { Responsive, Style } from '../types';
import {
  checkComponentProps,
  getEnumAsClass,
  getIconForCategory,
  run,
  useResponsiveProps,
} from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';

const styles = {
  root: css`
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.white};
    padding: ${sv.paddingSmall};
  `,
  danger: css`
    background: ${sv.red};
  `,
  info: css`
    background: ${sv.blue};
  `,
  success: css`
    background: ${sv.green};
  `,
  warning: css`
    background: ${sv.orange};
  `,
  title: css`
    margin-bottom: ${sv.marginSmall};
    font-size: 1.2rem;
  `,
  message: css`
    margin-top: 2px;
  `,
};

export interface BannerProps {
  /** Message shown in the banner */
  children: React.ReactNode;

  /** Larger text shown beside the icon */
  title?: string;

  /** @kind Category */
  category: Category.BRAND | Category.SUCCESS | Category.INFO | Category.WARNING | Category.DANGER;

  /** Component to be displayed on the far right of the banner. Should only be of type Button */
  trailing?: React.ReactElement<typeof Button> | React.ReactNode;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const Banner = ({ responsive, ...rest }: BannerProps) => {
  const { children, category, title, style, trailing } = useResponsiveProps(rest, responsive);

  checkComponentProps({ trailing }, { trailing: Button });

  const icon = getIconForCategory(category);

  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
      })}>
      <Flex justify={FlexJustify.SPACE_BETWEEN}>
        <FlexItem>
          <Flex align={FlexAlign.START} justify={FlexJustify.START}>
            <FlexItem>
              <Margin size={{ right: Size.SMALL }}>
                <Icon name={icon} />
              </Margin>
            </FlexItem>
            <FlexItem>
              {run(() => {
                if (title != null) {
                  return <div className={styles.title}>{title}</div>;
                }
              })}
              <div className={styles.message}>{children}</div>
            </FlexItem>
          </Flex>
        </FlexItem>
        {run(() => {
          if (trailing != null) {
            return (
              <FlexItem>
                <Margin size={{ left: Size.EXTRA_SMALL }}>
                  {React.cloneElement(
                    trailing as React.ReactElement<typeof Button>,
                    {
                      size: Size.SMALL,
                      style: {
                        whiteSpace: 'nowrap',
                        color: sv.colorPrimary,
                        background: fade(sv.white, 60),
                      },
                    } as Partial<typeof Button>,
                  )}
                </Margin>
              </FlexItem>
            );
          }
        })}
      </Flex>
    </div>
  );
};
