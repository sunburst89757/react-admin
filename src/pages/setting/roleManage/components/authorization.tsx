import { useRequest } from "ahooks";
import { Modal, Spin } from "antd";
import { MyTree } from "components/MyTree";
import React, { Key, useEffect, useRef, useState } from "react";
import { DataNode, TreeProps } from "antd/lib/tree";
import { getMenuListByRoleId } from "api/user";
import { updateRoleMenuList } from "api/role";

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
      if (res.success) {
        const tree: DataNode[] = [];
        res.data.forEach((route) => {
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
        settreeData(tree);
      }
    }
  });
  const { loading, runAsync } = useRequest(getMenuListByRoleId, {
    manual: true
  });
  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log(info, "info");
    console.log(checkedKeys, "选中");

    setCheckedKeys(checkedKeys as Key[]);
    checkedParams.current = [
      ...(checkedKeys as number[]),
      ...(info.halfCheckedKeys as number[])
    ];
  };
  const checkedParams = useRef<number[]>([1]);
  const onSubmit = () => {
    updateRoleMenuList({
      roleId,
      menuIds: checkedParams.current
    }).then((res) => {
      if (res.success) {
        toggle();
      }
    });
  };
  //    查询所有菜单
  useEffect(() => {
    run(1);
  }, [run]);
  //    查询角色授权菜单
  useEffect(() => {
    runAsync(roleId).then((res) => {
      if (res.success) {
        const checkedKeys: Key[] = [];
        const initialCheckedParams: number[] = [];
        // 树采用传递了父key，子就全部选中了
        res.data.forEach((menu) => {
          if (!menu.children) {
            checkedKeys.push(menu.id);
            initialCheckedParams.push(menu.id);
          } else {
            menu.children.forEach((child, index) => {
              checkedKeys.push(child.id);
              initialCheckedParams.push(child.id);
              if (index === menu.children?.length! - 1) {
                initialCheckedParams.push(menu.id);
              }
            });
          }
        });
        console.log(checkedKeys);
        setCheckedKeys(checkedKeys);
        checkedParams.current = initialCheckedParams;
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
      cancelText="取消"
      okText="提交"
      onOk={onSubmit}
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
