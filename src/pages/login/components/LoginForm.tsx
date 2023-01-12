import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "store/module/user.store";
import { useAppDispatch } from "store/types";
import { login } from "api/user";
import { userType } from "../types";
export const LoginForm = () => {
  const [form] = Form.useForm<userType>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { runAsync: hanleLogin } = useRequest(login, {
    manual: true
  });
  const onFinish = () => {
    const { username, password } = form.getFieldsValue();
    hanleLogin({ username, password }).then((res) => {
      if (res.success) {
        navigate("/dashboard");
        dispatch(updateUserInfo(res.data));
      }
    });
  };
  return (
    <>
      <Form
        // className="absolute top-[20%] left-[50%] w-[80%] translate-x-1/2 translate-y-1/2"
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
