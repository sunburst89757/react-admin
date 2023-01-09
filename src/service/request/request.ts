import { RequestConfig } from "./../types";
import { message } from "antd";
import { refreshToken } from "api/user";
import router from "../../router";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ImyRequest, IMyResponse } from "service";
import { errorHandle } from "service/utils/errorhandle";
import { cache } from "utils/cache";
let isRefresh = false;
let request: Function[] = [];
export class MyRequest {
  service: AxiosInstance;
  constructor(config: RequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const access_token = cache.getItem("access_token");
        if (access_token) {
          config.headers!.Authorization = access_token;
        }

        // debugger;
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
    // 不同实例的响应拦截器
    this.service.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseErr
    );
    this.service.interceptors.response.use(
      (res: AxiosResponse<IMyResponse>) => {
        console.log("公共拦截");
        // debugger;
        const { config, data } = res;
        //   错误处理
        if (data.code !== 200 && res?.data.code !== 401) {
          return errorHandle(data.code, data.message);
        } else if (data.code === 401) {
          const refresh_token = cache.getItem("refresh_token");
          // token失效
          if (!isRefresh) {
            isRefresh = true;
            return refreshToken({ refresh_token })
              .then(({ data }) => {
                cache.setItem("access_token", data.access_token);
                // 执行中断请求 不能直接传递res.config做参数 会直接报错 ，并且要直接return这个promise 否则原来的中断请求会拿不到返回值
                request.forEach((fn) => {
                  fn();
                });
                request = [];
                return this.request({
                  url: config.url,
                  method: config.method,
                  data: config.data,
                  params: config.params
                });
              })
              .catch((err) => {
                cache.clear();
                request = [];
                message.error("登录状态已过期请重新登录");
                router.navigate("/login");
              })
              .finally(() => {
                isRefresh = false;
              }) as unknown as AxiosResponse<IMyResponse>;
          } else {
            // 避免重复刷新refreshToken
            return new Promise((resolve) => {
              //  多余函数通过Promise挂起
              request.push(() => {
                resolve(
                  this.request({
                    url: config.url,
                    method: config.method,
                    data: config.data,
                    params: config.params
                  })
                );
              });
            });
          }
        }

        // 成功提示
        (config as ImyRequest).successMsg &&
          message.success((config as ImyRequest).successMsg, 1);
        return data as unknown as AxiosResponse<IMyResponse>;
      },
      (err) => {
        // console.log(err, "公共响应拦截失败");
        message.error("请求错误，请联系管理员");
        return Promise.reject(err);
      }
    );
  }
  request<T = any>(config: RequestConfig): Promise<T> {
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
            res = config.interceptors?.responseSuccess(res as any) as any;
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
