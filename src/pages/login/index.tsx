import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dash");
  };
  return (
    <div className="container">
      login component
      <Button onClick={handleClick} type="primary">
        跳转
      </Button>
    </div>
  );
};
