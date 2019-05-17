import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Label from './Label';


const styles = {
  base: css`
    border-collapse: collapse;

    > tbody > tr[data-nested] {
      box-shadow: 0 5px 12px -5px ${sv.neutral} inset;

      & > td {
        padding-left: ${sv.paddingExtraLarge};
      }
    }

    [data-nested] ~ tr:not([data-row]):nth-of-type(even) {
      background: ${sv.neutralLighter};
    }

    [data-nested] ~ tr:not([data-row]):nth-of-type(odd) {
      background: ${sv.white};
    }

    [data-nested] ~ [data-nested] ~ tr:not([data-row]):nth-of-type(even) {
      background: ${sv.white};
    }

    [data-nested] ~ [data-nested] ~ tr:not([data-row]):nth-of-type(odd) {
      background: ${sv.neutralLighter};
    }

    [data-nested] tr {
      background: none !important;
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
    padding-right: ${sv.defaultPadding};
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
    &:nth-of-type(even) {
      background: ${sv.white};

      & + [data-nested] {
        background: ${sv.white};
      }
    }

    &:nth-of-type(odd) {
      background: ${sv.neutralLighter};

      & + [data-nested] {
        background: ${sv.neutralLighter};
      }
    }

    & > td:last-of-type {
      text-align: right;
    }

    & > th:last-of-type {
      text-align: right;
    }

    &[data-nested] > td > table {
      tr {
        border-bottom: 1px solid ${sv.neutralLight};

        &:last-of-type {
          border-bottom: none;
        }
      }

      td {
        padding-top: ${sv.paddingSmall};
        padding-bottom: ${sv.paddingSmall};

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }
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


export const TRow = ({ children, nested, parent }) => {
  return (
    <tr className={styles.row} data-nested={nested || undefined} data-parent={parent || undefined}>
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
