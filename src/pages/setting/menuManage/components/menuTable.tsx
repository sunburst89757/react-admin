import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { deleteMenu, Menu } from "api/menu";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon/Icon";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/types";
import { generateAuthMenuAndButtons } from "utils/generateAuthMenu";
import { transferTime } from "utils/handleTime";
export type MenuDataType = Pick<
  Menu,
  | "name"
  | "icon"
  | "sort"
  | "createdAt"
  | "updatedAt"
  | "isValid"
  | "id"
  | "path"
>;
export const MenuTable = ({
  dataList,
  loading,
  total,
  onRequest,
  onEdit
}: {
  dataList?: Menu[];
  loading: boolean;
  total: number;
  onRequest: (params?: PageInfo) => void;
  onEdit?: (...args: any[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const roleId = useAppSelector((state) => state.user.userInfo.roleId);
  const columns = useRef<ColumnsType<MenuDataType>>([
    {
      title: "菜单名称",
      dataIndex: "name",
      align: "center",
      key: "name"
    },
    {
      title: "图标",
      key: "icon",
      render: (_, record) => <Icon type={record.icon}></Icon>,
      align: "center"
    },
    {
      title: "路由",
      key: "path",
      dataIndex: "path",
      align: "center"
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      align: "center"
    },
    {
      title: "状态",
      key: "isValid",
      render: (_, record) => (
        <Button type="ghost" size="small">
          {record.isValid ? "正常" : "禁用"}
        </Button>
      ),
      align: "center"
    },
    {
      title: "创建时间",
      render: (record) => transferTime(record.createdAt),
      key: "createdAt",
      align: "center"
    },
    {
      title: "更新时间",
      render: (record) => transferTime(record.updatedAt),
      key: "updatedAt",
      align: "center"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              onEdit && onEdit(record);
            }}
          >
            修改
          </Button>
          <Button
            danger
            onClick={() => {
              onDelete(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
      align: "center"
    }
  ]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 10
  });
  const onChange = (page: number, pageSize: number) => {
    setPageInfo({
      page,
      pageSize
    });
    onRequest({
      page,
      pageSize
    });
  };
  const onDelete = async (id: number) => {
    await deleteMenu(id);
    await generateAuthMenuAndButtons(roleId, dispatch);
    onRequest();
  };

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        dataSource={dataList}
        columns={columns.current}
        size="small"
        bordered
        pagination={{
          position: ["bottomRight"],
          showQuickJumper: true,
          defaultCurrent: 1,
          total: total,
          onChange: onChange,
          pageSize: pageInfo.pageSize,
          pageSizeOptions: [1, 2, 5],
          showSizeChanger: true,
          showTotal: (total) => `总计${total}`
        }}
        loading={loading}
      />
    </>
  );
};
