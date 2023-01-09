import { myRequest } from "../service";
import { Menu } from "./menu";
import { ListRes, PageInfo } from "./types";

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
export type IUserList = {
  id: number;
  email: string | null;
  username: string;
  password: string;
  avatarUrl: string | null;
  role: {
    roleName: string;
    id: number;
  };
  isValid: boolean;
  description: string | null;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
};
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

export function getUserList(data: { username: string } & PageInfo) {
  return myRequest<any, ListRes<IUserList[]>>({
    url: "/user/list",
    method: "get",
    data
  });
}
export function updateUser(data: Partial<IUserList>) {
  return myRequest<any, any>({
    url: "/user/update",
    method: "post",
    data
  });
}
export function deleteUser(id: number) {
  return myRequest<any, any>({
    url: `/user/delete/${id}`,
    method: "delete"
  });
}
export function addUser(data: Partial<IUserList>) {
  return myRequest<any, any>({
    url: "/user/add",
    method: "post",
    data
  });
}

export function refreshToken(data: { userId: number }) {
  return myRequest<any, { token: string }>({
    url: "/user/refreshToken",
    method: "get",
    data
  });
}
