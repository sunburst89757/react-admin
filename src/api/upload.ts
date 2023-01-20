import { myRequest } from "service";

type Merge = {
  identifier: string;
  filename: string;
  size: string;
  uploadBy: number;
};
export function merge(data: Merge) {
  return myRequest({
    url: "/upload/merge",
    data,
    method: "post"
  });
}
