import React from 'react';
import {
  Layout,
  LayoutPositions,
  Content,
} from '@drawbotics/react-drylus';
import { useScreenSize } from '@drawbotics/use-screen-size';

import LinksNavigation from '../components/LinksNavigation';
import RoutesRenderer from '../components/RoutesRenderer';
import componentKit from '../pages/component-kit';


const ComponentKit = () => {
  const { screenSize, ScreenSizes } = useScreenSize();

  const content = (
    <Content
      fullHeight
      style={{ height: screenSize <= ScreenSizes.L ? '100vh' : null,
    }}>
      <RoutesRenderer routes={componentKit} base='component-kit' />
    </Content>
  );

  if (screenSize <= ScreenSizes.L) {
    return content;
  }

  return (
    <Layout
      fixed
      bar={<LinksNavigation title="Component kit" routes={componentKit} base='component-kit' />}
      position={LayoutPositions.LEFT}>
      {content}
    </Layout>
  );
};


export default ComponentKit;