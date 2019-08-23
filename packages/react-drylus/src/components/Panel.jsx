import React from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';


const styles = {
  root: css`
    background: ${sv.white};
    box-shadow: ${sv.elevation3};
    border-radius: ${sv.borderRadiusSmall};
    padding: ${sv.defaultPadding};
  `,
  doubleTopPadding: css`
    padding-top: calc(${sv.defaultPadding} * 2);
  `,
  doubleBottomPadding: css`
    padding-bottom: calc(${sv.defaultPadding} * 2);
  `,
  header: css`
    padding-bottom: ${sv.defaultPadding};
    margin-bottom: ${sv.defaultMargin};
  `,
  body: css`
    margin-top: calc(${sv.defaultMargin} * -1);
    margin-bottom: calc(${sv.defaultMargin} * -1);
  `,
  footer: css`
    margin-top: ${sv.defaultMargin};
    padding-top: ${sv.defaultPadding};
  `,
  noSpacing: css`
    padding: 0;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-top: 0;
    margin-bottom: 0;
    margin: calc(${sv.defaultMargin} * -1);
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


export const PanelBody = ({ children, noPadding, style }) => {
  return (
    <div
      style={style}
      className={cx(styles.body, { [styles.noSpacing]: noPadding })}>
      {children}
    </div>
  );
};

PanelBody.propTypes = {
  /** Content of the body */
  children: PropTypes.node.isRequired,

  /** If true there is no (minimal) space between the content and the border of the panel */
  noPadding: PropTypes.bool,

  /** Used for style overrides */
  style: PropTypes.object,
};


export const PanelSection = ({ children, title, style }) => {
  return (
    <div style={style} className={styles.section}>
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
  title: PropTypes.string,

  /** Used for style overrides */
  style: PropTypes.object,
};


export const PanelFooter = ({ children, noPadding, style }) => {
  return (
    <div style={style} className={cx(styles.footer, {
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

  /** Used for style overrides */
  style: PropTypes.object,
};


const Panel = ({ header, body, footer, style }) => {
  return (
    <div style={style} className={cx(styles.root, {
      [styles.doubleTopPadding]: ! header && ! body.props.noPadding,
      [styles.doubleBottomPadding]: ! footer && ! body.props.noPadding,
    })}>
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
  body: PropTypes.node.isRequired,

  /** Component: PanelFooter, will render as the footer of the panel */
  footer: PropTypes.node,

  /** Used for style overrides */
  style: PropTypes.object,
};


export default Panel;
