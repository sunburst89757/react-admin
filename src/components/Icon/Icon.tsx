import { createFromIconfontCN } from "@ant-design/icons";
const URL = "//at.alicdn.com/t/c/font_3708242_29gt6cai9jf.js";
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
