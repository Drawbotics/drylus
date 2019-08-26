import React from 'react';
import {
  Content,
} from '@drawbotics/react-drylus';

import RoutesRenderer from '../components/RoutesRenderer';
import codingGuidelines from '../pages/coding-guidelines';


const CodingGuidelines = () => {
  return (
    <Content fullHeight>
      <RoutesRenderer routes={{ index: codingGuidelines }} base="coding-guidelines" />
    </Content>
  );
};


export default CodingGuidelines;