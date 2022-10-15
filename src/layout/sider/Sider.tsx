import { Layout } from "antd";
// antd根据配置生成的菜单项
const { Sider } = Layout;
export function MySider({ isCollapse }: { isCollapse: boolean }) {
  return <Sider trigger={null} collapsible collapsed={isCollapse}></Sider>;
}
