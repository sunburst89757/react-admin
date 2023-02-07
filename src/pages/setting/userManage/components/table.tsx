import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PageInfo } from "api/types";
import { deleteUser, IUserList } from "api/user";
import { useRef, useState } from "react";
import { transferTime } from "utils/handleTime";

export const UserTable = ({
  dataList,
  loading,
  total,
  onRequest,
  cb
}: {
  dataList?: IUserList[];
  loading: boolean;
  total: number;
  onRequest: (params?: PageInfo) => void;
  cb?: (...args: any[]) => void;
}) => {
  const columns = useRef<ColumnsType<IUserList>>([
    {
      title: "用户名称",
      dataIndex: "username",
      align: "center",
      key: "username"
    },
    {
      title: "角色",
      key: "roleName",
      render: (_, record) => record.role.roleName,
      align: "center"
    },
    {
      title: "状态",
      render: (_, record) => (
        <Button type="ghost" size="small">
          {record.isValid ? "正常" : "禁用"}
        </Button>
      ),
      key: "isValid",
      align: "center"
    },
    {
      title: "描述",
      key: "description",
      dataIndex: "description",
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
              cb && cb(record);
            }}
          >
            修改
          </Button>
          <Button
            danger
            onClick={async () => {
              await deleteUser(record.id);
              onRequest();
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
  return (
    <>
      <Table
        dataSource={dataList}
        columns={columns.current}
        size="small"
        bordered
        rowKey={(record) => record.id}
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
