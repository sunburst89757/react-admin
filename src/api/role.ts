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
export type IRoleDetail = {
  roleId: number;
  menuIds: number[];
};
export function getRoleList(data: IRoleData & PageInfo) {
  return myRequest<any, ListRes<IRoleList[]>>({
    url: "/role/list",
    method: "get",
    data
  });
}

export function updateRoleMenuList(data: IRoleDetail) {
  return myRequest<any, any>({
    url: "/role/updateMenuList",
    method: "post",
    data
  });
}
