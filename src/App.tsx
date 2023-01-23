import { ConfigProvider } from "antd";
import { useTheme } from "hooks/useTheme";
import { RouterProvider } from "react-router-dom";
import { useAppSelector } from "store/types";
import "./App.css";
import router from "./router";
function App() {
  const size = useAppSelector((state) => state.theme.size);
  // 主题使用
  useTheme();
  return (
    <div className="container">
      <ConfigProvider componentSize={size}>
        <RouterProvider router={router}></RouterProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
