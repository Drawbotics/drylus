import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CodingGuidelines from './CodingGuidelines.jsx';
import ComponentKit from './ComponentKit.jsx';
import DesignGuidelines from './DesignGuidelines.jsx';
import Intro from './Intro.jsx';

export const Root = () => {
  return (
    <Routes>
      <Route path="/component-kit/*" element={<ComponentKit />} />
      <Route path="/coding-guidelines/*" element={<CodingGuidelines />} />
      <Route path="/design-guidelines/*" element={<DesignGuidelines />} />
      <Route path="/*" element={<Intro />} />
    </Routes>
  );
};
