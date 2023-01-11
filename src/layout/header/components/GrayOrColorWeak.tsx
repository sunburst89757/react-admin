import { Switch } from "antd";
import { useState } from "react";

export const GrayOrColorWeak = () => {
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
};
