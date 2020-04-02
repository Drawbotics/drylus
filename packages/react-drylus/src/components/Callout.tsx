import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Category, Size } from '../enums';
import { Flex, FlexAlign, FlexItem, FlexJustify, Margin } from '../layout';
import { Style } from '../types';
import { getEnumAsClass, getIconForCategory } from '../utils';
import { Icon } from './Icon';

const styles = {
  root: css`
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.colorPrimary};
    padding: ${sv.paddingSmall};
  `,
  danger: css`
    background: ${sv.redLighter};

    i {
      color: ${sv.red};
    }
  `,
  info: css`
    background: ${sv.blueLighter};

    i {
      color: ${sv.blue};
    }
  `,
  success: css`
    background: ${sv.greenLighter};

    i {
      color: ${sv.green};
    }
  `,
  warning: css`
    background: ${sv.orangeLighter};

    i {
      color: ${sv.orange};
    }
  `,
  message: css`
    margin-top: 2px;
  `,
};

export interface CalloutProps {
  /** Message shown in the callout */
  children: React.ReactNode;

  category: Category.DANGER | Category.SUCCESS | Category.INFO | Category.WARNING;

  /** Used for style overrides */
  style?: Style;
}

export const Callout = ({ children, category, style }: CalloutProps) => {
  const icon = getIconForCategory(category);
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles[getEnumAsClass<typeof styles>(category)]]: category != null,
      })}>
      <Flex align={FlexAlign.START} justify={FlexJustify.START}>
        <FlexItem>
          <Margin size={{ right: Size.SMALL }}>
            <Icon name={icon} />
          </Margin>
        </FlexItem>
        <FlexItem>
          <div className={styles.message}>{children}</div>
        </FlexItem>
      </Flex>
    </div>
  );
};
