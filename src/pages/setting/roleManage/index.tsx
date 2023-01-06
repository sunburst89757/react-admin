import { useRequest, useToggle } from "ahooks";
import { Button, Col, Form, Input, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { deleteRole, getRoleList, IRoleData, IRoleList } from "api/role";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon";
import { MainLayout } from "components/MainLayout";

import { useCallback, useEffect, useRef, useState } from "react";
import { transferTime } from "utils/handleTime";
import AddOrUpdateRole from "./components/addOrUpdateRole";
import Authorization from "./components/authorization";
export default function RoleManage() {
  const [form] = Form.useForm<{ roleName: string }>();

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 10
  });

  const [total, setTotal] = useState(0);
  const queryParams = useRef<PageInfo & IRoleData>({
    ...pageInfo,
    roleName: "",
    description: ""
  });
  const type = useRef<"add" | "update">("add");
  const onChange = useCallback((page: number, pageSize: number) => {
    queryParams.current.page = page;
    queryParams.current.pageSize = pageSize;
    setPageInfo({
      page,
      pageSize
    });
  }, []);
  const [isOpen, { toggle }] = useToggle(false);
  const [isShow, { toggle: toggleRole }] = useToggle(false);

  const { loading, run } = useRequest(getRoleList, {
    manual: true,
    onSuccess: (res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
      setPageInfo({
        page: res.data.page,
        pageSize: res.data.pageSize
      });
    }
  });
  const columns = useRef<ColumnsType<IRoleList>>([
    {
      title: "角色",
      key: "roleName",
      render: (_, record) => record.roleName,
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
            onClick={() => {
              rowId.current = record.id;
              toggleRole();
            }}
          >
            授权
          </Button>
          <Button
            type="primary"
            onClick={() => {
              type.current = "update";
              rowData.current = record;
              toggle();
            }}
          >
            修改
          </Button>
          <Button
            danger
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
      align: "center"
    }
  ]);
  const rowData = useRef<IRoleList>();
  const rowId = useRef(1);
  const [dataList, setDataList] = useState<IRoleList[]>();
  const queryRoleList = useCallback(() => {
    run(queryParams.current);
  }, [run]);
  const onReset = useCallback(() => {
    queryParams.current.roleName = "";
    queryRoleList();
  }, [queryRoleList]);
  const onFinish = useCallback(() => {
    queryParams.current.roleName = form.getFieldValue("roleName");
    // queryParams.current.description = form.
    queryRoleList();
  }, [queryRoleList, form]);
  const handleDelete = (id: number) => {
    deleteRole(id).then((res) => {
      if (res.success) {
        queryRoleList();
      }
    });
  };
  useEffect(() => {
    queryRoleList();
  }, [queryRoleList]);
  return (
    <MainLayout>
      <>
        <Form form={form} onReset={onReset} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="角色名称" name="roleName">
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
        <AddOrUpdateRole
          type={type.current}
          isOpen={isOpen}
          toggle={toggle}
          cb={queryRoleList}
          data={rowData.current}
        ></AddOrUpdateRole>
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
            showTotal: (total: number) => `总计${total}`
          }}
          loading={loading}
        />
        <Authorization
          open={isShow}
          toggle={toggleRole}
          roleId={rowId.current}
        ></Authorization>
      </>
    </MainLayout>
  );
}
