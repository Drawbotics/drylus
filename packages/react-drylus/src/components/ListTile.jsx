import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';

import Flex, { FlexItem } from '../layout/Flex';


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


const ListTile = ({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
}) => {
  return (
    <div className={cx(styles.root, { [styles.clickable]: !! onClick })} onClick={onClick}>
      <Flex>
        {do {
          if (leading) {
            <FlexItem>
              <div className={styles.leading}>
                {leading}
              </div>
            </FlexItem>
          }
        }}
        <FlexItem flex>
          {do {
            if (title != null) {
              <div className={cx(styles.title, { [styles.withMargin]: subtitle })}>
                {title}
              </div>
            }
          }}
          {do {
            if (subtitle != null) {
              <div className={styles.subtitle}>
                {subtitle}
              </div>
            }
          }}
        </FlexItem>
        {do {
          if (trailing != null) {
            <FlexItem>
              <div className={styles.trailing}>
                {trailing}
              </div>
            </FlexItem>
          }
        }}
      </Flex>
    </div>
  );
};


ListTile.propTypes = {
  /** Main text to be displayed */
  title: PropTypes.string,

  /** Smaller text displayed below the title */
  subtitle: PropTypes.string,

  /** Can be anything, will appear centered to the left of the title and/or subtitle */
  leading: PropTypes.node,

  /** Can be anything, will appear centered to the right of the title and/or subtitle */
  trailing: PropTypes.node,

  /** Triggered when the component is clicked */
  onClick: PropTypes.func,
};


export default ListTile;
