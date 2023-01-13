import { Switch } from "antd";
import { useState } from "react";
import { changeCompact } from "store/module/theme.strore";
import { useAppDispatch, useAppSelector } from "store/types";

export const Compact = () => {
  const dispatch = useAppDispatch();
  const { size } = useAppSelector((state) => state.theme);
  const [checked, setChecked] = useState(size === "small" ? true : false);
  const onClick = (checked: boolean) => {
    setChecked(checked);
    dispatch(changeCompact(checked ? "small" : "middle"));
  };
  return (
    <>
      <Switch checked={checked} onClick={onClick} />
    </>
  );
};
