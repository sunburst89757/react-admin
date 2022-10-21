import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="你访问的页面不存在"
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
