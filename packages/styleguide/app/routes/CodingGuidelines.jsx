import React from 'react';
import {
  Layout,
  LayoutPositions,
  Content,
} from '@drawbotics/react-drylus';

import LinksNavigation from '../components/LinksNavigation';
import RoutesRenderer from '../components/RoutesRenderer';
import codingGuidelines from '../pages/coding-guidelines';


const CodingGuidelines = () => {
  return (
    <Layout
      fixed
      bar={<LinksNavigation title="Coding guidelines" routes={codingGuidelines} base='coding-guidelines' />}
      position={LayoutPositions.LEFT}>
      <Content fullHeight>
        <RoutesRenderer routes={codingGuidelines} base='coding-guidelines' />
      </Content>
    </Layout>
  );
};


export default CodingGuidelines;