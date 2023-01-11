import { Switch } from "antd";
import { useState, useEffect, memo } from "react";

export const GrayOrColorWeak = memo(() => {
  const [isGray, setIsGray] = useState(false);
  const [isColorWeak, setIsColorWeak] = useState(false);
  const changeTheme = (type: "Gray" | "ColorWeak", checked: boolean) => {
    if (type === "Gray") {
      setIsGray(checked);
      checked && setIsColorWeak(false);
    } else {
      setIsColorWeak(checked);
      checked && setIsGray(false);
    }
  };
  useEffect(() => {
    const body = document.documentElement;
    if (isGray) body.setAttribute("style", "filter:grayscale(1)");
    else if (isColorWeak) body.setAttribute("style", "filter:invert(80%)");
    else body.setAttribute("style", "");
  }, [isGray, isColorWeak]);
  return (
    <>
      <div className="flex justify-between items-center">
        <span> 色弱模式</span>
        <Switch
          checked={isColorWeak}
          onClick={(checked) => {
            changeTheme("ColorWeak", checked);
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span> 灰色模式</span>
        <Switch
          checked={isGray}
          onClick={(checked) => {
            changeTheme("Gray", checked);
          }}
        />
      </div>
    </>
  );
});
