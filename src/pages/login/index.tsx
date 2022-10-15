import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Form, Input } from "antd";
import { login } from "api/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "store/module/user.store";
import { useAppDispatch } from "store/types";
import style from "./login.module.scss";
import { userType } from "./types";
export const Login = () => {
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
  useEffect(() => {
    document.title = "登录";
  });
  return (
    <div className="container">
      <div className={style.loginContainer}>
        <div className={style.title}></div>
        <div className={style.middleBlock}>
          <div className={style.leftBlock}></div>
          <div className={style.rightBlock}>
            <div className={style.formTitle}>用户登录</div>
            <Form
              className={style.form}
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
          </div>
        </div>
        <div className={style.copyright}>
          Copyright @ 2022 汉谷云智（武汉）科技有限公司
        </div>
      </div>
    </div>
  );
};
