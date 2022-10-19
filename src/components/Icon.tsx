import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3708242_kp29a50pdta.js"
});

export const Icon = ({ type }: { type: string }) => <IconFont type={type} />;
