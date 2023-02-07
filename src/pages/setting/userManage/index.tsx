import { useRequest, useToggle } from "ahooks";
import { Button } from "antd";
import { PageInfo } from "api/types";
import { getUserList, IUserList } from "api/user";
import { Icon } from "components/Icon/Icon";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useMount } from "hooks/useMount";
import { useRef, useState } from "react";
import AddOrUpdateUser from "./components/addOrUpdateUser";
import { UserForm } from "./components/form";
import { UserTable } from "./components/table";

export default function UserManage() {
  // 表格状态
  const [dataList, setDataList] = useState<IUserList[]>();
  const [total, setTotal] = useState(0);
  // 新增 修改状态
  const type = useRef<"add" | "update">("add");
  const [isOpen, { toggle }] = useToggle(false);
  const rowData = useRef<IUserList>();
  // 表格调用修改
  const editRecord = (parmas: IUserList) => {
    type.current = "update";
    rowData.current = parmas;
    toggle();
  };
  // 请求参数
  const queryParams = useRef<PageInfo & { username: string }>({
    page: 1,
    pageSize: 10,
    username: ""
  });
  const { run: getDataList, loading } = useRequest(getUserList, {
    manual: true,
    onSuccess: (res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
    }
  });
  const onRequest = (params?: { username: string } | PageInfo) => {
    queryParams.current = {
      ...queryParams.current,
      ...params
    };
    getDataList(queryParams.current);
  };
  useMount(() => {
    onRequest();
  });
  return (
    <MainLayout>
      <>
        <UserForm<{ username: string }> onRequest={onRequest}></UserForm>
        <Button
          type="primary"
          icon={<Icon type="icon-add" />}
          onClick={() => {
            type.current = "add";
            toggle();
          }}
          className=" mb-5"
        >
          添加
        </Button>
        <AddOrUpdateUser
          type={type.current}
          isOpen={isOpen}
          toggle={toggle}
          cb={() => {
            onRequest();
          }}
          data={rowData.current}
        ></AddOrUpdateUser>
        <UserTable
          loading={loading}
          total={total}
          dataList={dataList}
          onRequest={onRequest}
          cb={editRecord}
        ></UserTable>
      </>
    </MainLayout>
  );
}
