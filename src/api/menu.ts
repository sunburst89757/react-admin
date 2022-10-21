import { myRequest } from "../service";

type requestParams = {
  roleId: number;
};
export interface Menu {
  id: number;
  name: string;
  icon: string;
  path: string;
  sort: number;
  parentId: number;
  isAuth: boolean;
  createdAt: string;
  updatedAt: string;
  children: Menu[] | null;
}

export function getMenuListByRoleId(data: requestParams) {
  return myRequest<requestParams, Menu[]>({
    url: "/menu/list",
    data,
    method: "get"
  });
}

export function addMenu(data: Partial<Menu>) {
  return myRequest<Partial<Menu>, Menu[]>({
    url: "/menu/add",
    data,
    method: "post"
  });
}
