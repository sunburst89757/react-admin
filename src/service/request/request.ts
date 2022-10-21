import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ImyRequest } from "service";
import { errorHandle } from "service/utils/errorhandle";
import { cache } from "utils/cache";
import { RequestConfig } from "../types";
export class MyRequest {
  service: AxiosInstance;
  constructor(config: RequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = cache.getItem("token");
        if (token) {
          config.headers!.Authorization = token;
        }
        return config;
      },
      (err: any) => {
        // console.log(err, "所有实例都请求拦截失败");
        return Promise.reject(err);
      }
    );
    // 不同实例的请求拦截器
    this.service.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestErr
    );
    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        const { config, data } = res;
        //   错误处理
        if (data.code !== 200) {
          return errorHandle(data.code, data.message);
        }

        // 成功提示
        (config as ImyRequest).successMsg &&
          message.success((config as ImyRequest).successMsg, 1);
        return data;
      },
      (err) => {
        // console.log(err, "公共响应拦截失败");
        message.error("请求错误，请联系管理员");
        return Promise.reject(err);
      }
    );
    // 不同实例的响应拦截器
    this.service.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseErr
    );
  }
  request<T>(config: RequestConfig): Promise<T> {
    // 这个return才是真正执行请求，在执行请求前进行请求拦截--目的就是改变config
    if (config?.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config);
    }
    return new Promise((resolve, reject) => {
      this.service
        .request<any, T>(config)
        .then((res) => {
          // 响应成功的拦截
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors?.responseSuccess<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          if (config.interceptors?.responseErr) {
            err = config.interceptors?.responseErr(err);
          }
          reject(err);
        });
    });
  }
}
