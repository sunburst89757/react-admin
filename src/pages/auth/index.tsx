import { Button, Space } from "antd";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useAuthButtons } from "hooks/useAuthButtons";

export default function AuthTest() {
  const { auth } = useAuthButtons();
  console.log(auth, "是啥");

  return (
    <MainLayout>
      <>
        <Space>
          {auth.includes("edit") && (
            <Button type="primary">管理员才可以看到</Button>
          )}
          {auth.includes("add") && (
            <Button type="primary">管理员和test用户都可以看到</Button>
          )}
        </Space>
      </>
    </MainLayout>
  );
}
