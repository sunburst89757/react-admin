import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Space
} from "antd";
import { IRoleList, createRole, IRoleInfo, updateRoleInfo } from "api/role";
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
  data?: IRoleList;
}) {
  const [form] = Form.useForm<IRoleInfo>();
  const onChange = (e: RadioChangeEvent) => {
    form.setFieldValue("isValid", e.target.value);
  };
  const handleSubmit = () => {
    if (type === "add") {
      createRole(form.getFieldsValue()).then((res) => {
        if (res.success) {
          toggle();
          cb();
        }
      });
    } else {
      updateRoleInfo({ ...form.getFieldsValue(), id: data?.id! }).then(
        (res) => {
          if (res.success) {
            toggle();
            cb();
          }
        }
      );
    }
  };
  if (type === "update") {
    console.log("只应该打开表单触发");
    form.setFieldsValue(data!);
  }
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
              <Input placeholder="输入角色名称"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="描述" name="description">
              <Input placeholder="输入角色描述信息"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="角色状态" name="isValid">
              <Radio.Group
                onChange={onChange}
                defaultValue={true}
                value={form.getFieldValue("isValid")}
              >
                <Radio value={true}>正常</Radio>
                <Radio value={false}>禁用</Radio>
              </Radio.Group>
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
