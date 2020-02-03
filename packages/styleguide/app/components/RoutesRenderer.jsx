import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { generateRoutes } from '../utils';
import Renderer from './Renderer';

const RoutesHandler = ({ location, match, routes, base }) => {
  const route = routes[location.pathname];
  if (route) {
    return <Renderer>{React.createElement(route)}</Renderer>;
  } else {
    return <Redirect to={`/${base}/introduction`} />;
  }
};

const RoutesRenderer = ({ routes, base, ...props }) => {
  const generatedRoutes = generateRoutes({ route: routes, base });
  return (
    <Switch>
      <Route
        path={[`/${base}/*`, `/${base}`]}
        render={() => <RoutesHandler {...props} base={base} routes={generatedRoutes} />}
      />
    </Switch>
  );
};

export default withRouter(RoutesRenderer);
