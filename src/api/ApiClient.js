import {ApiEndpoints} from './ApiEndpoints';
import axios from 'axios';
import Values from '../constants/Values';
import Utils from '../constants/Utils';

export const ApiMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    if (Utils.isDevBuild()) {
      const logsToDisplay = `Request URL: ${config.url}\nMethod: ${
        config.method
      }\nHeaders: ${JSON.stringify(config.headers)} \nBody: ${JSON.stringify(
        config.data,
      )}`;
      console.log(logsToDisplay);
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if (Utils.isDevBuild()) {
      const logToDisplay = `API Status: ${
        response.status
      }\nResponse: ${JSON.stringify(response?.data)}`;
      console.log(logToDisplay);
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export const buildAndCallApi = async (
  method,
  endpoint,
  params = null,
  headers = {},
) => {
  try {
    const options = {
      method: method,
      url: endpoint,
      headers: headers,
      data: method === ApiMethods.GET ? null : params,
      timeout: Values.API_TIMEOUT * 1000,
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    const res = error.response;
    if (res) {
      return Promise.reject({error: res?.data});
    } else {
      return Promise.reject({error: error.AxiosError});
    }
  }
};

export const ApiClient = {
  getHoldingsData: async params => {
    return await buildAndCallApi(
      ApiMethods.GET,
      ApiEndpoints.holdings,
      null,
      null,
    );
  },
};
