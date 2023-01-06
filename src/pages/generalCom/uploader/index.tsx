import { MainLayout } from "components/MainLayout";
import { useState } from "react";
import Uploader from "react-simple-upload";
import { UploadFile } from "react-simple-upload/dist/types";

export default function Upload() {
  const [options] = useState({
    target: "//localhost:3000/upload", // '//jsonplaceholder.typicode.com/posts/',
    testChunks: false
  });
  const fileComplete = (rootFile: UploadFile) => {
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
