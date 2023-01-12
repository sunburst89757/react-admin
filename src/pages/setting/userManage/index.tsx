import { useRequest, useToggle } from "ahooks";
import { Button, Col, Form, Input, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PageInfo } from "api/types";
import { deleteUser, getUserList, IUserList } from "api/user";
import { Icon } from "components/Icon/Icon";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useCallback, useEffect, useRef, useState } from "react";
import { transferTime } from "utils/handleTime";
import AddOrUpdateUser from "./components/addOrUpdateUser";

export default function UserManage() {
  const [form] = Form.useForm<{ name: string }>();
  const [dataList, setDataList] = useState<IUserList[]>();
  const [total, setTotal] = useState(0);
  const type = useRef<"add" | "update">("add");
  const { run, loading } = useRequest(getUserList, {
    manual: true,
    onSuccess: (res) => {
      const { page, pageSize } = res.data;
      setDataList(res.data.list);
      setPageInfo({
        page,
        pageSize
      });
      setTotal(res.data.total);
    }
  });
  const [isOpen, { toggle }] = useToggle(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 10
  });
  const queryParams = useRef<PageInfo & { username: string }>({
    ...pageInfo,
    username: ""
  });
  const queryUserList = useCallback(() => {
    run(queryParams.current);
  }, [run]);
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
              type.current = "update";
              toggle();
              rowData.current = record;
            }}
          >
            修改
          </Button>
          <Button
            danger
            onClick={async () => {
              await deleteUser(record.id);
              queryUserList();
            }}
          >
            删除
          </Button>
        </Space>
      ),
      align: "center"
    }
  ]);
  const rowData = useRef<IUserList>();
  const onChange = useCallback((page: number, pageSize: number) => {
    queryParams.current.page = page;
    queryParams.current.pageSize = pageSize;
    setPageInfo({
      page,
      pageSize
    });
  }, []);
  const onReset = useCallback(() => {
    queryParams.current.username = "";
    queryUserList();
    console.log("重置");
  }, [queryUserList]);
  const onFinish = useCallback(() => {
    queryParams.current.username = form.getFieldValue("username");
    queryUserList();
  }, [queryUserList, form]);

  useEffect(() => {
    queryUserList();
  }, [queryUserList]);
  return (
    <MainLayout>
      <>
        <Form form={form} onReset={onReset} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="用户名称" name="username">
                <Input placeholder="请输入用户名"></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    icon={<Icon type="icon-chaxun" />}
                    htmlType="submit"
                  >
                    查询
                  </Button>
                  <Button
                    type="primary"
                    icon={<Icon type="icon-reset" />}
                    htmlType="reset"
                  >
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<Icon type="icon-add" />}
                  onClick={() => {
                    type.current = "add";
                    toggle();
                  }}
                >
                  添加
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <AddOrUpdateUser
          type={type.current}
          isOpen={isOpen}
          toggle={toggle}
          cb={queryUserList}
          data={rowData.current}
        ></AddOrUpdateUser>
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
    </MainLayout>
  );
}
