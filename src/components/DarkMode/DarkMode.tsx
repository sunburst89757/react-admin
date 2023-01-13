import { Switch } from "antd";
import { memo, useState } from "react";
import { Icon } from "../Icon/Icon";
import { useAppDispatch, useAppSelector } from "store/types";
import { changeDark } from "store/module/theme.strore";
export const DarkMode = memo(() => {
  const { isDark } = useAppSelector((state) => state.theme);
  const [checked, setChecked] = useState(isDark);
  const dispatch = useAppDispatch();
  const onClick = (checked: boolean) => {
    setChecked(checked);
    dispatch(changeDark());
  };
  return (
    <>
      <Switch
        checkedChildren={<Icon type="icon-moon1"></Icon>}
        unCheckedChildren={<Icon type="icon-sun"></Icon>}
        checked={checked}
        onClick={onClick}
      />
    </>
  );
});
