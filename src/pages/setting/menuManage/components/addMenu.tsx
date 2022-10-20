import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { addMenu, Menu } from "api/menu";
import { useAppDispatch, useAppSelector } from "store/types";
import { generateAuthMenu } from "utils/generateAuthMenu";

export default function AddMenu({
  isOpen,
  toggle
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const [form] = Form.useForm<Partial<Menu>>();
  const { roleId } = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    addMenu({
      ...form.getFieldsValue(),
      sort: Number(form.getFieldValue("sort"))
    }).then(async (res) => {
      if (res.success) {
        // 更新了后端路由也要立即更新权限路由
        await generateAuthMenu(roleId, dispatch, toggle);
      }
    });
  };
  return (
    <div>
      <Modal
        title="添加菜单"
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
