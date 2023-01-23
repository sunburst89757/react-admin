import { Layout } from "antd";
import { useState } from "react";
import { MyContent } from "./content/Content";
import { MyHeader } from "./header/Header";
import { MySider } from "./sider/Sider";
export const MyLayout = () => {
  const [isCollapse, setisCollapse] = useState(false);
  const toggle = () => {
    setisCollapse(!isCollapse);
  };
  return (
    <>
      <Layout className="container">
        <MyHeader isCollapse={isCollapse} onClick={toggle}></MyHeader>
        <Layout>
          <MySider isCollapse={isCollapse}></MySider>
          <MyContent></MyContent>
        </Layout>
      </Layout>
    </>
  );
};
