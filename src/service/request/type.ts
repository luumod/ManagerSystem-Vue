import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestFailFn?: (error: any) => any;
  responseSuccessFn?: (response: T) => T;
  responseFailFn?: (error: any) => any;
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>;
}
