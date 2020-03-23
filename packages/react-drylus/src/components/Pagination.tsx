import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';

import { Category, Size, Tier } from '../enums';
import { Style } from '../types';
import { run } from '../utils';
import { Button } from './Button';
import { Icon } from './Icon';

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

function _getLabels(value: number, pages: number, maxVisiblePages: number): Array<number | string> {
  const shouldEllipsise = pages > maxVisiblePages;
  if (!shouldEllipsise) {
    return Array(pages)
      .fill(0)
      .map((_, i) => i + 1);
  }
  if (value < maxVisiblePages) {
    return [
      ...Array(maxVisiblePages - 1)
        .fill(0)
        .map((_, i) => i + 1),
      '...',
      pages,
    ];
  } else if (value >= maxVisiblePages && value <= pages - (maxVisiblePages - 1)) {
    return [
      1,
      '...',
      ...Array(maxVisiblePages - 2)
        .fill(value - 2)
        .map((v, i) => v + i + 1),
      '...',
      pages,
    ];
  } else {
    return [
      1,
      '...',
      ...Array(maxVisiblePages - 1)
        .fill(pages - (maxVisiblePages - 1))
        .map((v, i) => v + i + 1),
    ];
  }
}

export interface PaginationProps {
  /** A number representing the amount of available pages */
  pages: number;

  /**
   * Text displayed beside the "previous" arrow
   * @default 'Previous'
   */
  prevLabel?: string;

  /**
   * Text displayed beside the "next" arrow
   * @default 'Next'
   */
  nextLabel?: string;

  /** Triggered when clicking a page item, or an arrow. Returns the value of the currently active page */
  onChange: (value: number) => void;

  /** Value of the currently active page i.e. page 1 = 1 */
  value: number;

  /**
   * Determines how many bullets of pagination are visible, if the total number is higher than this, ellipsis is applied. Minimum of 4
   * @default 5
   */
  maxVisiblePages?: number;

  /** Used for style overrides */
  style?: Style;
}

export const Pagination = ({
  prevLabel = 'Previous',
  nextLabel = 'Next',
  pages,
  onChange,
  value,
  maxVisiblePages = 5,
  style,
}: PaginationProps) => {
  if (maxVisiblePages < 4) {
    console.warn('`maxVisiblePages` has to be at least 4');
  }
  const labels = _getLabels(value, pages, Math.max(maxVisiblePages, 4));
  return (
    <div style={style} className={styles.root}>
      <Button
        onClick={value === 1 ? undefined : () => onChange(value - 1)}
        disabled={value === 1}
        tier={Tier.TERTIARY}
        size={Size.SMALL}
        leading={<Icon name="chevron-left" />}>
        {prevLabel}
      </Button>
      {labels.map((label, i) => (
        <div key={i} className={styles.item}>
          {run(() => {
            if (label === '...') {
              return (
                <Button tier={Tier.TERTIARY} size={Size.SMALL}>
                  {label}
                </Button>
              );
            } else {
              return (
                <Button
                  onClick={() => onChange(label as number)}
                  category={value === label ? Category.BRAND : undefined}
                  tier={value === label ? Tier.PRIMARY : Tier.TERTIARY}
                  size={Size.SMALL}>
                  {`${label}`}
                </Button>
              );
            }
          })}
        </div>
      ))}
      <Button
        onClick={value === pages ? undefined : () => onChange(value + 1)}
        disabled={value === pages}
        tier={Tier.TERTIARY}
        size={Size.SMALL}
        trailing={<Icon name="chevron-right" />}>
        {nextLabel}
      </Button>
    </div>
  );
};
