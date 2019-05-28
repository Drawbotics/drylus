import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    background: ${sv.white};
    box-shadow: ${sv.elevation3};
    overflow: auto;
    border-radius: ${sv.borderRadiusSmall};
  `,
  header: css`
    padding: ${sv.defaultPadding};
    padding-bottom: 0;
    margin-bottom: ${sv.defaultMargin};
  `,
  body: css`
    padding: ${sv.defaultPadding};
    padding-top: 0;
    padding-bottom: 0;
    margin-top: ${sv.defaultMargin};
    margin-bottom: ${sv.defaultMargin};
  `,
  footer: css`
    padding: ${sv.defaultPadding};
    padding-top: 0;
    margin-top: ${sv.defaultMargin};
  `,
  noSpacing: css`
    padding: 0;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  `,
  section: css`
    margin-bottom: ${sv.marginLarge};

    &:last-of-type {
      margin-bottom: 0;
    }
  `,
  sectionTitle: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: ${sv.marginSmall};
  `,
};


export const PanelHeader = ({ children, noPadding }) => {
  return (
    <div className={cx(styles.header, {
      [styles.noSpacing]: noPadding,
    })}>
      {children}
    </div>
  );
};


export const PanelBody = ({ children, noPadding }) => {
  return (
    <div className={cx(styles.body, {
      [styles.noSpacing]: noPadding,
    })}>
      {children}
    </div>
  );
};


export const PanelSection = ({ children, title }) => {
  return (
    <div className={styles.section}>
      {do{
        if (title) {
          <div className={styles.sectionTitle}>
            {title}
          </div>
        }
      }}
      {children}
    </div>
  );
};


export const PanelFooter = ({ children, noPadding }) => {
  return (
    <div className={cx(styles.footer, {
      [styles.noSpacing]: noPadding,
    })}>
      {children}
    </div>
  );
};


const Panel = ({ header, body, footer }) => {
  return (
    <div className={styles.root}>
      {header}
      {body}
      {footer}
    </div>
  );
};


Panel.propTypes = {
  /** Component: PanelHeader, will render as the header of the panel */
  header: PropTypes.node,

  /** Component: PanelBody, will render as the body of the panel. Takes PanelSection as children */
  body: PropTypes.node,

  /** Component: PanelFooter, will render as the footer of the panel */
  footer: PropTypes.node,
};


export default Panel;
