import { merge } from "api/upload";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useState } from "react";
import Uploader from "react-simple-upload";
import { UploadFile } from "react-simple-upload/dist/types";
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
    checkChunkUploadedByResponse: (chunk: any, message: any) => {
      const { data } = JSON.parse(message);
      if (data.skip) {
        return true;
      }
      return (data.uploaded || []).indexOf(chunk.offset + 1) >= 0;
    }
  });
  const fileComplete = (rootFile: UploadFile) => {
    // @ts-ignore
    if (rootFile.isFolder) {
      for (const file of rootFile.files) {
        merge({
          // @ts-ignore
          identifier: uploadTool.cleanIdentifier(file.uniqueIdentifier),
          filename: file.name,
          uploadBy: userId,
          // @ts-ignore
          size: uploadTool.transferSize(file.size)
        });
      }
    } else {
      merge({
        // @ts-ignore
        identifier: uploadTool.cleanIdentifier(rootFile.uniqueIdentifier),
        filename: rootFile.name,
        uploadBy: userId,
        // @ts-ignore
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
      <Uploader
        options={options}
        onFileComplete={fileComplete}
        onComplete={complete}
      ></Uploader>
    </MainLayout>
  );
}
