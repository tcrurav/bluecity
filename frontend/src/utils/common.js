// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// return the user data from the session storage
export const getApiUser = () => {
  const userStr = sessionStorage.getItem('apiUser');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getApiToken = () => {
  return sessionStorage.getItem('apiToken') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('apiToken');
  sessionStorage.removeItem('apiUser');
}

// set the token and user from the session storage
export const setUserSession = (token, user, apiToken, apiUser) => {
  console.log("tiburcio - setUserSession")
  console.log(apiToken)
  console.log(apiUser)
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('apiToken', apiToken);
  sessionStorage.setItem('apiUser', JSON.stringify(apiUser));
}