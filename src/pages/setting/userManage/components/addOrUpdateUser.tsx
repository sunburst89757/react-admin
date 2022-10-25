import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space
} from "antd";
import { getRoleList, IRoleList } from "api/role";
import { addUser, IUserList, updateUser } from "api/user";
import React, { useEffect, useState } from "react";
const { Option } = Select;
function AddOrUpdateUser({
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
  data?: IUserList;
}) {
  const [form] = Form.useForm<Partial<IUserList>>();
  const [roleInfo, setRoleInfo] = useState<IRoleList[]>();
  const handleSubmit = () => {
    if (type === "add") {
      addUser({ ...form.getFieldsValue() }).then((res) => {
        if (res.success) {
          cb();
          toggle();
        }
      });
    } else {
      updateUser({ ...form.getFieldsValue(), id: data?.id }).then((res) => {
        if (res.success) {
          cb();
          toggle();
        }
      });
    }
  };
  const onChange = (e: RadioChangeEvent) => {
    form.setFieldValue("isValid", e.target.value);
  };
  const handleChange = (val: string) => {
    form.setFieldValue("roleId", val);
  };
  // 不应该使用useEffect,目的是组件重新渲染的时候
  // useEffect(() => {
  //   if (type === "update") {
  //     form.setFieldsValue(data!);
  //   }
  // }, [type, data, form]);
  useEffect(() => {
    getRoleList({
      page: 1,
      pageSize: 10,
      roleName: ""
    }).then((res) => {
      setRoleInfo(res.data.list);
    });
  }, []);
  if (type === "update") {
    console.log("只应该打开表单触发", data);
    form.setFieldsValue(data!);
  }
  return (
    <div>
      <Modal
        title={type === "add" ? "创建用户" : "修改用户信息"}
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
              <Form.Item label="用户名称" name="username">
                <Input placeholder="请输入用户名称"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="用户密码" name="password">
                <Input placeholder="请输入用户密码" type="password"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="用户角色" name="roleId">
                {/* <InputNumber placeholder="请输入用户角色"></InputNumber> */}
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  value={form.getFieldValue("roleId")}
                  onChange={handleChange}
                >
                  {roleInfo?.map((role) => (
                    <Option value={role.id}>{role.roleName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="菜单状态" name="isValid">
                <Radio.Group
                  onChange={onChange}
                  value={form.getFieldValue("isValid")}
                >
                  <Radio value={true}>正常</Radio>
                  <Radio value={false}>禁用</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="用户描述" name="description">
                <Input placeholder="请输入描述信息"></Input>
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

export default React.memo(AddOrUpdateUser);
