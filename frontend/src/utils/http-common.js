import axios from "axios";
import { getApiToken } from "./common";

const apiToken = getApiToken();
const objToExport = apiToken ? axios.create({
  baseURL: process.env.REACT_APP_BASEURL + "/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  }
})
  :
  axios.create({
    baseURL: process.env.REACT_APP_BASEURL + "/api",
    headers: {
      "Content-type": "application/json"
    }
  });

export default objToExport;