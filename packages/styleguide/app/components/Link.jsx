import React from 'react';
import { Link as DryLink } from '@drawbotics/react-drylus';
import { Link as RouterLink } from 'react-router-dom';


const Link = (props) => {
  return (
    <DryLink {...props} to={props.href} component={RouterLink} />
  );
};


export default Link;
