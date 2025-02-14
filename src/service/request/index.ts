import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HYRequestConfig } from './type';
import C_Error from '@/types/error.types';

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  instance: AxiosInstance;

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { code, codestr, message } = response.data;

        //在此添加错误拦截
        if (code !== undefined && code !== 0) {
          const error = new C_Error(message, code, codestr);
          console.log(error);
          return Promise.reject(error);
        }
        return response.data;
      },
      (error) => {
        // 处理 HTTP 错误状态码
        const errorMessage = error.response?.data?.message || error.message || '网络连接异常';
        const errorCode = error.response?.status || error.code || 'UNKNOWN_ERROR';

        const customError = new C_Error(errorMessage, errorCode, 'HTTP_ERROR');
        customError.code = errorCode;

        return Promise.reject(customError);
      }
    );

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err); // Reject 错误，供调用者进一步处理
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default HYRequest;
