import sv, { fade } from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Category, Size } from '../enums';
import Flex, { FlexAlign, FlexItem, FlexJustify } from '../layout/Flex';
import Margin from '../layout/Margin';
import { getEnumAsClass, getIconForCategory } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import Button from './Button';
import Icon from './Icon';

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

const Banner = ({ responsive, ...rest }) => {
  const { children, category, title, style, trailing } = useResponsiveProps(rest, responsive);

  if (trailing != null && trailing?.type !== Button) {
    console.warn('`trailing` type should only be Button');
  }
  const icon = getIconForCategory(category);

  return (
    <div
      style={style}
      className={cx(styles.root, { [styles[getEnumAsClass(category)]]: category })}>
      <Flex justify={FlexJustify.SPACE_BETWEEN}>
        <FlexItem>
          <Flex align={FlexAlign.START} justify={FlexJustify.START}>
            <FlexItem>
              <Margin size={{ right: Size.SMALL }}>
                <Icon name={icon} />
              </Margin>
            </FlexItem>
            <FlexItem>
              {do {
                if (title != null) {
                  <div className={styles.title}>{title}</div>;
                }
              }}
              <div className={styles.message}>{children}</div>
            </FlexItem>
          </Flex>
        </FlexItem>
        {do {
          if (trailing != null) {
            <FlexItem>
              <Margin size={{ left: Size.EXTRA_SMALL }}>
                {React.cloneElement(trailing, {
                  size: Size.SMALL,
                  style: {
                    whiteSpace: 'nowrap',
                    color: sv.colorPrimary,
                    background: fade(sv.white, 60),
                  },
                })}
              </Margin>
            </FlexItem>;
          }
        }}
      </Flex>
    </div>
  );
};

Banner.propTypes = {
  /** Message shown in the banner */
  children: PropTypes.node.isRequired,

  /** Larger text shown beside the icon */
  title: PropTypes.string,

  category: PropTypes.oneOf([Category.DANGER, Category.SUCCESS, Category.INFO, Category.WARNING])
    .isRequired,

  /** Used for style overrides */
  style: PropTypes.object,

  /** Component to be displayed on the far right of the banner. Should only be of type Button */
  trailing: PropTypes.node,

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};

export default Banner;
