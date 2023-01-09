import { AxiosRequestConfig, AxiosResponse } from "axios";
export interface Interceptors<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestErr?: (err: any) => any;
  responseSuccess?: (res: T) => T;
  responseErr?: (err: any) => any;
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>;
}
