import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';


const styles = {
  root: css`
    background: ${sv.white};
    box-shadow: ${sv.elevation3};
    border-radius: ${sv.borderRadiusSmall};
    overflow: auto;
  `,
  header: css`
    padding: ${sv.defaultPadding};
    padding-bottom: 0;
    margin-bottom: ${sv.defaultMargin};
  `,
  body: css`
    padding: 0 ${sv.defaultPadding};
    margin: ${sv.defaultMargin} 0;
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

PanelHeader.propTypes = {
  /** Content of the header */
  children: PropTypes.node.isRequired,

  /** If true there is no space between the content and the border of the panel */
  noPadding: PropTypes.bool,
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

PanelBody.propTypes = {
  /** Content of the body */
  children: PropTypes.node.isRequired,

  /** If true there is no space between the content and the border of the panel */
  noPadding: PropTypes.bool,
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

PanelSection.propTypes = {
  /** Content of the section */
  children: PropTypes.node.isRequired,

  /** Displays a title on the top left of the section */
  title: PropTypes.bool,
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

PanelFooter.propTypes = {
  /** Content of the footer */
  children: PropTypes.node.isRequired,

  /** If true there is no space between the content and the border of the panel */
  noPadding: PropTypes.bool,
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
