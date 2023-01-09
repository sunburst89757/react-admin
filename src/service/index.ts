import { config as instanceConfig } from "./config";
import { MyRequest } from "./request/request";
import { RequestConfig } from "./types";
// 完整的接口返回成功的话一般返回以下四个参数
export interface IMyResponse<T = any> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}
// 取出其中的data
// type IRealResponse<T> = Pick<IMyResponse<T>, "data">;
export interface ImyRequest<T = any> extends RequestConfig {
  // RequestConfig里有data，这里再写一次是为了使用传入泛型的方法来约束data类型
  data?: T;
  successMsg?: string;
}
const service = new MyRequest(instanceConfig);
// 该请求方式默认为GET，且一直用data作为参数(条件解决了)；
// T是真正的请求函数发出的参数的类型
// V是请求返回体的data的类型
export function myRequest<T, V = any>(config: ImyRequest<T>) {
  const { method = "GET" } = config;
  // 规范 get/post请求传递的参数 统一API下所有的数据传递都使用data
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return service.request<IMyResponse<V>>(config);
}
