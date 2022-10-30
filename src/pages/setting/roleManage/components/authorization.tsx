import { useRequest } from "ahooks";
import { Modal, Spin } from "antd";
import { MyTree } from "components/MyTree";
import React, { Key, useEffect, useState } from "react";
import { DataNode, TreeProps } from "antd/lib/tree";
import { getMenuListByRoleId } from "api/user";

function Authorization({
  open,
  toggle,
  roleId
}: {
  open: boolean;
  toggle: () => void;
  roleId: number;
}) {
  const [treeData, settreeData] = useState<DataNode[]>();
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([""]);
  const { run } = useRequest(getMenuListByRoleId, {
    manual: true,
    cacheKey: "all",
    onSuccess: (res) => {
      console.log("执行");

      if (res.success) {
        const tree: DataNode[] = [];
        res.data.forEach((route) => {
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
        settreeData(tree);
      }
    }
  });
  const { loading, runAsync } = useRequest(getMenuListByRoleId, {
    manual: true
  });
  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys as Key[]);
  };
  //    查询所有菜单
  useEffect(() => {
    run(1);
  }, [run]);
  //    查询角色授权菜单
  useEffect(() => {
    runAsync(roleId).then((res) => {
      console.log("下hi ing");

      if (res.success) {
        const checkedKeys: Key[] = [];
        res.data.forEach((menu) => {
          if (!menu.children) {
            checkedKeys.push(menu.path);
          } else {
            menu.children.forEach((child) => {
              checkedKeys.push(child.path);
            });
          }
        });
        setCheckedKeys(checkedKeys);
      }
    });
  }, [runAsync, roleId]);
  return (
    <Modal
      title="角色授权"
      open={open}
      destroyOnClose={true}
      onCancel={() => {
        toggle();
      }}
    >
      {loading ? (
        <Spin></Spin>
      ) : (
        <MyTree
          treeData={treeData!}
          otherOption={{
            checkable: true,
            onCheck,
            checkedKeys
          }}
        ></MyTree>
      )}
    </Modal>
  );
}

export default React.memo(Authorization);
