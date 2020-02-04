import { Content, Layout, Position } from '@drawbotics/react-drylus';
import { useScreenSize } from '@drawbotics/use-screen-size';
import React from 'react';

import LinksNavigation from '../components/LinksNavigation';
import RoutesRenderer from '../components/RoutesRenderer';
import componentKit from '../pages/component-kit';

const ComponentKit = () => {
  const { screenSize, ScreenSizes } = useScreenSize();

  const content = (
    <Content fullHeight style={{ minHeight: screenSize <= ScreenSizes.L ? '100vh' : null }}>
      <RoutesRenderer routes={componentKit} base="component-kit" />
    </Content>
  );

  if (screenSize <= ScreenSizes.L) {
    return content;
  }

  return (
    <Layout
      fixed
      bar={<LinksNavigation title="Component kit" routes={componentKit} base="component-kit" />}
      position={Position.LEFT}>
      {content}
    </Layout>
  );
};

export default ComponentKit;
