import React, { Fragment, useState } from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { useScreenSize } from '@drawbotics/use-screen-size';
import sv from '@drawbotics/drylus-style-vars';

import Button from './Button';
import Icon from './Icon';
import Drawer from './Drawer';
import Margin from '../layout/Margin';
import { Tier, Size, Category } from '../enums';
import Flex, { FlexItem, FlexJustify } from '../layout/Flex';
import { CustomPropTypes } from '../utils';


const styles = {
  okButton: css`
    position: absolute;
    top: ${sv.marginExtraLarge};
    right: ${sv.marginSmall};
  `,
};


const FilterGroup = ({
  label,
  icon,
  filters: _filters,
  renderButton,
  clearAllLabel,
  active,
  onClear,
  children,
}) => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const { screenSize, ScreenSizes } = useScreenSize();

  const filters = children != null ? React.Children.map(children, x => x) : _filters;

  if (screenSize > ScreenSizes.L) {
    return (
      <Flex justify={FlexJustify.START}>
        {filters.map((filter, i) => (
          <FlexItem key={i}>
            {do {
              if (i === 0) {
                filter
              }
              else {
                <Margin size={{ left: Size.EXTRA_SMALL }}>
                  {filter}
                </Margin>
              }
            }}
          </FlexItem>
        ))}
      </Flex>
    );
  }

  return (
    <Fragment>
      {renderButton(
        <Button
          style={active ? { background: sv.neutralDarker, color: sv.white } : null}
          onClick={() => setDrawerOpen(true)}
          leading={<Icon name={icon} />} />
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
            <Button
              onClick={() => setDrawerOpen(false)}
              category={Category.BRAND}>
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
  /** Title which appears on top of the modal */
  label: PropTypes.string.isRequired,

  /** Icon rendered on the button that replaces the filters */
  icon: PropTypes.string.isRequired,

  /** DEPRECATED */
  filters: CustomPropTypes.mutuallyExclusive('children', {
    type: PropTypes.node,
    deprecated: true,
  }),

  /** Will be rendered within the content of the drawer, must be a filter */
  children: CustomPropTypes.mutuallyExclusive('filters', {
    type: PropTypes.node.isRequired,
  }),

  /** Returns the button rendered by the group. With this you can wrap it in a component to arrange the spacing */
  renderButton: PropTypes.func,

  /** Text rendered on the button to clear all filters */
  clearAllLabel: PropTypes.string.isRequired,

  /** Function triggered when the "clear all" button is pressed on the modal. It's up to you to perform the clearing yourself */
  onClear: PropTypes.func.isRequired,

  /** If true, the button will show that at least one filter is active. It is up to you to handle this behaviour */
  active: PropTypes.bool,
};


FilterGroup.defaultProps = {
  renderButton: x => x,
  clearAllLabel: 'Clear all',
};


export default FilterGroup;