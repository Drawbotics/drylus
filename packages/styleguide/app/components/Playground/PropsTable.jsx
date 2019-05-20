import React from 'react';
import {
  Table,
  TBody,
  THead,
  TCell,
  TRow,
  Panel,
  PanelBody,
  PanelSection,
} from '@drawbotics/react-drylus';

import Prop from './Prop';


function getProps(Component) {
  const { __docgenInfo: docgenInfo } = Component;
  const { props } = docgenInfo;
  return props || {};
}


const PropsTable = ({ component, onChange, activeProps }) => {
  const props = getProps(component);
  return (
    <Panel
      body={
        <PanelBody noPadding>
          <PanelSection>
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
                {Object.keys(props).sort().map((key) => (
                  <TRow key={key}>
                    <TCell>{key}</TCell>
                    <TCell>{props[key].type.name}</TCell>
                    <TCell>{props[key].defaultValue?.value.replace(/'/g, '') || null}</TCell>
                    <TCell>{String(props[key].required)}</TCell>
                    <TCell>
                      {do{
                        if (props[key].description) {
                          props[key].description;
                        }
                        else if (props[key].type.name === 'enum') {
                          const values = props[key].type.value.map((v) => v.value.replace(/'/g, ''));
                          `One of: ${values.join(', ')}`;
                        }
                      }}
                    </TCell>
                    <TCell>
                      {do{
                        if (activeProps) {
                          <Prop
                            name={key}
                            prop={props[key]}
                            value={activeProps[key]}
                            onChange={onChange} />
                        }
                      }}
                    </TCell>
                  </TRow>
                ))}
              </TBody>
            </Table>
          </PanelSection>
        </PanelBody>
      } />
  );
};


export default PropsTable;
