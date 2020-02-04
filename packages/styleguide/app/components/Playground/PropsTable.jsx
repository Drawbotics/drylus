import sv from '@drawbotics/drylus-style-vars';
import {
  Align,
  Category,
  Flex,
  FlexItem,
  FlexJustify,
  Icon,
  Margin,
  Position,
  Size,
  TBody,
  TCell,
  THead,
  TRow,
  Table,
  Tag,
  Tier,
  Tooltip,
} from '@drawbotics/react-drylus';
import { css } from 'emotion';
import React from 'react';

import Prop from './Prop';
import PropsInfo from './PropsInfo';

const styles = {
  table: css`
    overflow: scroll;
    border: 1px solid ${sv.neutralLight};
  `,
};

function getProps(Component) {
  const { __docgenInfo: docgenInfo } = Component;
  const { props } = docgenInfo;
  return props || {};
}

const PropsTable = ({ component, onChange, activeProps, enums }) => {
  const props = getProps(component);
  return (
    <div className={styles.table}>
      <Table>
        <THead>
          <TCell>Name</TCell>
          <TCell>Type</TCell>
          <TCell>Default</TCell>
          <TCell>Required</TCell>
          <TCell>Description</TCell>
          <TCell>{activeProps && 'Values'}</TCell>
        </THead>
        <TBody>
          {Object.keys(props)
            .sort()
            .map((key) => (
              <TRow key={key}>
                <TCell>{key}</TCell>
                <TCell>
                  {do {
                    if (props[key].type.value) {
                      <Tooltip
                        content={<PropsInfo props={props[key].type.value} />}
                        side={Position.RIGHT}>
                        <Flex justify={FlexJustify.START}>
                          <FlexItem>{props[key].type.name}</FlexItem>
                          <FlexItem>
                            <Margin size={{ left: Size.EXTRA_SMALL }}>
                              <span style={{ color: sv.colorSecondary }}>
                                <Icon name="info" />
                              </span>
                            </Margin>
                          </FlexItem>
                        </Flex>
                      </Tooltip>;
                    } else {
                      props[key].type.name;
                    }
                  }}
                </TCell>
                <TCell>{props[key].defaultValue?.value.replace(/'/g, '') || null}</TCell>
                <TCell>{String(props[key].required)}</TCell>
                <TCell>
                  {do {
                    if (props[key].description) {
                      const val = props[key].description;
                      val === 'DEPRECATED' ? (
                        <Tag category={Category.WARNING} inversed>
                          {val}
                        </Tag>
                      ) : (
                        val
                      );
                    } else if (props[key].type.name === 'enum') {
                      const values = props[key].type.value.map((v) => v.value.replace(/'/g, ''));
                      `One of: ${values.join(', ')}`;
                    }
                  }}
                </TCell>
                <TCell>
                  {do {
                    if (activeProps) {
                      <Prop
                        enums={{
                          ...enums,
                          Category,
                          Size,
                          Tier,
                          Align,
                          Position,
                        }}
                        name={key}
                        prop={props[key]}
                        value={activeProps[key]}
                        onChange={onChange}
                      />;
                    }
                  }}
                </TCell>
              </TRow>
            ))}
        </TBody>
      </Table>
    </div>
  );
};

export default PropsTable;
