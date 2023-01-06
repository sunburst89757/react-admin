import { login } from "api/user";
import { MainLayout } from "components/MainLayout";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export const dashLoader = async ({ params, request }: LoaderFunctionArgs) => {
  console.log(request, "request");
  console.log(params, "params");

  return await login({ username: "tyz", password: "729" });
};
export default function Dashboard() {
  const res = useLoaderData();
  console.log(res);
  return <MainLayout>首页</MainLayout>;
}
