export class UploadTool {
  handSize(size: number) {
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
  handleIdentifier(identifier: string) {
    return identifier.replace(/[^0-9A-Za-z_-]/g, "");
  }
}
