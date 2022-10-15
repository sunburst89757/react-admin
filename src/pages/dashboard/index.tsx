import { login } from "api/user";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export const dashLoader = async ({ params, request }: LoaderFunctionArgs) => {
  console.log(request, "request");
  console.log(params, "params");

  return await login({ username: "admin", password: "admin" });
};
export const DashBoard = () => {
  const res = useLoaderData();
  console.log(res);

  return <div>这时首页</div>;
};
