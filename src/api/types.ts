/**
 * @description: 含有分页信息的查询
 */
export interface PageInfo {
  page: number;
  pageSize: number;
}

/**
 * @description含有分页信息的查询
 * @params list T是list的类型
 */

export type ListRes<T extends any[]> = PageInfo & {
  total: number;
  list: T;
};
