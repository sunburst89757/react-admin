import { Button } from "antd";
import { getMenuList } from "api/menu";
import { merge } from "api/upload";
import { getUserList } from "api/user";
import { MainLayout } from "components/MainLayout/MainLayout";

export default function Dashboard() {
  const onClick = () => {
    // getUserList({ page: 1, pageSize: 10, username: "" }).then((res) => {
    //   console.log(res.data);
    // });
    // getMenuList({ page: 1, pageSize: 10, id: 1 }).then((res) => {
    //   console.log(res.data);
    // });
    merge({ identifier: "13603053-1999-2009", filename: "hhhh" });
  };
  return (
    <MainLayout>
      <>
        <Button onClick={onClick} type="primary">
          测试
        </Button>
      </>
    </MainLayout>
  );
}
