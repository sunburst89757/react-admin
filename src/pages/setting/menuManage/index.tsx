import { useRequest, useToggle } from "ahooks";
import { Button, Col, Form, Input, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DataNode } from "antd/lib/tree";
import { Menu } from "api/menu";
import { getMenuList as queryMenuList } from "api/menu";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon";
import { LayoutTree } from "components/LayoutTree";
import { MainLayout } from "components/MainLayout";
import { MyTree } from "components/MyTree";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "store/types";
import AddMenu from "./components/addMenu";
type DataType = Pick<
  Menu,
  "name" | "icon" | "sort" | "createdAt" | "updatedAt"
> & {
  isValid: boolean;
};
const columns: ColumnsType<DataType> = [
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
        {record.isValid || "正常"}
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
        <Button type="primary">修改</Button>
        <Button danger>删除</Button>
      </Space>
    ),
    align: "center"
  }
];
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
  const [form] = Form.useForm();
  const [isOpen, { toggle }] = useToggle(false);
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
    return tree;
  }, [menu]);
  const clickNode = useCallback(
    (node: string) => {
      setPath(node);
      queryParmas.current.path = node;
      getMenuList(queryParmas.current);
    },
    [getMenuList]
  );
  const onFinish = useCallback(() => {
    queryParmas.current.name = form.getFieldValue("menuName");
    getMenuList(queryParmas.current);
  }, [getMenuList, form]);
  const onReset = useCallback(() => {
    form.resetFields();
    console.log(form.getFieldsValue());

    queryParmas.current.name = "";
    getMenuList(queryParmas.current);
  }, [getMenuList, form]);
  const onChange = useCallback(
    (page: number, pageSize: number) => {
      queryParmas.current.page = page;
      queryParmas.current.pageSize = pageSize;
      setpageInfo({
        page,
        pageSize
      });
      getMenuList(queryParmas.current);
    },
    [getMenuList]
  );
  useEffect(() => {
    getMenuList(queryParmas.current);
  }, [getMenuList]);

  return (
    <div className="pageContainer">
      <LayoutTree>
        <MyTree treeData={treeData} clickNode={clickNode}></MyTree>
      </LayoutTree>
      <MainLayout>
        <>
          <Form form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="菜单名称" name="menuName">
                  <Input placeholder="输入菜单名称"></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
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
                      onClick={onReset}
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
                      toggle();
                    }}
                  >
                    添加
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <AddMenu isOpen={isOpen} toggle={toggle}></AddMenu>
          <Table
            dataSource={dataList}
            columns={columns}
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
