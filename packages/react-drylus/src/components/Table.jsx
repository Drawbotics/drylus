import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Label from './Label';


const styles = {
  base: css`
    border-collapse: collapse;
  `,
  fullWidth: css`
    width: 100%;
  `,
  cell: css`
    text-align: left;
    padding: calc(${sv.defaultPadding} - 4px) ${sv.defaultPadding};
  `,
  headerPadding: css`
    padding: ${sv.paddingSmall} ${sv.defaultPadding};
  `,
  rightAlign: css`
    text-align: right;
  `,
  header: css`
    border-bottom: 1px solid ${sv.neutral};
  `,
  white: css`
    background: ${sv.white};
  `,
  row: css`
    background: ${sv.white};

    &:nth-of-type(odd) {
      background: ${sv.neutralLighter};
    }
  `,
  body: css`
    color: ${sv.colorPrimary};
  `,
};


export const TCell = ({ children, head, rightAlign }) => {
  const className = cx(styles.cell, {
    [styles.rightAlign]: rightAlign,
    [styles.white]: head,
    [styles.headerPadding]: head,
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
    <td className={className}>
      {children}
    </td>
  );
};


export const TRow = ({ children }) => {
  return (
    <tr className={styles.row}>
      {React.Children.map(children, (child, key) => React.cloneElement(child, {
        ...child.props,
        key,
        rightAlign: key === React.Children.count(children) - 1,
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
