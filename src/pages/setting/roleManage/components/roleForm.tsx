import { Button, Col, Form, Input, Row, Space } from "antd";
import { Icon } from "components/Icon/Icon";

export const RoleForm = <FormInfo,>({
  onRequest
}: {
  onRequest: (params: FormInfo) => void;
}) => {
  const [form] = Form.useForm<FormInfo>();
  const onReset = () => {
    const formInfo = form.getFieldsValue();
    onRequest(formInfo);
  };
  const onFinish = () => {
    const formInfo = form.getFieldsValue();
    onRequest(formInfo);
  };
  return (
    <>
      <Form form={form} onReset={onReset} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="角色名称" name="roleName">
              <Input placeholder="请输入用户名"></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  icon={<Icon type="icon-chaxun" />}
                  htmlType="submit"
                >
                  查询
                </Button>
                <Button
                  type="primary"
                  icon={<Icon type="icon-reset" />}
                  htmlType="reset"
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
