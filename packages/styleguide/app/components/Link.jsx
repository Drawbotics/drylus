import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ children, href, ...rest }) => {
  return (
    <RouterLink {...rest} to={href}>
      {children}
    </RouterLink>
  );
};

export default Link;
