import { Divider, Drawer } from "antd";
import { DarkMode } from "components/DarkMode/DarkMode";
import { Icon } from "components/Icon/Icon";
import { useState } from "react";
import { Compact } from "./Compact";
import { GrayOrColorWeak } from "./GrayOrColorWeak";
export const Theme = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={showDrawer}>
        <Icon type="icon-theme1" className="cursor-pointer"></Icon>
      </div>
      <Drawer title="主题设置" placement="right" onClose={onClose} open={open}>
        <Divider>默认主题</Divider>
        <div className="[&>div]:mb-8">
          <div className="flex justify-between items-center">
            <span> 暗黑模式</span>
            <DarkMode />
          </div>
          <GrayOrColorWeak />
          <div className="flex justify-between items-center">
            <span> 紧凑模式</span>
            <Compact />
          </div>
        </div>
        <Divider>定制主题</Divider>
      </Drawer>
    </>
  );
};
