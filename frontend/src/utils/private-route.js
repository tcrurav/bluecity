import React, { useEffect } from 'react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Redirect } from 'react-router-dom';
import { getApiToken, getApiUser } from './common';

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {

  const { i18n } = useTranslation();
  
  useEffect(() => {
    const apiUser = getApiUser();
    if (apiUser) {
      if (i18n.language !== apiUser.language) i18n.changeLanguage(apiUser.language);
    }
  }, []);

  return (
    <Suspense fallback="loading">
      <Route
        {...rest}
        render={(props) => getApiToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    </Suspense>
  )
}

export default PrivateRoute;