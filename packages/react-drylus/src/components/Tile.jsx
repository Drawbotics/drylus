import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  root: css`
    background: ${sv.white};
    box-shadow: ${sv.elevation1};
    padding: ${sv.defaultPadding};

    @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
    }
  `,
  title: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginExtraSmall};
    }
  `,
  noPadding: css`
    padding: 0px !important;
  `,
};

const Tile = ({ style, title, children, noPadding }) => {
  return (
    <div
      style={style}
      className={cx(styles.root, {
        [styles.noPadding]: noPadding,
      })}>
      {do {
        if (title != null) {
          <div className={styles.title}>{title}</div>;
        }
      }}
      {children}
    </div>
  );
};

Tile.propTypes = {
  /** Displayed at the top of the tile, looks like a label */
  title: PropTypes.string,

  /** Content displayed within the tile */
  children: PropTypes.node.isRequired,

  /** Used for style overrides */
  style: PropTypes.object,

  /** Removes the space between the content and the borders (good for full size images in the tile) */
  noPadding: PropTypes.bool,
};

export default Tile;
