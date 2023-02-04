import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "store/types";

export const useAuthButtons = () => {
  const { pathname } = useLocation();
  const { authButtons } = useAppSelector((state) => state.auth);
  const res = useMemo(
    () => authButtons.filter((item) => item.pathname === pathname),
    [authButtons, pathname]
  );

  const [authArr] = useState(res[0]);
  return authArr;
};
