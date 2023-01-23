import { Divider, Space } from "antd";
import {
  CaretRightOutlined,
  ReloadOutlined,
  PauseOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { merge } from "api/upload";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useState } from "react";
import Uploader, {
  UnSupport,
  UploaderBtn,
  UploaderDrop,
  UploaderFile,
  UploaderList
} from "react-simple-upload";
import { UploadChunk, UploadFile } from "react-simple-upload/dist/types";
import { BASE_URL } from "service/config";
import { useAppSelector } from "store/types";
import { UploadTool } from "utils/Upload";
const uploadTool = new UploadTool();
export default function Upload() {
  const userId = useAppSelector((state) => state.user.userInfo.userId);
  const [options] = useState({
    target: `${BASE_URL}/upload/uploadChunk`, // '//jsonplaceholder.typicode.com/posts/',
    // target: "//localhost:3000/upload",
    testChunks: true,
    checkChunkUploadedByResponse: (chunk: UploadChunk, message: string) => {
      const { data } = JSON.parse(message);
      if (data.skip) {
        return true;
      }
      // @ts-ignore
      return (data.uploaded || []).indexOf(chunk.offset + 1) >= 0;
    }
  });
  const fileComplete = (rootFile: UploadFile) => {
    if (rootFile.isFolder) {
      for (const file of rootFile.files) {
        merge({
          identifier: uploadTool.cleanIdentifier(file.uniqueIdentifier),
          filename: file.name,
          uploadBy: userId,
          size: uploadTool.transferSize(file.size)
        });
      }
    } else {
      merge({
        identifier: uploadTool.cleanIdentifier(rootFile.uniqueIdentifier),
        filename: rootFile.name,
        uploadBy: userId,
        size: uploadTool.transferSize(rootFile.size)
      });
    }

    console.log(rootFile, "fileComplete");
  };
  const complete = () => {
    console.log("complete");
  };
  return (
    <MainLayout>
      <>
        {userId === 11 ? (
          <h1 className="text-[#ff0000]">
            为保护服务器，测试用户上传五个文件后，服务器会手动清除所有上传的文件及其切片
          </h1>
        ) : null}
        <Divider>默认样式</Divider>
        <Uploader
          options={options}
          onFileComplete={fileComplete}
          onComplete={complete}
        ></Uploader>
        <Divider>
          定制样式(修改的样式较少 可实现自定义的样式 只做演示使用)
        </Divider>
        <Uploader
          options={options}
          onFileComplete={fileComplete}
          onComplete={complete}
        >
          {({ fileList }) => (
            <>
              <UnSupport></UnSupport>
              <UploaderDrop>
                <>
                  <p>拖拽上传</p>
                  <div className="flex mt-2">
                    <UploaderBtn>选择文件</UploaderBtn>
                    <UploaderBtn directory={true}>选择文件夹</UploaderBtn>
                  </div>
                </>
              </UploaderDrop>
              <UploaderList fileList={fileList}>
                {() => (
                  <>
                    {fileList.map((file) => (
                      <UploaderFile file={file} list={true} key={file.id}>
                        {({
                          name,
                          size,
                          averageSpeed,
                          pause,
                          retry,
                          remove,
                          resume,
                          formatedTimeRemaining,
                          error,
                          isComplete,
                          isUploading,
                          paused,
                          status,
                          statusText,
                          progress,
                          fileCategory
                        }) => (
                          <div className="uploader-file flex ">
                            <span className="flex-1">{fileCategory}</span>
                            <span className="flex-1">{name}</span>
                            <span className="flex-1">{size}</span>
                            <span className="flex-1">
                              {isUploading ? (
                                <>
                                  <span>
                                    {Math.floor(progress * 100) + "%"}
                                  </span>
                                  <span className="mx-3">{averageSpeed}</span>
                                  <span>{formatedTimeRemaining}</span>
                                </>
                              ) : (
                                statusText
                              )}
                            </span>
                            {isUploading && (
                              <div className="flex-1 flex items-center justify-center ">
                                <Space>
                                  <PauseOutlined onClick={pause} />
                                  <CloseOutlined onClick={remove} />
                                </Space>
                              </div>
                            )}
                            {error && (
                              <span
                                className="flex-1 flex items-center justify-center "
                                onClick={retry}
                              >
                                <ReloadOutlined />
                              </span>
                            )}
                            {paused && (
                              <span
                                className="flex-1 flex items-center justify-center "
                                onClick={resume}
                              >
                                <CaretRightOutlined />
                              </span>
                            )}
                          </div>
                        )}
                      </UploaderFile>
                    ))}
                  </>
                )}
              </UploaderList>
            </>
          )}
        </Uploader>
      </>
    </MainLayout>
  );
}
