import { Switch } from "antd";
import { Icon } from "./Icon";

export const DarkMode = () => {
  return (
    <>
      <Switch
        checkedChildren={<Icon type="icon-moon1"></Icon>}
        unCheckedChildren={<Icon type="icon-sun"></Icon>}
        defaultChecked
      />
    </>
  );
};
