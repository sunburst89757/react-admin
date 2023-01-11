import { Switch } from "antd";
import { memo, useEffect, useState } from "react";
import { Icon } from "./Icon";
import dark from "../style/dark.scss?inline";
export const DarkMode = memo(() => {
  const [checked, setChecked] = useState(false);
  const onClick = (checked: boolean) => {
    setChecked(checked);
  };
  useEffect(() => {
    if (checked) {
      const style = document.createElement("style");
      style.id = "dark";
      style.innerHTML = dark;
      let head = document.getElementsByTagName("head")[0];
      head.appendChild(style);
    } else {
      document.getElementById("dark")?.remove();
    }
  }, [checked]);
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
