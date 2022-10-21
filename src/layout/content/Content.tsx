import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MyTag } from "./components/Tag";

import style from "./Content.module.scss";
const { Content } = Layout;
export function MyContent() {
  return (
    <Content className="container">
      <MyTag></MyTag>
      <div className={style.container}>
        <Outlet></Outlet>
      </div>
    </Content>
  );
}
