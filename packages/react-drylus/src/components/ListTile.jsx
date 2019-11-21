import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Flex, { FlexItem } from '../layout/Flex';
import Text from './Text';


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
  style,
}) => {
  if (Boolean(title) && typeof title !== 'string' && title.type !== Text) {
    console.warn('`title` should only be a string or a Text component');
  }
  if (Boolean(subtitle) && typeof subtitle !== 'string' && subtitle.type !== Text) {
    console.warn('`subtitle` should only be a string or a Text component');
  }
  return (
    <div
      style={style}
      className={cx(styles.root, { [styles.clickable]: !! onClick })}
      onClick={onClick}>
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
              if (typeof title === 'string' || title.type === Text) {
                <div className={cx(styles.title, { [styles.withMargin]: subtitle })}>
                  {title}
                </div>
              }
              else {
                <div className={styles.withMargin}>
                  {title}
                </div>
              }
            }
          }}
          {do {
            if (subtitle != null) {
              if (typeof subtitle === 'string' || subtitle.type === Text) {
                <div className={styles.subtitle}>
                  {subtitle}
                </div>
              }
              else {
                subtitle
              }
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
  title: PropTypes.node.isRequired,

  /** Smaller text displayed below the title */
  subtitle: PropTypes.node,

  /** Can be anything, will appear centered to the left of the title and/or subtitle */
  leading: PropTypes.node,

  /** Can be anything, will appear centered to the right of the title and/or subtitle */
  trailing: PropTypes.node,

  /** Triggered when the component is clicked */
  onClick: PropTypes.func,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default ListTile;
