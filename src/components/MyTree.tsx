import { Input, Tree, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import React from "react";
import { Key, useCallback, useMemo, useState } from "react";
const { Search } = Input;
const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
const generateList = (data: DataNode[]) => {
  const dataList: { key: React.Key; title: string }[] = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title: title as string });
    if (node.children) {
      dataList.push(...generateList(node.children));
    }
  }
  return dataList;
};
export const MyTree = React.memo(
  ({
    treeData,
    isSearch = false,
    width = "220px",
    highlightClassName = "highlightTree",
    otherOption
  }: {
    treeData: DataNode[];
    width?: string;
    isSearch?: boolean;
    highlightClassName?: string;
    otherOption?: Partial<TreeProps>;
  }) => {
    console.log("重新渲染");
    const [searchValue, setSearchValue] = useState("");
    const [expandedKeys, setExpandedKeys] = useState<Key[]>();
    const [autoExpandParent, setAutoExpandParent] = useState(false);
    const onExpand = useCallback((newExpandedKeys: Key[], info: any) => {
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(false);
    }, []);
    // 扁平化treeData 的 key title
    const dataList = useMemo(() => generateList(treeData), [treeData]);
    // 搜索事件
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newExpandedKeys = dataList
        .map((node) => {
          if ((node.title as string).indexOf(value) > -1) {
            // 排除空字符串
            if (!value) return null;
            return getParentKey(node.key as string, treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      setSearchValue(value);
      setExpandedKeys(newExpandedKeys as React.Key[]);
      setAutoExpandParent(true);
    };
    // 配置搜索到的具有高亮颜色的tree Data
    const highLightTreeData = useMemo(() => {
      const loop = (data: DataNode[]): DataNode[] =>
        data.map((item) => {
          const strTitle = item.title as string;
          const index = strTitle.indexOf(searchValue);
          const beforeStr = strTitle.substring(0, index);
          const afterStr = strTitle.slice(index + searchValue.length);
          const title =
            index > -1 ? (
              <span>
                {beforeStr}
                <span className={highlightClassName}>{searchValue}</span>
                {afterStr}
              </span>
            ) : (
              <span>{strTitle}</span>
            );
          if (item.children) {
            return { title, key: item.key, children: loop(item.children) };
          }

          return {
            title,
            key: item.key
          };
        });

      return loop(treeData);
    }, [treeData, searchValue, highlightClassName]);
    return (
      <div style={{ width }}>
        {isSearch && (
          <Search
            style={{ marginBottom: 8 }}
            placeholder="Search"
            onChange={onChange}
          />
        )}
        <Tree
          treeData={isSearch ? highLightTreeData : treeData}
          // onSelect={onSelect}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onExpand={onExpand}
          {...otherOption}
        />
      </div>
    );
  }
);
