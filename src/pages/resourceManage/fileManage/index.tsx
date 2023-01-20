import { Button, Col, Form, Input, Row, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { downloadFile, getFileList, IFile, removeFile } from "api/file";
import { PageInfo } from "api/types";
import { Icon } from "components/Icon/Icon";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useEffect, useRef, useState } from "react";
import { transferTime } from "utils/handleTime";
import { UploadTool } from "utils/Upload";
const uploadTool = new UploadTool();
export default function FileManage() {
  const [dataList, setDataList] = useState<IFile[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 10
  });
  const [total, setTotal] = useState(0);
  const queryParams = useRef<PageInfo & { filename: string }>({
    page: 1,
    pageSize: 10,
    filename: ""
  });
  const [form] = Form.useForm<{ filename: string }>();
  const columns: ColumnsType<IFile> = [
    {
      title: "文件",
      key: "filename",
      dataIndex: "filename",
      align: "center"
    },
    {
      title: "唯一标识",
      key: "identifier",
      dataIndex: "identifier",
      align: "center"
    },
    {
      title: "大小",
      key: "size",
      dataIndex: "size",
      align: "center"
    },
    {
      title: "上传人",
      key: "uploadBy",
      render: (_, record) => record.user.username,
      align: "center"
    },
    {
      title: "创建时间",
      render: (record) => transferTime(record.createdAt),
      key: "createdAt",
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
              downloadFile({ filename: record.filename }).then((res) => {
                uploadTool.downloadFile(
                  res as unknown as Blob,
                  record.filename
                );
              });
            }}
          >
            下载
          </Button>
          <Button
            danger
            onClick={() => {
              removeFile(record.id).then((res) => {
                getFileList(queryParams.current).then((res) => {
                  setDataList(res.data.list);
                  setTotal(res.data.total);
                });
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
      align: "center"
    }
  ];
  const onChange = (page: number, pageSize: number) => {
    queryParams.current.page = page;
    queryParams.current.pageSize = pageSize;
    getFileList(queryParams.current).then((res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
    });
    setPageInfo({
      page,
      pageSize
    });
  };
  const onReset = () => {
    form.resetFields();
    queryParams.current = {
      ...queryParams.current,
      ...form.getFieldsValue()
    };
    getFileList(queryParams.current).then((res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
    });
  };
  const onFinish = () => {
    queryParams.current.filename = form.getFieldValue("filename");
    getFileList(queryParams.current).then((res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
    });
  };
  useEffect(() => {
    getFileList(queryParams.current).then((res) => {
      setDataList(res.data.list);
      setTotal(res.data.total);
    });
  }, []);
  return (
    <MainLayout>
      <>
        <Form form={form} onReset={onReset} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="文件名" name="filename">
                <Input placeholder="请输入文件名"></Input>
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
        </Form>
        <Table
          dataSource={dataList}
          columns={columns}
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
            pageSizeOptions: [5, 10, 20],
            showSizeChanger: true,
            showTotal: (total: number) => `总计${total}`
          }}
        ></Table>
      </>
    </MainLayout>
  );
}
