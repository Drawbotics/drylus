import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ComponentKit from './ComponentKit';
import CodingGuidelines from './CodingGuidelines';
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