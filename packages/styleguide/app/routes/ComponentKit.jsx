import React from 'react';
import {
  Layout,
  LayoutPositions,
  Content,
} from '@drawbotics/react-drylus';

import LinksNavigation from '../components/LinksNavigation';
import RoutesRenderer from '../components/RoutesRenderer';
import componentKit from '../pages/component-kit';


const ComponentKit = () => {
  return (
    <Layout
      fixed
      bar={<LinksNavigation title="Component kit" routes={componentKit} base='component-kit' />}
      position={LayoutPositions.LEFT}>
      <Content fullHeight>
        <RoutesRenderer routes={componentKit} base='component-kit' />
      </Content>
    </Layout>
  );
};


export default ComponentKit;