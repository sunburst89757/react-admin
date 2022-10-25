import { PageInfo, ListRes } from "./types";
import { myRequest } from "service";
export type IRole = PageInfo & { roleName: string };
export type IRoleList = {
  id: number;
  roleName: string;
  createdAt: string;
  updatedAt: string;
};
export function getRoleList(data: IRole) {
  return myRequest<IRole, ListRes<IRoleList[]>>({
    url: "/role/list",
    method: "get",
    data
  });
}
