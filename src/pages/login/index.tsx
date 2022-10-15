import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dash");
  };
  return (
    <div className="container">
      login component
      <button onClick={handleClick}>跳转</button>
    </div>
  );
};
