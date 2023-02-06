import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="系统错误"
      subTitle="出错啦！，请退出当前页面并联系管理员"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          返回
        </Button>
      }
    />
  );
};
