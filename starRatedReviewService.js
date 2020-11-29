import axios from "axios";
import { API_HOST_PREFIX } from "../serviceHelpers";
import * as serviceHelper from "../serviceHelpers";

let endpoint = `${API_HOST_PREFIX}/api/comments`;

let addRequest = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

let getAllProductComments = (pageIndex, pageSize, productId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/productcomments/${productId}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};







export {
  addRequest,
  getAllProductComments,
};