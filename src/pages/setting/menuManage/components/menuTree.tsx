import { LayoutTree } from "components/LayoutTree/LayoutTree";
import { MyTree } from "components/MyTree/MyTree";
import { useMemo } from "react";
import { useAppSelector } from "store/types";
import { DataNode } from "antd/lib/tree";
export const MenuTree = ({
  onRequest
}: {
  onRequest: (params: { id: number }) => void;
}) => {
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const treeData = useMemo(() => {
    const tree: DataNode[] = [];
    menu.forEach((route) => {
      const children: DataNode[] = [];
      if (route.children) {
        route.children.forEach((childRoute) => {
          const obj: DataNode = {
            title: childRoute.name,
            key: childRoute.id
          };
          children.push(obj);
        });
      }
      const obj: DataNode = {
        title: route.name,
        key: route.id
      };
      children.length > 0 && (obj.children = children);
      tree.push(obj);
    });
    return [
      {
        key: "",
        title: "系统资源",
        children: tree
      }
    ];
  }, [menu]);
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    const {
      selectedNodes
    }: {
      selectedNodes: DataNode[];
    } = info;
    const node: number = selectedNodes[0].key as number;
    onRequest({ id: node });
  };
  return (
    <LayoutTree>
      <MyTree
        treeData={treeData}
        isSearch
        otherOption={{
          onSelect: onSelect
        }}
      ></MyTree>
    </LayoutTree>
  );
};
