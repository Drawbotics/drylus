import React, { Fragment, useState } from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { useIsDevice } from '@drawbotics/use-is-device';
import sv from '@drawbotics/drylus-style-vars';

import Button from './Button';
import Icon from './Icon';
import Drawer from './Drawer';
import { Tiers, Sizes, Categories } from '../base';


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
  children,
  renderButton,
  clearAllLabel,
}) => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const { isPhonePortrait } = useIsDevice();

  if (! isPhonePortrait) {
    return children;
  }

  return (
    <Fragment>
      {renderButton(
        <Button
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
              category={Categories.BRAND}>
              OK
            </Button>
          </div>
          {children}
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
  children: PropTypes.node.isRequired,

  /** Returns the button rendered by the group. With this you can wrap it in a component to arrange the spacing */
  renderButton: PropTypes.func,

  /** Text rendered on the button to clear all filters */
  clearAllLabel: PropTypes.string.isRequired,
};


FilterGroup.defaultProps = {
  renderButton: x => x,
  clearAllLabel: 'Clear all',
};


export default FilterGroup;