import { Button } from "antd";
import { Icon } from "components/Icon/Icon";
import { memo, useState } from "react";
import { ChromePicker } from "react-color";
import {
  changeThemeColor,
  initialThemeColor,
  resetThemeColor
} from "store/module/theme.strore";
import { useAppDispatch } from "store/types";
export const CustomTheme = memo(() => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState(initialThemeColor);
  const onColorChange = (nextColor: Partial<typeof color>) => {
    const mergedNextColor = {
      ...color,
      ...nextColor
    };
    setColor(mergedNextColor);
    dispatch(changeThemeColor(mergedNextColor));
  };
  const reset = () => {
    dispatch(resetThemeColor());
    setColor(initialThemeColor);
  };
  return (
    <>
      <Button type="primary" icon={<Icon type="icon-reset" />} onClick={reset}>
        重置主题色
      </Button>
      {Object.keys(color).map((type) => {
        return (
          <div key={type} className="flex justify-center align-center flex-col">
            <span className="mb-2">{type}</span>
            <ChromePicker
              disableAlpha
              className="mb-1"
              color={color[`${type as keyof typeof color}`]}
              onChangeComplete={({ hex }) => {
                onColorChange({ [type]: hex });
              }}
            ></ChromePicker>
          </div>
        );
      })}
    </>
  );
});
