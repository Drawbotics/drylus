import React from 'react';
import { css, cx } from 'emotion';
import sv from '@drawbotics/style-vars';

import Prop from './Prop';


const styles = {
  propsTable: css`
    width: 100%;
    margin: ${sv.defaultMargin} 0;
    border: 1px solid rgba(84, 110, 122, 0.3);
    border-radius: 5;
    overflow: hidden;
  `,
  row: css`
    width: 100%;
    display: flex;
    align-items: center;

    &:nth-of-type(odd): {
      background: rgba(84, 110, 122, 0.03);
    }
  `,
  cell: css`
    flex: 1;
    padding: ${sv.defaultPadding};
    color: ${sv.colorPrimary};
  `,
  bigCell: css`
    flex: 2;
  `,
  header: css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    color: ${sv.colorSecondary};
    background: rgba(84, 110, 122, 0.1) !important;
  `,
  headerCell: css`
    padding: 12px 16px;
    padding-top: 14;
  `,
};


function getProps(Component) {
  const { __docgenInfo: docgenInfo } = Component;
  const { props } = docgenInfo;
  return props || {};
}


const PropsTable = ({ component, onChange, activeProps }) => {
  const props = getProps(component);
  return (
    <div className={styles.propsTable}>
      <div className={cx(styles.row, styles.header)}>
        <div className={cx(styles.cell, styles.headerCell)}>
          Name
        </div>
        <div className={cx(styles.cell, styles.headerCell)}>
          Type
        </div>
        <div className={cx(styles.cell, styles.headerCell)}>
          Default
        </div>
        <div className={cx(styles.cell, styles.headerCell)}>
          Required
        </div>
        <div className={cx(styles.cell, styles.headerCell, styles.bigCell)}>
          Description
        </div>
        <div className={cx(styles.cell, styles.headerCell, styles.bigCell)}>
          Values
        </div>
      </div>
      {Object.keys(props).sort().map((key) => (
        <div key={key} className={styles.row}>
          <div className={styles.cell}>
            {key}
          </div>
          <div className={styles.cell}>
            {props[key].type.name}
          </div>
          <div className={styles.cell}>
            {props[key].defaultValue?.value.replace(/'/g, '') || null}
          </div>
          <div className={styles.cell}>
            {String(props[key].required)}
          </div>
          <div className={cx(styles.cell, styles.bigCell)}>
            {do {
              if (props[key].description) {
                props[key].description;
              }
              else if (props[key].type.name === 'enum') {
                const values = props[key].type.value.map((v) => v.value.replace(/'/g, ''));
                `One of: ${values.join(', ')}`;
              }
            }}
          </div>
          <div className={cx(styles.cell, styles.bigCell)}>
            <Prop
              name={key}
              prop={props[key]}
              value={activeProps[key]}
              onChange={onChange} />
          </div>
        </div>
      ))}
    </div>
  );
};


export default PropsTable;
