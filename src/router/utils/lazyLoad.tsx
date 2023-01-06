import { lazy, Suspense, ComponentType } from "react";
// path是文件夹的路径
export function LazyLoad({ path }: { path: string }) {
  const modules = import.meta.glob<
    boolean,
    string,
    { default: ComponentType<any> }
  >("../../pages/**/index.tsx");
  const key = Object.keys(modules).find(
    (moduleName) => moduleName.indexOf(path) > 0
  );
  if (!key) return null;
  const Component = lazy(modules[key]);
  return (
    <Suspense fallback={<>加载中……</>}>
      <Component></Component>
    </Suspense>
  );
}
