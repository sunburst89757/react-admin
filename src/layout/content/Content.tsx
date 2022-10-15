import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import style from "./Content.module.scss";
const { Content } = Layout;
export function MyContent() {
  return (
    <Content className={style.container}>
      <Outlet></Outlet>
    </Content>
  );
}
