import { AxiosResponse } from "axios";
import { IMyResponse } from "service";
import { RequestConfig } from "./types";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const config: RequestConfig = {
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestSuccess: (config) => {
      // console.log("特有的请求拦截成功");
      return config;
    },
    requestErr: (err: any) => {
      console.log(err, "特有的请求拦截失败");
    },
    responseSuccess: (res: AxiosResponse<IMyResponse>) => {
      // console.log("特有的响应拦截成功", res);
      return res;
    },
    responseErr: (err: any) => {
      console.log("特有的响应拦截失败", err);
    }
  }
};
