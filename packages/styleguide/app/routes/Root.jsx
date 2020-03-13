import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CodingGuidelines from './CodingGuidelines';
import ComponentKit from './ComponentKit';
import DesignGuidelines from './DesignGuidelines';
import Intro from './Intro';

const Root = () => {
  return (
    <Switch>
      <Route path="/component-kit" component={ComponentKit} />
      <Route path="/coding-guidelines" component={CodingGuidelines} />
      <Route path="/design-guidelines" component={DesignGuidelines} />
      <Route path="/" component={Intro} />
    </Switch>
  );
};

export default Root;
