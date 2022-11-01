import { PageInfo, ListRes } from "./types";
import { myRequest } from "service";
export type IRoleData = Pick<IRoleList, "roleName" | "description">;
export type IRoleList = {
  id: number;
  roleName: string;
  description: string;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
};
export type IRoleMenu = {
  roleId: number;
  menuIds: number[];
};
export type IRoleInfo = Pick<IRoleList, "isValid" | "roleName" | "description">;
export function getRoleList(data: IRoleData & PageInfo) {
  return myRequest<any, ListRes<IRoleList[]>>({
    url: "/role/list",
    method: "get",
    data
  });
}

export function updateRoleMenuList(data: IRoleMenu) {
  return myRequest<any, any>({
    url: "/role/updateMenuList",
    method: "post",
    data
  });
}
export function updateRoleInfo(data: IRoleInfo & { id: number }) {
  return myRequest<typeof data, any>({
    url: "/role/updateRoleInfo",
    method: "post",
    data
  });
}

export function createRole(data: IRoleInfo) {
  return myRequest<typeof data, any>({
    url: "/role/addRole",
    method: "post",
    data
  });
}

export function deleteRole(id: number) {
  return myRequest<any, any>({
    url: `/role/delete/${id}`,
    method: "delete",
    successMsg: "删除成功"
  });
}
