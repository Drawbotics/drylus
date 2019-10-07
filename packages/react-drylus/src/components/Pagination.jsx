import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';

import Button from './Button';
import Icon from './Icon';
import { Sizes, Tiers, Categories } from '../base';


const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,
  item: css`
    margin: 0 calc(${sv.marginExtraSmall} / 2);

    &:first-of-type {
      margin-left: ${sv.marginExtraSmall};
    }

    &:last-of-type {
      margin-right: ${sv.marginExtraSmall};
    }
  `,
};


function _getLabels(value, pages, maxVisiblePages) {
  const shouldEllipsise = pages > maxVisiblePages;
  if (! shouldEllipsise) {
    return Array(pages).fill(0).map((_, i) => i + 1);
  }
  if (value < maxVisiblePages) {
    return [ ...Array(maxVisiblePages - 1).fill(0).map((_, i) => i + 1), '...', pages ];
  }
  else if (value >= maxVisiblePages && value <= pages - (maxVisiblePages - 1)) {
    return [ 1, '...', ...Array(maxVisiblePages - 2).fill(value - 2).map((v, i) => v + i + 1), '...', pages ];
  }
  else {
    return [ 1, '...', ...Array(maxVisiblePages - 1).fill(pages - (maxVisiblePages - 1)).map((v, i) => v + i + 1) ];
  }
}


const Pagination = ({
  prevLabel,
  nextLabel,
  pages,
  onChange,
  value,
  maxVisiblePages,
  style,
}) => {
  if (maxVisiblePages < 4) console.warn("`maxVisiblePages` has to be at least 4");
  const labels = _getLabels(value, pages, Math.max(maxVisiblePages, 4));
  return (
    <div style={style} className={styles.root}>
      <Button
        onClick={value === 1 ? null : () => onChange(value - 1)}
        disabled={value === 1}
        tier={Tiers.TERTIARY}
        size={Sizes.SMALL}
        leading={<Icon name="chevron-left" />}>
        {prevLabel}
      </Button>
      {labels.map((label, i) => (
        <div key={i} className={styles.item}>
          {do {
            if (label === '...') {
              <Button
                tier={Tiers.TERTIARY}
                size={Sizes.SMALL}>
                {label}
              </Button>
            }
            else {
              <Button
                onClick={() => onChange(label)}
                category={value === label ? Categories.BRAND : null}
                tier={value === label ? Tiers.PRIMARY : Tiers.TERTIARY}
                size={Sizes.SMALL}>
                {`${label}`}
              </Button>
            }
          }}
        </div>
      ))}
      <Button
        onClick={value === pages ? null : () => onChange(value + 1)}
        disabled={value === pages}
        tier={Tiers.TERTIARY}
        size={Sizes.SMALL}
        trailing={<Icon name="chevron-right" />}>
        {nextLabel}
      </Button>
    </div>
  );
};


Pagination.propTypes = {
  /** A number representing the amount of available pages */
  pages: PropTypes.number.isRequired,

  /** Text displayed beside the "previous" arrow */
  prevLabel: PropTypes.string,

  /** Text displayed beside the "next" arrow */
  nextLabel: PropTypes.string,

  /** Triggered when clicking a page item, or an arrow. Returns the value of the currently active page */
  onChange: PropTypes.func.isRequired,

  /** Value of the currently active page i.e. page 1 = 1 */
  value: PropTypes.number,

  /** Determines how many bullets of pagination are visible, if the total number is higher than this, ellipsis is applied. Minimum of 4 */
  maxVisiblePages: PropTypes.number,

  /** Used for style overrides */
  style: PropTypes.object,
};


Pagination.defaultProps = {
  prevLabel: 'Previous',
  nextLabel: 'Next',
  maxVisiblePages: 5,
};


export default Pagination;
