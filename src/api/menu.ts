import { myRequest } from "../service";
import { ListRes, PageInfo } from "./types";
/**
 * @description 通用菜单信息
 */

export interface Menu {
  id: number;
  name: string;
  icon: string;
  path: string;
  sort: number;
  parentId: number;
  isAuth: boolean;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
  children: Menu[] | null;
}
export type IQueryMenu = {
  path: string;
  name: string;
} & PageInfo;
export function addMenu(data: Partial<Menu>) {
  return myRequest<Partial<Menu>, Menu[]>({
    url: "/menu/add",
    data,
    method: "post"
  });
}

export function getMenuList(data: IQueryMenu) {
  return myRequest<any, ListRes<Menu[]>>({
    url: `/menu/list`,
    method: "get",
    data
  });
}
