import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Renderer from './Renderer';
import { generateRoutes } from '../utils';


const RoutesHandler = ({ match, routes }) => {
  const route = routes[match.url];
  if (route) {
    return (
      <Renderer>
        {React.createElement(route)}
      </Renderer>
    );
  }
  else {
    return <Redirect to="/introduction" />;
  }
};


const RoutesRenderer = ({ routes }) => {
  const generatedRoutes = generateRoutes(routes);
  return (
    <Switch>
      <Route path="*" render={(props) => <RoutesHandler {...props} routes={generatedRoutes} />} />
    </Switch>
  );
};


export default RoutesRenderer;
