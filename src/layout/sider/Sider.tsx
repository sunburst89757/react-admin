import { useUpdateEffect } from "ahooks";
import { Layout, Menu, MenuProps } from "antd";
import { Icon } from "components/Icon";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "store/types";
// antd根据配置生成的菜单项
const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}
export function MySider({ isCollapse }: { isCollapse: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const [selectKey, setselectKey] = useState("dashboard");
  const [openKey, setopenKey] = useState("dashboard");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e);
    let path = "";
    for (let i = e.keyPath.length - 1; i >= 0; i--) {
      path += `/${e.keyPath[i]}`;
    }
    navigate(path);
  };
  const menuItems = useMemo(() => {
    return menu.map((item) => {
      if (item.children) {
        return getItem(
          item.name,
          item.path,
          <Icon type={item.icon}></Icon>,
          item.children.map((child) =>
            getItem(child.name, child.path, <Icon type={child.icon}></Icon>)
          )
        );
      }
      return getItem(item.name, item.path, <Icon type={item.icon}></Icon>);
    });
  }, [menu]);
  const onOpenChange = (key: string[]) => {
    setopenKey(key[key.length - 1]);
  };
  useUpdateEffect(() => {
    const urlArr = location.pathname.split("/");
    if (urlArr.length === 2) {
      setopenKey(urlArr[urlArr.length - 1]);
    } else {
      setopenKey(urlArr[urlArr.length - 2]);
    }
    setselectKey(urlArr[urlArr.length - 1]);
  }, [location.pathname]);
  return (
    <Sider trigger={null} collapsible collapsed={isCollapse}>
      <Menu
        onClick={onClick}
        mode="inline"
        items={menuItems}
        theme="dark"
        selectedKeys={[selectKey]}
        openKeys={[openKey]}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
}
