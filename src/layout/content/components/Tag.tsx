import { Tag } from "antd";
import { Icon } from "components/Icon/Icon";
import { useWatch } from "hooks/useWatch";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addTag, deleteTag, ITag } from "store/module/tag.store";
import { useAppDispatch, useAppSelector } from "store/types";
import "./tags.scss";
const isIncludeTag = (url: string, tags: ITag[]) =>
  tags.findIndex((tag) => tag.url === url) >= 0;
export const MyTag = () => {
  const tags = useAppSelector((state) => state.tag.tags);
  const authRoutes = useAppSelector((state) => state.menu.authRoutes);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = useCallback(
    (tag: ITag) => {
      navigate(tag.url);
    },
    [navigate]
  );
  const handleClose = useCallback(
    (url: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      //  阻止默认的删除行为
      e.preventDefault();
      const preTagIndex = tags.findIndex((tag) => tag.url === url) - 1;
      dispatch(
        deleteTag({
          url
        })
      );
      navigate(tags[preTagIndex].url);
    },
    [dispatch, navigate, tags]
  );
  useWatch(() => {
    //  添加不在tags维护的tag
    if (!isIncludeTag(location.pathname, tags)) {
      const newTag: ITag = {
        ...authRoutes.find((route) => route.url === location.pathname)!,
        fixed: false
      };
      dispatch(addTag(newTag));
    }
  }, [location.pathname]);
  return (
    <div className="tagContainer">
      <Icon type="icon-xiangzuojiantou" className="icon"></Icon>
      {tags.map((tag) => {
        return (
          <Tag
            key={tag.name}
            closable={!tag.fixed}
            className="cursor-pointer"
            onClose={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              handleClose(tag.url, e);
            }}
            onClick={() => {
              handleClick(tag);
            }}
            color={tag.url === location.pathname ? "blue" : ""}
          >
            {tag.name}
          </Tag>
        );
      })}
      <Icon type="icon-xiangyoujiantou" className="icon"></Icon>
    </div>
  );
};
