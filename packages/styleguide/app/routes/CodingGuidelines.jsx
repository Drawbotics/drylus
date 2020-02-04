import { Content, Layout, Position } from '@drawbotics/react-drylus';
import { useScreenSize } from '@drawbotics/use-screen-size';
import React from 'react';

import LinksNavigation from '../components/LinksNavigation';
import RoutesRenderer from '../components/RoutesRenderer';
import codingGuidelines from '../pages/coding-guidelines';

const CodingGuidelines = () => {
  const { screenSize, ScreenSizes } = useScreenSize();

  const content = (
    <Content fullHeight style={{ minHeight: screenSize <= ScreenSizes.L ? '100vh' : null }}>
      <RoutesRenderer routes={codingGuidelines} base="coding-guidelines" />
    </Content>
  );

  if (screenSize <= ScreenSizes.L) {
    return content;
  }

  return (
    <Layout
      fixed
      bar={
        <LinksNavigation
          title="Coding guidelines"
          routes={codingGuidelines}
          base="coding-guidelines"
        />
      }
      position={Position.LEFT}>
      {content}
    </Layout>
  );
};

export default CodingGuidelines;
