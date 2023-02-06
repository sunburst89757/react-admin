import { useEffect, useRef } from "react";

export const useWatch: typeof useEffect = (fn, deps) => {
  const firstRef = useRef(true);
  const fnRef = useRef(fn);
  fnRef.current = fn;
  //   卸载时再进就是第一次了
  useEffect(() => {
    return () => {
      firstRef.current = true;
    };
  }, []);
  // 挂载时不执行
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
    } else {
      fnRef.current();
    }
  }, deps); // eslint-disable-line
};
