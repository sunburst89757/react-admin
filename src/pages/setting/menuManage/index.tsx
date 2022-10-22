import { useToggle } from "ahooks";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { DataNode } from "antd/lib/tree";
import { Icon } from "components/Icon";
import { LayoutTree } from "components/LayoutTree";
import { MainLayout } from "components/MainLayout";
import { MyTree } from "components/MyTree";
import { useMemo } from "react";
import { useAppSelector } from "store/types";
import AddMenu from "./components/addMenu";

export default function MenuManage() {
  const [form] = Form.useForm();
  const [isOpen, { toggle }] = useToggle(false);
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const treeData = useMemo(() => {
    const tree: DataNode[] = [];
    menu.forEach((route) => {
      const children: DataNode[] = [];
      if (route.children) {
        route.children.forEach((childRoute) => {
          const obj: DataNode = {
            title: childRoute.name,
            key: childRoute.path
          };
          children.push(obj);
        });
      }
      const obj: DataNode = {
        title: route.name,
        key: route.path
      };
      children.length > 0 && (obj.children = children);
      tree.push(obj);
    });
    return tree;
  }, [menu]);
  const clickNode = (node: DataNode) => {
    console.log(node);
  };
  return (
    <div className="pageContainer">
      <LayoutTree>
        <MyTree treeData={treeData} clickNode={clickNode}></MyTree>
      </LayoutTree>
      <MainLayout>
        <>
          <Form form={form}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="菜单名称" name="menuName">
                  <Input placeholder="输入菜单名称"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Space>
                    <Button type="primary" icon={<Icon type="icon-chaxun" />}>
                      查询
                    </Button>
                    <Button type="primary" icon={<Icon type="icon-reset" />}>
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<Icon type="icon-add" />}
                    onClick={() => {
                      toggle();
                    }}
                  >
                    添加
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <AddMenu isOpen={isOpen} toggle={toggle}></AddMenu>
        </>
      </MainLayout>
    </div>
  );
}
