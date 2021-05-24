import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASEURL + "/api",
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    // WARNING: Now is working without Authorisation. To be repaired in the future.
    //const token = getApiToken();
    const token = null;
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();