import { myRequest } from "../service";

export interface requestParams {
  username: string;
  password: string;
}
export interface Res {
  token: string;
  username: string;
  userId: number;
  roleId: number;
}
export function login(params: requestParams) {
  return myRequest<requestParams, Res>({
    url: "/user/login",
    params,
    method: "post",
    successMsg: "登录成功"
  });
}
export function logout() {
  return myRequest({
    url: "/user/logout",
    method: "get",
    successMsg: "退出成功"
  });
}
