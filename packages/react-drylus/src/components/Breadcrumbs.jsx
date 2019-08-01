import React, { Fragment } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';


const styles = {
  root: css`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  `,
  crumb: css`
    padding: 5px;
    transition: ${sv.defaultTransition};
    color: ${sv.colorSecondary};
    border-radius: ${sv.defaultBorderRadius};

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  `,
  clickable: css`
    color: ${sv.blue};

    &:hover {
      cursor: pointer;
      background: ${sv.neutralLight};
      color: ${sv.blue};
    }
  `,
  active: css`
    color: ${sv.colorPrimary};
  `,
  divisor: css`
    margin: 0 3px;
    color: ${sv.colorSecondary};
  `,
};


const Breadcrumbs = ({ crumbs, linkComponent: Link }) => {
  const renderCrumb = (crumb) => (
    <div
      className={cx(styles.crumb, {
        [styles.clickable]: crumb.url,
        [styles.active]: crumb.active,
      })}>
      {crumb.label}
    </div>
  );
  return (
    <div className={styles.root}>
      {crumbs.map((crumb, i) => (
        <Fragment key={i}>
          {do {
            if (i > 0) {
              <div className={styles.divisor}>
                /
              </div>
            }
          }}
          {Link ?
            React.createElement(Link, { href: crumb.url },renderCrumb(crumb)) :
            renderCrumb(crumb)}
        </Fragment>
      ))}
    </div>
  );
};

Breadcrumbs.propTypes = {
  /** Array of objects with properties: label (text), url (link to page), active (if crumb is current page) */
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
      active: PropTypes.boolean,
    }),
  ).isRequired,
};


export default Breadcrumbs;
