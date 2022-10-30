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
export function getRoleList(data: IRoleData & PageInfo) {
  return myRequest<any, ListRes<IRoleList[]>>({
    url: "/role/list",
    method: "get",
    data
  });
}
