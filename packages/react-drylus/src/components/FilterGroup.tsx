import sv from '@drawbotics/drylus-style-vars';
import { useScreenSize } from '@drawbotics/use-screen-size';
import { css } from 'emotion';
import React, { Fragment, useState } from 'react';

import { Category, Size, Tier } from '../enums';
import { Flex, FlexItem, FlexJustify, Margin } from '../layout';
import { Deprecated, run } from '../utils';
import { Button } from './Button';
import { Drawer } from './Drawer';
import { Icon, IconType } from './Icon';

const styles = {
  okButton: css`
    position: absolute;
    top: ${sv.marginExtraLarge};
    right: ${sv.marginSmall};
  `,
};

export interface FilterGroupProps {
  /** Title which appears on top of the modal */
  label: string;

  /** Icon rendered on the button that replaces the filters */
  icon: IconType;

  /** @deprecated Use children instead */
  filters?: Array<React.ReactNode>;

  /** Will be rendered within the content of the drawer, must be a filter */
  children?: React.ReactNode;

  /** Returns the button rendered by the group. With this you can wrap it in a component to arrange the spacing */
  renderButton?: (button: React.ReactElement<typeof Button>) => React.ReactElement<typeof Button>;

  /**
   * Text rendered on the button to clear all filters
   * @default 'Clear all'
   */
  clearAllLabel?: string;

  /** Function triggered when the "clear all" button is pressed on the modal. It's up to you to perform the clearing yourself */
  onClear: () => void;

  /** If true, the button will show that at least one filter is active. It is up to you to handle this behaviour */
  active?: boolean;
}

export const FilterGroup = ({
  label,
  icon,
  filters: _filters = [],
  renderButton = (x) => x,
  clearAllLabel = 'Clear all',
  active,
  onClear,
  children,
}: FilterGroupProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { screenSize, ScreenSizes } = useScreenSize();

  const filters =
    children != null
      ? (React.Children.map(children, (x) => x) as Array<React.ReactNode>)
      : _filters;

  if (screenSize > ScreenSizes.L) {
    if (filters == null) {
      console.warn('No children provided');
      return null;
    }
    return (
      <Flex justify={FlexJustify.START}>
        {filters.map((filter: React.ReactNode, i) => (
          <FlexItem key={i}>
            {run(() => {
              if (i === 0) {
                return filter;
              } else {
                return <Margin size={{ left: Size.EXTRA_SMALL }}>{filter}</Margin>;
              }
            })}
          </FlexItem>
        ))}
      </Flex>
    );
  }

  return (
    <Fragment>
      {renderButton(
        <Button
          style={active ? { background: sv.neutralDarker, color: sv.white } : undefined}
          onClick={() => setDrawerOpen(true)}
          leading={<Icon name={icon} />}
        />,
      )}
      <Drawer
        footer={
          <Button
            onClick={onClear}
            fullWidth
            category={Category.INFO}
            size={Size.LARGE}
            tier={Tier.SECONDARY}>
            {clearAllLabel}
          </Button>
        }
        asOverlay
        visible={drawerOpen}
        title={label}
        onClickClose={() => setDrawerOpen(false)}>
        <div className={styles.okButton}>
          <Button onClick={() => setDrawerOpen(false)} category={Category.BRAND}>
            OK
          </Button>
        </div>
        {filters.map((filter, i) => (
          <Margin key={i} size={{ top: Size.DEFAULT }}>
            {filter}
          </Margin>
        ))}
      </Drawer>
    </Fragment>
  );
};

FilterGroup.propTypes = {
  filters: Deprecated,
};
