import { useRequest, useToggle } from "ahooks";
import { Button } from "antd";
import { getRoleList, IRoleData, IRoleList } from "api/role";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon/Icon";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useMount } from "hooks/useMount";
import { useRef, useState } from "react";
import AddOrUpdateRole from "./components/addOrUpdateRole";
import Authorization from "./components/authorization";
import { RoleForm } from "./components/roleForm";
import { RoleTable } from "./components/roleTable";
export default function RoleManage() {
  // 表格数据
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState<IRoleList[]>();
  // 一行表格的数据
  const rowData = useRef<IRoleList>();
  const onEdit = (data: IRoleList) => {
    rowData.current = data;
    type.current = "update";
    toggle();
  };
  const rowId = useRef(1);
  const onAuth = (data: number) => {
    rowId.current = data;
    toggleShow();
  };
  // 修改 新增
  const type = useRef<"add" | "update">("add");
  const [isOpen, { toggle }] = useToggle(false);
  // 授权
  const [isShow, { toggle: toggleShow }] = useToggle(false);
  // 请求参数
  const queryParams = useRef<PageInfo & IRoleData>({
    page: 1,
    pageSize: 10,
    roleName: "",
    description: ""
  });
  const { loading, run: getDataList } = useRequest(getRoleList, {
    manual: true,
    onSuccess: (res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
    }
  });
  const onRequest = (params?: { roleName: string } | PageInfo) => {
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
        <RoleForm<{ roleName: string }> onRequest={onRequest}></RoleForm>
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
        <AddOrUpdateRole
          type={type.current}
          isOpen={isOpen}
          toggle={toggle}
          cb={onRequest}
          data={rowData.current}
        ></AddOrUpdateRole>
        <RoleTable
          dataList={dataList}
          loading={loading}
          total={total}
          onRequest={onRequest}
          onAuth={onAuth}
          onEdit={onEdit}
        ></RoleTable>
        <Authorization
          open={isShow}
          toggle={toggleShow}
          roleId={rowId.current}
        ></Authorization>
      </>
    </MainLayout>
  );
}
