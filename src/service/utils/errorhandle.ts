import { message } from "antd";
import { HttpErrorStatus } from "enum/httpEnum";

export const errorHandle = (code: number, msg?: string) => {
  message.error(msg || HttpErrorStatus[code]);
  return Promise.reject(new Error(msg || "Error"));
};
