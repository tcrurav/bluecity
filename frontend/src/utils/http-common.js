import axios from "axios";
import { getApiToken } from "./common";

// const objToExport = getApiToken() ? axios.create({
//   baseURL: process.env.REACT_APP_BASEURL + "/api",
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": `Bearer ${getApiToken()}`
//   }
// })
//   :
//   axios.create({
//     baseURL: process.env.REACT_APP_BASEURL + "/api",
//     headers: {
//       "Content-type": "application/json"
//     }
//   });

// export default objToExport;

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
    const token = getApiToken();
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();