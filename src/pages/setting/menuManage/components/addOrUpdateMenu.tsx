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
import { addMenu, editMenu, Menu } from "api/menu";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/types";
import { generateAuthMenuAndButtons } from "utils/generateAuthMenu";
import { MenuDataType } from "./menuTable";

function AddOrUpdateMenu({
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
  data?: MenuDataType;
}) {
  const [form] = Form.useForm<Partial<Menu>>();
  const { roleId } = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (type === "add") {
      addMenu({
        ...form.getFieldsValue(),
        sort: Number(form.getFieldValue("sort"))
      }).then(async (res) => {
        if (res.success) {
          // 更新了后端路由也要立即更新权限路由
          await generateAuthMenuAndButtons(roleId, dispatch);
          toggle();
          cb();
        }
      });
    } else {
      editMenu({
        id: data?.id,
        ...form.getFieldsValue(),
        sort: Number(form.getFieldValue("sort"))
      }).then(async (res) => {
        if (res.success) {
          // 更新了后端路由也要立即更新权限路由
          await generateAuthMenuAndButtons(roleId, dispatch);
          toggle();
          cb();
        }
      });
    }
  };
  const onChange = (e: RadioChangeEvent) => {
    form.setFieldValue("isValid", e.target.value);
  };
  // 不应该使用useEffect,目的是组件重新渲染的时候
  // useEffect(() => {
  //   if (type === "update") {
  //     form.setFieldsValue(data!);
  //   }
  // }, [type, data, form]);
  if (type === "update") {
    console.log("只应该打开表单触发");
    form.setFieldsValue(data!);
  }
  return (
    <div>
      <Modal
        title={type === "add" ? "添加菜单" : "修改菜单"}
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
          {type === "update" && (
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
          )}
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

export default React.memo(AddOrUpdateMenu);
