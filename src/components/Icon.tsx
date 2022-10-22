import { createFromIconfontCN } from "@ant-design/icons";
const URL = "//at.alicdn.com/t/c/font_3708242_zrw64gf9vs.js";
const IconFont = createFromIconfontCN({
  scriptUrl: URL
});

export const Icon = ({
  type,
  className
}: {
  type: string;
  className?: string;
}) => <IconFont type={type} className={className} />;
