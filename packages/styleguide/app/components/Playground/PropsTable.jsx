import sv from '@drawbotics/drylus-style-vars';
import {
  Color,
  Category,
  Tier,
  Align,
  Shade,
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
import upperFirst from 'lodash/upperFirst';
import React, { Fragment } from 'react';

import PropsInfo from './PropsInfo';
import Prop from './Prop';
import { extractIntrinsics, generateDocs } from './utils';

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

              return (
                <TRow key={key}>
                  {/* Name */}
                  <TCell>{key}</TCell>
                  {/* Type */}
                  <TCell>
                    {do {
                      if (prop.type.values != null) {
                        const { variants } = _isEnum(prop)
                          ? extractIntrinsics(prop.type.values)
                          : { variants: [], nonVariants: [] };
                        const tooltipValues = _isEnum(prop) ? variants : prop.type.values;
                        let tooltip = (
                          <Tooltip
                            content={<PropsInfo props={tooltipValues} />}
                            side={Position.RIGHT}
                            style={{ maxWidth: '600px' }}>
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
                          </Tooltip>
                        );
                        
                        if (_isEnum(prop)) {
                          const { nonVariants } = extractIntrinsics(prop.type.values);
                          if (nonVariants.length !== 0) {
                            return (
                              <Fragment>
                                {tooltip}
                                <span> Or {nonVariants.join(' or ')}</span>
                              </Fragment>
                            );
                          }
                        }
                        return tooltip;
                      } else {
                        prop.type.name ?? prop.type.type ?? prop.type;
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
                          <Fragment>
                            <Margin
                              size={{ right: Size.EXTRA_SMALL }}
                              style={{ display: 'inline-block' }}>
                              <Tag color={Color.ORANGE} inversed>
                                DEPRECATED
                              </Tag>
                            </Margin>
                            {upperFirst(prop.deprecation)}
                            {upperFirst(prop.description)}
                          </Fragment>
                        );
                      } else if (_isEnum(prop)) {
                        const { variants, nonVariants } = extractIntrinsics(prop.type.values);
                        const variantsDesc = `One of: ${variants.join(', ')}`;
                        if (nonVariants.length > 0) {
                          return (
                            <Fragment>
                              {variantsDesc}
                              <br />
                              <span>Or: {nonVariants.join(' or ')}</span>
                            </Fragment>
                          );
                        }
                        return variantsDesc;
                      } else {
                        upperFirst(prop.description);
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
                            Color,
                            Shade,
                          }}
                          type={prop.type.type}
                          name={key}
                          prop={prop}
                          value={activeProps[key]}
                          onChange={onChange}
                        />;
                      }
                    }}
                  </TCell>
                </TRow>
              );
            })}
        </TBody>
      </Table>
    </div>
  );
};

export default PropsTable;
