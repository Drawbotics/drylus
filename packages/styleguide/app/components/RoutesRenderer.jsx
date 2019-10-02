import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Renderer from './Renderer';
import { generateRoutes } from '../utils';


const RoutesHandler = ({ location, match, routes, base }) => {
  const route = routes[location.pathname];
  if (route) {
    return (
      <Renderer>
        {React.createElement(route)}
      </Renderer>
    );
  }
  else {
    return (
      <Redirect to={`/${base}/introduction`} />
    );
  }
};


const RoutesRenderer = ({ routes, base, ...props }) => {
  const generatedRoutes = generateRoutes({ route: routes, base });
  return (
    <Switch>
      <Route
        path={[`/${base}/*`, `/${base}`]}
        render={() => <RoutesHandler {...props} base={base} routes={generatedRoutes} />} />
    </Switch>
  );
};


export default withRouter(RoutesRenderer);
