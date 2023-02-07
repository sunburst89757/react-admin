import { useRequest, useToggle } from "ahooks";
import { Button } from "antd";
import { Menu } from "api/menu";
import { getMenuList as queryMenuList } from "api/menu";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon/Icon";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useMount } from "hooks/useMount";
import { useRef, useState } from "react";
import AddOrUpdateMenu from "./components/addOrUpdateMenu";
import { MenuDataType, MenuTable } from "./components/menuTable";
import { MenuTree } from "./components/menuTree";

export default function MenuManage() {
  const [isOpen, { toggle }] = useToggle(false);
  const [type, setType] = useState<"add" | "update">("add");
  const rowData = useRef<MenuDataType>();
  const onEdit = (params: MenuDataType) => {
    rowData.current = params;
    setType("update");
    toggle();
  };

  // 查询参数
  const queryParmas = useRef<
    {
      id: number;
    } & PageInfo
  >({
    id: 0,
    page: 1,
    pageSize: 10
  });
  // table状态
  const [dataList, setdataList] = useState<Menu[]>();
  const [total, setTotal] = useState<number>(10);
  const { run: getDataList, loading } = useRequest(queryMenuList, {
    manual: true,
    onSuccess: (res) => {
      setdataList(res.data.list);
      setTotal(res.data.total);
    }
  });

  const onRequest = (params?: PageInfo | { id: number }) => {
    queryParmas.current = {
      ...queryParmas.current,
      ...params
    };
    getDataList(queryParmas.current);
  };

  useMount(() => {
    onRequest();
  });

  return (
    <>
      <MenuTree onRequest={onRequest}></MenuTree>
      <MainLayout>
        <>
          <Button
            type="primary"
            icon={<Icon type="icon-add" />}
            className=" mb-5"
            onClick={() => {
              setType("add");
              toggle();
            }}
          >
            添加
          </Button>
          <AddOrUpdateMenu
            type={type}
            isOpen={isOpen}
            toggle={toggle}
            data={rowData.current}
            cb={onRequest}
          ></AddOrUpdateMenu>
          <MenuTable
            dataList={dataList}
            onRequest={onRequest}
            loading={loading}
            total={total}
            onEdit={onEdit}
          ></MenuTable>
        </>
      </MainLayout>
    </>
  );
}
