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


const Callout = ({
  children,
  category,
  style,
}) => {
  const icon = getIconForCategory(category);
  return (
    <div style={style} className={cx(styles.root, { [styles[getEnumAsClass(category)]]: category })}>
      <Flex align={FlexAlign.START} justify={FlexJustify.START}>
        <FlexItem>
          <Margin size={{ right: Sizes.SMALL }}>
            <Icon name={icon} />
          </Margin>
        </FlexItem>
        <FlexItem>
          <div className={styles.message}>
            {children}
          </div>
        </FlexItem>
      </Flex>
    </div>
  );
};


Callout.propTypes = {
  /** Message shown in the callout */
  children: PropTypes.node.isRequired,

  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]).isRequired,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default Callout;
