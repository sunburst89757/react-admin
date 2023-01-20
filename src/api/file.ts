import { myRequest } from "service";
import { PageInfo, ListRes } from "./types";
export type IFile = {
  id: number;
  identifier: string;
  filename: string;
  size: string;
  user: {
    username: string;
  };
  uploadBy: string;
  createdAt: Date;
};
export function getFileList(data: PageInfo & Pick<IFile, "filename">) {
  return myRequest<any, ListRes<IFile[]>>({
    url: "/file/list",
    method: "get",
    data
  });
}

export function downloadFile(data: Pick<IFile, "filename">) {
  return myRequest<any, any>({
    url: "/file/download",
    method: "get",
    responseType: "blob",
    data
  });
}

export function removeFile(id: number) {
  return myRequest<any, any>({
    url: `/file/remove/${id}`,
    method: "delete"
  });
}
