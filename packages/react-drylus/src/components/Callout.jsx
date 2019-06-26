import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import { Categories, Sizes } from '../base';
import Icon from './Icon';
import Flex, { FlexItem, FlexAlign, FlexJustify } from '../layout/Flex';
import Margin from '../layout/Margin';
import { getEnumAsClass } from '../utils';


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


function _getIconForCategory(category) {
  switch (category) {
    case Categories.DANGER:
      return 'alert-circle';
    case Categories.SUCCESS:
      return 'check-circle';
    case Categories.WARNING:
      return 'alert-triangle';
    default:
      return 'info';
  }
}


const Callout = ({
  children,
  category,
  title,
}) => {
  const icon = _getIconForCategory(category);
  return (
    <div className={cx(styles.root, { [styles[getEnumAsClass(category)]]: category })}>
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

  /** Larger text shown beside the icon */
  title: PropTypes.string,

  category: PropTypes.oneOf([
    Categories.DANGER,
    Categories.SUCCESS,
    Categories.INFO,
    Categories.WARNING,
  ]).isRequired,
};


export default Callout;
