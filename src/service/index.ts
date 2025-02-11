import { localCache } from '@/utils/cache';
import { BASE_URL, TIME_OUT } from './config';
import HYRequest from './request';
import { LOGIN_TOKEN } from '@/global/constants';

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //请求拦截：每个请求都自动做拦截
  interceptors: {
    requestSuccessFn: (config) => {
      //! 表示非空断言
      const token = localCache.getCache(LOGIN_TOKEN);
      if (config.headers && token) {
        config.headers.Authorization = `Bearer${token}`;
      }
      return config;
    }
  }
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
