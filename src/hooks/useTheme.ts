import { useAppSelector } from "store/types";
import dark from "../style/dark.scss?inline";
export const useTheme = () => {
  console.log("执行");
  const { grayOrColorWeak, isDark, grayColor, colorWeak } = useAppSelector(
    (state) => state.theme
  );
  const changeGrayOrColorWeak = () => {
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
  };
  const changeDark = () => {
    const darkEle = document.getElementById("dark");
    if (isDark && !darkEle) {
      const style = document.createElement("style");
      style.id = "dark";
      style.innerHTML = dark;
      let head = document.getElementsByTagName("head")[0];
      head.appendChild(style);
    } else {
      darkEle?.remove();
    }
  };
  changeGrayOrColorWeak();
  changeDark();
};
