import { useEffect, useRef } from "react";

export const useUnMount = (fn: () => void) => {
  // 获取最新的fn 引用 避免前面的多次render造成fn的引用丢失
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    return () => {
      fnRef.current();
    };
  }, []);
};
