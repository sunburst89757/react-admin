import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { IRoleData } from "api/role";
import React from "react";

function AddOrUpdateRole({
  type,
  isOpen,
  toggle,
  cb,
  data
}: {
  isOpen: boolean;
  toggle: () => void;
  cb: () => void;
  type: "add" | "update";
  data?: IRoleData;
}) {
  const [form] = Form.useForm<IRoleData>();
  const handleSubmit = () => {
    if (type === "add") {
    } else {
    }
  };
  return (
    <Modal
      title={type === "add" ? "添加角色" : "修改角色"}
      open={isOpen}
      footer={null}
      destroyOnClose={true}
      onCancel={() => {
        toggle();
      }}
    >
      <Form form={form} onFinish={handleSubmit} preserve={false}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="名称" name="roleName">
              <Input placeholder="输入菜单名称"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="描述" name="description">
              <Input placeholder="例如: /setting/userManage"></Input>
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
  );
}
export default React.memo(AddOrUpdateRole);
