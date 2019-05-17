import React, { useState, useContext, createContext } from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';
import PropTypes from 'prop-types';

import Label from './Label';
import Icon from './Icon';


const RowsContext = createContext([{}, () => {}]);


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
  leftPadded: css`
    > thead > tr > th:first-of-type {
      padding-left: ${sv.paddingHuge};
    }

    > tbody > tr > td:first-of-type {
      padding-left: ${sv.paddingHuge};
    }

    > tbody > tr[data-nested] > td {
      padding-left: calc(${sv.paddingExtraLarge} + ${sv.paddingHuge});
    }
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
  collapsed: css`
    display: none;
  `,
  body: css`
    color: ${sv.colorPrimary};
  `,
  withToggle: css`
    position: relative;

    > i {
      position: absolute;
      left: calc(${sv.defaultMargin} * -1);
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        cursor: pointer;
      }
    }
  `,
};


export const TCell = ({
  children,
  head,
  asContainer,
  withChildToggle,
  onClickArrow,
  active,
}) => {
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
      {do{
        if (withChildToggle) {
          <div onClick={onClickArrow} className={styles.withToggle}>
            <Icon name={active ? 'chevron-up' : 'chevron-down'} />
            {children}
          </div>
        }
        else {
          children
        }
      }}
    </td>
  );
};


export const TRow = ({ children, nested, parent }) => {
  const [ rowsStates, handleSetRowState ] = useContext(RowsContext);
  const collapsed = nested && ! rowsStates[nested];
  return (
    <tr className={cx(styles.row, {
        [styles.collapsed]: collapsed,
      })}
      data-nested={nested || undefined}
      data-parent={parent || undefined}>
      {React.Children.map(children, (child, key) => React.cloneElement(child, {
        ...child.props,
        key,
        asContainer: !! nested,
        withChildToggle: !! parent && key === 0,
        active: !! parent && rowsStates[parent],
        onClickArrow: parent ? () => handleSetRowState({ [parent]: ! rowsStates[parent] }) : null,
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
  withNesting,
}) => {
  const [rowsStates, setRowState] = useState({});
  const handleSetRowState = (state) => setRowState({ ...rowsStates, ...state });
  return (
    <table className={cx(styles.base, {
      [styles.fullWidth]: fullWidth,
      [styles.leftPadded]: withNesting,
    })}>
      <RowsContext.Provider value={[ rowsStates, handleSetRowState ]}>
        {children}
      </RowsContext.Provider>
    </table>
  );
};


Table.propTypes = {
  /** Will be THead and TBody */
  children: PropTypes.node,

  /** If true, the table takes the full width of the container, defaults to true */
  fullWidth: PropTypes.bool,

  /** If true, the table is given some padding on the left to accomodate for nesting controls */
  withNesting: PropTypes.bool,
};


Table.defaultProps = {
  fullWidth: true,
};


export default Table;
