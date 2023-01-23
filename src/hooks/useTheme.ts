import { ConfigProvider } from "antd";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "store/types";
import darkTheme from "../style/dark.scss?inline";
import defaultTheme from "../style/default.scss?inline";
export const useTheme = () => {
  const { grayOrColorWeak, isDark, grayColor, colorWeak, themeColor } =
    useAppSelector((state) => state.theme);
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
    document.getElementById("theme")?.remove();
    const style = document.createElement("style");
    style.id = "theme";
    style.innerHTML = isDark ? darkTheme : defaultTheme;
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
  }, [isDark]);
  const changeThemeColor = useCallback(() => {
    ConfigProvider.config({
      theme: themeColor
    });
  }, [themeColor]);
  useEffect(() => {
    changeDark();
  }, [isDark, changeDark]);
  useEffect(() => {
    changeGrayOrColorWeak();
  }, [grayOrColorWeak, changeGrayOrColorWeak]);
  useEffect(() => {
    changeThemeColor();
  }, [changeThemeColor, themeColor]);
};
