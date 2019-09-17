import React, { Fragment, useState } from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { useIsDevice } from '@drawbotics/use-is-device';
import sv from '@drawbotics/drylus-style-vars';

import Button from './Button';
import Icon from './Icon';
import Drawer from './Drawer';
import Margin from '../layout/Margin';
import { Tiers, Sizes, Categories } from '../base';
import Flex, { FlexItem, FlexJustify } from '../layout/Flex';


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
  filters,
  renderButton,
  clearAllLabel,
  active,
}) => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const { isPhone } = useIsDevice();

  if (! isPhone) {
    return (
      <Flex justify={FlexJustify.START}>
        {filters.map((filter, i) => (
          <FlexItem key={i}>
            {i === 0
              ? filter
              : <Margin size={{ left: Sizes.SMALL }}>
                  {filter}
                </Margin>
            }
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
            fullWidth
            category={Categories.INFO}
            size={Sizes.LARGE}
            tier={Tiers.SECONDARY}>
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
              category={Categories.BRAND}>
              OK
            </Button>
          </div>
          {filters.map((filter, i) => (
            <Margin key={i} size={{ top: Sizes.DEFAULT }}>
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

  /** Will be rendered within the content of the drawer */
  filters: PropTypes.node.isRequired,

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