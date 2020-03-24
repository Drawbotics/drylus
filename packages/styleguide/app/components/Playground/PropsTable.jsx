import sv from '@drawbotics/drylus-style-vars';
import {
  Color,
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
  Tooltip,
} from '@drawbotics/react-drylus';
import docs from '@drawbotics/react-drylus/docs.json';
import { css } from 'emotion';
import React from 'react';

// import Prop from './Prop';
import PropsInfo from './PropsInfo';
import { generateDocs } from './utils';

const styles = {
  table: css`
    overflow: scroll;
    border: 1px solid ${sv.neutralLight};
  `,
};

function _getProps(Component) {
  const description = generateDocs(Component.name, docs);
  return description ?? {};
}

function _hasDeprecation(prop) {
  return prop.deprecation != null;
}


function _isEnum(prop) {
  return prop?.type?.type === 'enum';
}

function _isUnion(prop) {
  return prop?.type?.type === 'union';
}

function capitalizeFirst(text) {
  if (typeof text !== 'string' || text === '') return text;
  return text[0].toUpperCase() + text.slice(1);
}

const PropsTable = ({ component, onChange, activeProps, enums }) => {
  const props = _getProps(component);

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
            .map((key) => {
              const prop = props[key];
              console.log(prop);

              return (
                <TRow key={key}>
                  {/* Name */}
                  <TCell>{key}</TCell>
                  {/* Type */}
                  <TCell>
                    {do {
                      if  (prop.type.values != null) {
                        <Tooltip
                          content={<PropsInfo props={prop.type.values} />}
                          side={Position.RIGHT}>
                          <Flex justify={FlexJustify.START}>
                            <FlexItem>{prop.type.name ?? prop.type.type}</FlexItem>
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
                        prop.type.name ?? prop.type.type;
                      }
                    }}
                  </TCell>
                  {/* Default */}
                  <TCell>{prop.defaultValue}</TCell>
                  {/* Required */}
                  <TCell>{String(prop.required)}</TCell>
                  {/* Description */}
                  <TCell>
                    {do {
                      if (_hasDeprecation(prop)) {
                        return (
                          <React.Fragment>
                            <Margin size={{ right: Size.EXTRA_SMALL }} style={{ display: 'inline-block'}} >
                              <Tag color={Color.ORANGE} inversed>
                                DEPRECATED
                              </Tag>
                            </Margin>
                            {capitalizeFirst(prop.deprecation)}
                          </React.Fragment>
                        );
                      }
                      else if (_isEnum(prop)) {
                        const { values } = prop.type;
                        `One of: ${values.join(', ')}`;
                      }
                      else {
                        capitalizeFirst(prop.description);
                      }
                    }}
                  </TCell>
                  <TCell>
                    {/* {do {
                      if (activeProps) {
                        <Prop
                          enums={{
                            ...enums,
                            Category,
                            Size,
                            Tier,
                            Align,
                            Position,
                            Color,
                            Shade,
                          }}
                          name={key}
                          prop={prop}
                          value={activeProps[key]}
                          onChange={onChange}
                        />;
                      }
                    }} */}
                  </TCell>
                </TRow>
              );
            })
          }
        </TBody>
      </Table>
    </div>
  );
};

export default PropsTable;
