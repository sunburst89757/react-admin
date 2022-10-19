import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { addMenu, Menu } from "api/menu";

export default function AddMenu({
  isOpen,
  toggle
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const [form] = Form.useForm<Partial<Menu>>();
  const handleSubmit = () => {
    addMenu({
      ...form.getFieldsValue(),
      sort: Number(form.getFieldValue("sort"))
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Modal title="添加菜单" open={isOpen} footer={null}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="菜单名称" name="name">
                <Input placeholder="输入菜单名称"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="菜单路径" name="path">
                <Input placeholder="例如: /setting/userManage"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="菜单Icon" name="icon">
                <Input placeholder="输入菜单UI"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="菜单排序" name="sort">
                <Input placeholder="输入菜单排序如1、2"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} offset={16}>
              <Form.Item>
                <Space>
                  <Button
                    onClick={() => {
                      toggle();
                    }}
                  >
                    取消
                  </Button>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
