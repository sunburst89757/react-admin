import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3708242_wlnxqnsb80g.js"
});

export const Icon = ({ type }: { type: string }) => <IconFont type={type} />;
