import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Label from './Label';


const styles = {
  base: css`
    border-collapse: collapse;

    [data-row]:nth-of-type(even) {
      background: ${sv.white};
    }

    [data-row]:nth-of-type(odd) {
      background: ${sv.neutralLighter};
    }

    tr:not([data-row]) ~ [data-row]:nth-of-type(even) {
      background: ${sv.neutralLighter};
    }

    tr:not([data-row]) ~ [data-row]:nth-of-type(odd) {
      background: ${sv.white};
    }

    tr:not([data-row]) ~ tr:not([data-row]) ~ [data-row]:nth-of-type(even) {
      background: ${sv.white};
    }

    tr:not([data-row]) ~ tr:not([data-row]) ~ [data-row]:nth-of-type(odd) {
      background: ${sv.neutralLighter};
    }
  `,
  fullWidth: css`
    width: 100%;
  `,
  cell: css`
    text-align: left;
    padding: calc(${sv.defaultPadding} - 4px) ${sv.defaultPadding};
  `,
  asContainer: css`
    padding: 0;
    padding-left: ${sv.defaultPadding};
  `,
  header: css`
    border-bottom: 1px solid ${sv.neutral};

    & td:last-of-type {
      text-align: right;
    }

    & th {
      padding: ${sv.paddingSmall} ${sv.defaultPadding};
      background: ${sv.white} !important;

      &:last-of-type {
        text-align: right;
      }
    }
  `,
  row: css`

    & > td:last-of-type {
      text-align: right;
    }

    & > th:last-of-type {
      text-align: right;
    }
  `,
  body: css`
    color: ${sv.colorPrimary};
  `,
};


export const TCell = ({ children, head, asContainer }) => {
  const className = cx(styles.cell, {
    [styles.asContainer]: asContainer,
  });
  if (head) {
    return (
      <th className={className}>
        <Label>
          {children}
        </Label>
      </th>
    );
  }
  return (
    <td className={className} colSpan={asContainer ? '100' : null}>
      {children}
    </td>
  );
};


export const TRow = ({ children, nested }) => {
  return (
    <tr className={styles.row} data-row={nested ? undefined : true}>
      {React.Children.map(children, (child, key) => React.cloneElement(child, {
        ...child.props,
        key,
        asContainer: nested,
      }))}
    </tr>
  );
};


export const THead = ({ children }) => {
  return (
    <thead className={styles.header}>
      <TRow>
        {React.Children.map(children, (child, key) => React.cloneElement(child, {
          ...child.props,
          key,
          head: true,
        }))}
      </TRow>
    </thead>
  );
};


export const TBody = ({ children }) => {
  return (
    <tbody className={styles.body}>
      {children}
    </tbody>
  );
};


const Table = ({
  children,
  fullWidth,
}) => {
  return (
    <table className={cx(styles.base, {
      [styles.fullWidth]: fullWidth,
    })}>
      {children}
    </table>
  );
};


Table.propTypes = {
  /** Will be THead and TBody */
  children: PropTypes.node,

  /** If true, the table takes the full width of the container, defaults to true */
  fullWidth: PropTypes.bool,
};


Table.defaultProps = {
  fullWidth: true,
};


export default Table;
