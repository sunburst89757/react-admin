import { useCallback, useEffect } from "react";
import { useAppSelector } from "store/types";
import dark from "../style/dark.scss?inline";
export const useTheme = () => {
  const { grayOrColorWeak, isDark, grayColor, colorWeak } = useAppSelector(
    (state) => state.theme
  );
  const changeGrayOrColorWeak = useCallback(() => {
    const body = document.documentElement;
    switch (grayOrColorWeak) {
      case "gray":
        body.setAttribute("style", `filter:grayscale(${grayColor})`);
        break;
      case "colorWeak":
        body.setAttribute("style", `filter:invert(${colorWeak})`);
        break;
      default:
        body.setAttribute("style", "");
        break;
    }
  }, [grayOrColorWeak, grayColor, colorWeak]);
  const changeDark = useCallback(() => {
    if (isDark) {
      const style = document.createElement("style");
      style.id = "dark";
      style.innerHTML = dark;
      let head = document.getElementsByTagName("head")[0];
      head.appendChild(style);
    } else {
      document.getElementById("dark")?.remove();
    }
  }, [isDark]);

  useEffect(() => {
    changeDark();
  }, [isDark, changeDark]);
  useEffect(() => {
    changeGrayOrColorWeak();
  }, [grayOrColorWeak, changeGrayOrColorWeak]);
};
