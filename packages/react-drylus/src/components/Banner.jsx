import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import { Categories, Sizes } from '../base';
import Icon from './Icon';
import Flex, { FlexItem, FlexAlign, FlexJustify } from '../layout/Flex';
import Margin from '../layout/Margin';
import { getEnumAsClass, getIconForCategory } from '../utils';


const styles = {
  root: css`
    border-radius: ${sv.defaultBorderRadius};
    color: ${sv.white};
    padding: ${sv.paddingSmall};

    & * {
      color: ${sv.white} !important;
    }
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


const Banner = ({
  children,
  category,
  title,
  style,
}) => {
  const icon = getIconForCategory(category);
  return (
    <div style={style} className={cx(styles.root, { [styles[getEnumAsClass(category)]]: category })}>
      <Flex align={FlexAlign.START} justify={FlexJustify.START}>
        <FlexItem>
          <Margin
            size={{ right: Sizes.SMALL }}
            responsive={{
              S: {
                size: { right: Sizes.LARGE },
                style: { background: 'black' },
              },
              L: {
                style: { background: 'blue' },
              },
            }}>
            <Icon name={icon} />
          </Margin>
        </FlexItem>
        <FlexItem>
          {do {
            if (title) {
              <div className={styles.title}>
                {title}
              </div>
            }
          }}
          <div className={styles.message}>
            {children}
          </div>
        </FlexItem>
      </Flex>
    </div>
  );
};


Banner.propTypes = {
  /** Message shown in the banner */
  children: PropTypes.node.isRequired,

  /** Larger text shown beside the icon */
  title: PropTypes.string,

  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]).isRequired,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default Banner;
