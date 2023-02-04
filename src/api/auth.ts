import { myRequest } from "service";
import { IAuthButtons } from "store/module/auth.store";

export function getAuthButton(roleId: number) {
  return myRequest<any, IAuthButtons>({
    url: `/button/list/${roleId}`,
    method: "get"
  });
}
