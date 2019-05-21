import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';

import Button, { ButtonTiers } from './Button';
import Sizes from '../base/Sizes';
import Categories from '../base/Categories';


const styles = {
  base: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,
  item: css`
    margin: 0 5px;

    &:first-of-type {
      margin-left: 10px;
    }

    &:last-of-type {
      margin-right: 10px;
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
}) => {
  if (maxVisiblePages < 4) console.warn("`maxVisiblePages` has to be at least 4");
  const labels = _getLabels(value, pages, Math.max(maxVisiblePages, 4));
  return (
    <div className={styles.base}>
      <Button
        onClick={value === 1 ? null : () => onChange(value - 1)}
        disabled={value === 1}
        tier={ButtonTiers.TERTIARY}
        size={Sizes.SMALL}
        icon="chevron-left">
        {prevLabel}
      </Button>
      {labels.map((label, i) => (
        <div key={i} className={styles.item}>
          {do {
            if (label === '...') {
              <Button
                tier={ButtonTiers.TERTIARY}
                size={Sizes.SMALL}>
                {label}
              </Button>
            }
            else {
              <Button
                onClick={() => onChange(label)}
                category={Categories.BRAND}
                tier={value === label ? ButtonTiers.PRIMARY : ButtonTiers.TERTIARY}
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
        tier={ButtonTiers.TERTIARY}
        size={Sizes.SMALL}
        icon="chevron-right"
        iconSide="right">
        {nextLabel}
      </Button>
    </div>
  );
};


Pagination.propTypes = {
  /** An array representing the available pages */
  pages: PropTypes.number.isRequired,

  /** Text displayed beside the "previous" arrow */
  prevLabel: PropTypes.string,

  /** Text displayed beside the "next" arrow */
  nextLabel: PropTypes.string,

  /** Triggered when clicking a page item, or an arrow. Returns the index of the currently active page */
  onChange: PropTypes.func,

  /** Index of the currently active page */
  value: PropTypes.number,

  /** Determines how many bullets of pagination are visible, if the total number is higher than this, ellipsis is applied. Minimum of 4 */
  maxVisiblePages: PropTypes.number,
};


Pagination.defaultProps = {
  prevLabel: 'Previous',
  nextLabel: 'Next',
  maxVisiblePages: 5,
};


export default Pagination;
