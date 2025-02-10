import { BASE_URL, TIME_OUT } from './config';
import HYRequest from './request';

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});

export const hyRequest2 = new HYRequest({
  baseURL: 'http://codercba.com:1888/airbnb/api',
  timeout: 8000,

  interceptors: {
    requestSuccessFn: (config) => {
      return config;
    },
    requestFailFn: (error) => {
      return error;
    },
    responseSuccessFn: (response) => {
      return response;
    },
    responseFailFn: (error) => {
      return error;
    }
  }
});

export default hyRequest;
