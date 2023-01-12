import { Switch } from "antd";
import { useState, useEffect, memo } from "react";
import { changeGrayOrColorWeak } from "store/module/theme.strore";
import { useAppDispatch } from "store/types";

export const GrayOrColorWeak = memo(() => {
  const dispatch = useAppDispatch();
  const [isGray, setIsGray] = useState(false);
  const [isColorWeak, setIsColorWeak] = useState(false);
  const changeTheme = (type: "Gray" | "ColorWeak", checked: boolean) => {
    if (type === "Gray") {
      setIsGray(checked);
      if (checked) {
        setIsColorWeak(false);
        dispatch(changeGrayOrColorWeak("gray"));
      }
    } else {
      setIsColorWeak(checked);
      if (checked) {
        setIsGray(false);
        dispatch(changeGrayOrColorWeak("colorWeak"));
      }
    }
  };
  useEffect(() => {
    if (!isGray && !isColorWeak) {
      dispatch(changeGrayOrColorWeak(""));
    }
  }, [isGray, isColorWeak, dispatch]);
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
