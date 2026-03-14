import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { generateRoutes } from '../utils';
import Renderer from './Renderer';

const RoutesHandler = ({ routes, base }) => {
  const location = useLocation();
  const route = routes[location.pathname];
  if (route) {
    return <Renderer>{React.createElement(route)}</Renderer>;
  } else {
    return <Navigate to={`/${base}/introduction`} replace />;
  }
};

const RoutesRenderer = ({ routes, base }) => {
  const generatedRoutes = generateRoutes({ route: routes, base });
  return (
    <Routes>
      <Route
        path="*"
        element={<RoutesHandler base={base} routes={generatedRoutes} />}
      />
    </Routes>
  );
};

export default RoutesRenderer;
