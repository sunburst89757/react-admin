import { Layout, Menu, MenuProps } from "antd";
import { Icon } from "components/Icon";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  const onClick: MenuProps["onClick"] = (e) => {
    let path = "";
    for (let i = e.keyPath.length - 1; i >= 0; i--) {
      path += `/${e.keyPath[i]}`;
    }
    console.log(path);
    navigate(path);
  };
  const menu = useAppSelector((state) => state.menu.menuBackend);
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
  return (
    <Sider trigger={null} collapsible collapsed={isCollapse}>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["dashboard"]}
        mode="inline"
        items={menuItems}
        theme="dark"
      />
    </Sider>
  );
}
