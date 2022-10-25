import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
// 数据库时间转化：2022-10-16T04:46:00.949Z
export const transferTime = (time: string) =>
  dayjs(time).format("YYYY-MM-DD HH:mm:ss");
