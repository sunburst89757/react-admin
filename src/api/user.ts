import { myRequest } from "../service";
import { Menu } from "./menu";

export interface IUser {
  username: string;
  password: string;
}
export interface Res {
  token: string;
  username: string;
  userId: number;
  roleId: number;
}
export function login(params: IUser) {
  return myRequest<IUser, Res>({
    url: "/user/login",
    params,
    method: "post",
    successMsg: "登录成功"
  });
}
export function getMenuListByRoleId(data: number) {
  return myRequest<IUser, Menu[]>({
    url: `/role/menuList/${data}`,
    method: "get"
  });
}
export function logout() {
  return myRequest({
    url: "/user/logout",
    method: "get",
    successMsg: "退出成功"
  });
}
