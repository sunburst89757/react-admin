import { resetMenu } from "store/module/menu.store";
import { resetUser } from "store/module/user.store";
import { useAppDispatch } from "store/types";

export const useReset = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(resetMenu());
    dispatch(resetUser());
  };
};
