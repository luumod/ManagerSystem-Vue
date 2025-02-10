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
      console.log('requestSuccessFn', config);
      return config;
    },
    requestFailFn: (error) => {
      console.log('requestFailFn', error);
      return error;
    },
    responseSuccessFn: (response) => {
      console.log('responseSuccessFn', response);
      return response;
    },
    responseFailFn: (error) => {
      console.log('responseFailFn', error);
      return error;
    }
  }
});

export default hyRequest;
