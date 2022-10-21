import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const NotAuth: React.FC = () => {
  debugger;
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="当前页面无授权"
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
