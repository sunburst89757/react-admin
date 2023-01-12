import { Switch } from "antd";
import { memo, useState } from "react";
import { Icon } from "../Icon/Icon";
import { useAppDispatch } from "store/types";
import { changeDark } from "store/module/theme.strore";
export const DarkMode = memo(() => {
  const [checked, setChecked] = useState(false);
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
