export class UploadTool {
  transferSize(size: number) {
    let realSize = size;
    let num = 0;
    while (realSize / 1024 > 1) {
      num++;
      realSize = realSize / 1024;
    }
    let unit: string = "byte";
    switch (num) {
      case 0:
        unit = "byte";
        break;
      case 1:
        unit = "KB";
        break;
      case 2:
        unit = "MB";
        break;
      case 3:
        unit = "GB";
        break;
    }
    return realSize.toFixed(2) + unit;
  }
  cleanIdentifier(identifier: string) {
    return identifier.replace(/[^0-9A-Za-z_-]/g, "");
  }
  downloadFile(data: Blob, filename: string) {
    // create file link in browser's memory
    const href = URL.createObjectURL(data);

    // create "a" HTML element with href to file & click
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", filename); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}
