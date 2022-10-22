import { DataNode } from "antd/lib/tree";
import { MyTree } from "components/MyTree";
import { useMemo } from "react";
import { useAppSelector } from "store/types";
export default function UserManage() {
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const treeData = useMemo(() => {
    const tree: DataNode[] = [];
    menu.forEach((route) => {
      const children: DataNode[] = [];
      if (route.children) {
        route.children.forEach((childRoute) => {
          const obj: DataNode = {
            title: childRoute.name,
            key: childRoute.path
          };
          children.push(obj);
        });
      }
      const obj: DataNode = {
        title: route.name,
        key: route.path
      };
      children.length > 0 && (obj.children = children);
      tree.push(obj);
    });
    return tree;
  }, [menu]);
  const clickNode = (node: DataNode) => {
    console.log(node);
  };
  return (
    <div className="pageContainer">
      <MyTree treeData={treeData} clickNode={clickNode}></MyTree>
    </div>
  );
}
