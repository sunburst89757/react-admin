import { Layout, Menu, MenuProps } from "antd";
import { Icon } from "components/Icon/Icon";
import { useMemo, useState, useEffect } from "react";
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
function getOpenAndSeletKey(pathname: string) {
  const urlArr = pathname.split("/");
  let openKey = "";
  const selectKey = urlArr[urlArr.length - 1];
  if (urlArr.length === 2) {
    openKey = urlArr[urlArr.length - 1];
  } else {
    openKey = urlArr[urlArr.length - 2];
  }
  return {
    openKey,
    selectKey
  };
}
export function MySider({ isCollapse }: { isCollapse: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const [openAndSeletKey, setOpenAndSelectKey] = useState({
    openKey: "",
    selectKey: ""
  });
  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e);
    let path = "";
    for (let i = e.keyPath.length - 1; i >= 0; i--) {
      path += `/${e.keyPath[i]}`;
    }
    navigateTo(path);
  };
  const navigateTo = (path: string) => {
    if (path === "/github") {
      window.location.href = "https://github.com/sunburst89757/react-admin";
    } else if (path === "/blog") {
      window.location.href = "https://sunburst89757.github.io/";
    } else {
      navigate(path);
    }
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
    setOpenAndSelectKey({
      ...openAndSeletKey,
      openKey: key[key.length - 1]
    });
  };
  useEffect(() => {
    const openAndSelectKey = getOpenAndSeletKey(location.pathname);
    setOpenAndSelectKey(openAndSelectKey);
  }, [location.pathname]);
  return (
    <Sider trigger={null} collapsible collapsed={isCollapse}>
      <Menu
        onClick={onClick}
        mode="inline"
        items={menuItems}
        theme="dark"
        selectedKeys={[openAndSeletKey.selectKey]}
        openKeys={[openAndSeletKey.openKey]}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
}
