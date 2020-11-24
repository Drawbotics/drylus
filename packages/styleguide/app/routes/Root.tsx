import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CodingGuidelines from './CodingGuidelines.jsx';
import ComponentKit from './ComponentKit.jsx';
import DesignGuidelines from './DesignGuidelines.jsx';
import Intro from './Intro.jsx';

export const Root = () => {
  return (
    <Switch>
      <Route path="/component-kit" component={ComponentKit} />
      <Route path="/coding-guidelines" component={CodingGuidelines} />
      <Route path="/design-guidelines" component={DesignGuidelines} />
      <Route path="/" component={Intro} />
    </Switch>
  );
};
