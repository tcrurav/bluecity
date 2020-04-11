import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getApiToken } from './common';
 
// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !getApiToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/main' }} />}
    />
  )
}
 
export default PublicRoute;