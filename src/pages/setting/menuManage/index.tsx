import { useToggle } from "ahooks";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { Icon } from "components/Icon";
import AddMenu from "./components/addMenu";

export default function MenuManage() {
  const [form] = Form.useForm();
  const [isOpen, { toggle }] = useToggle(false);
  return (
    <div className="pageContainer">
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
    </div>
  );
}
