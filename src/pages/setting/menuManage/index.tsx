import { useRequest, useToggle } from "ahooks";
import { Button, Col, Form, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DataNode } from "antd/lib/tree";
import { deleteMenu, Menu } from "api/menu";
import { getMenuList as queryMenuList } from "api/menu";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon";
import { LayoutTree } from "components/LayoutTree";
import { MainLayout } from "components/MainLayout";
import { MyTree } from "components/MyTree";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/types";
import { generateAuthMenu } from "utils/generateAuthMenu";
import AddOrUpdateMenu from "./components/addOrUpdateMenu";
export type MenuDataType = Pick<
  Menu,
  "name" | "icon" | "sort" | "createdAt" | "updatedAt" | "isValid" | "id"
>;

export default function MenuManage() {
  const { run: getMenuList, loading } = useRequest(queryMenuList, {
    manual: true,
    onSuccess: (res) => {
      const { page, pageSize } = res.data;
      setdataList(res.data.list);
      setpageInfo({
        page,
        pageSize
      });
      settotal(res.data.total);
    }
  });
  const dispatch = useAppDispatch();
  const roleId = useAppSelector((state) => state.user.userInfo.roleId);
  const [form] = Form.useForm();
  const [isOpen, { toggle }] = useToggle(false);
  const [type, setType] = useState<"add" | "update">("add");
  // 初始值必须为空，空才是查询所有
  const [path, setPath] = useState<string>("");
  const [dataList, setdataList] = useState<Menu[]>();
  const [pageInfo, setpageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 10
  });
  const [total, settotal] = useState<number>(10);
  const queryParmas = useRef<
    {
      name: string;
      path: string;
    } & PageInfo
  >({
    name: form.getFieldValue("menuName"),
    path,
    ...pageInfo
  });
  const queryRequest = useCallback(() => {
    getMenuList(queryParmas.current);
  }, [getMenuList]);
  const rowData = useRef<MenuDataType>();
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const treeData = useMemo(() => {
    const tree: DataNode[] = [];
    menu.forEach((route) => {
      const children: DataNode[] = [];
      if (route.children) {
        route.children.forEach((childRoute) => {
          const obj: DataNode = {
            title: childRoute.name,
            key: childRoute.path
          };
          children.push(obj);
        });
      }
      const obj: DataNode = {
        title: route.name,
        key: route.path
      };
      children.length > 0 && (obj.children = children);
      tree.push(obj);
    });
    return [
      {
        key: "",
        title: "系统资源",
        children: tree
      }
    ];
  }, [menu]);
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
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center"
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
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
              setType("update");
              rowData.current = record;
              toggle();
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
  const clickNode = useCallback(
    (node: string) => {
      setPath(node);
      queryParmas.current.path = node;
      queryRequest();
    },
    [queryRequest]
  );
  const onChange = useCallback(
    (page: number, pageSize: number) => {
      queryParmas.current.page = page;
      queryParmas.current.pageSize = pageSize;
      setpageInfo({
        page,
        pageSize
      });
      queryRequest();
    },
    [queryRequest]
  );
  const onDelete = useCallback(
    async (id: number) => {
      await deleteMenu(id);
      await generateAuthMenu(roleId, dispatch);
      queryRequest();
    },
    [roleId, dispatch, queryRequest]
  );

  useEffect(() => {
    queryRequest();
  }, [queryRequest]);

  return (
    <div className="pageContainer">
      <LayoutTree>
        <MyTree treeData={treeData} clickNode={clickNode}></MyTree>
      </LayoutTree>
      <MainLayout>
        <>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<Icon type="icon-add" />}
                  onClick={() => {
                    setType("add");
                    toggle();
                  }}
                >
                  添加
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <AddOrUpdateMenu
            type={type}
            isOpen={isOpen}
            toggle={toggle}
            data={rowData.current}
            cb={queryRequest}
          ></AddOrUpdateMenu>
          <Table
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
      </MainLayout>
    </div>
  );
}
