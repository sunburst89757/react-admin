# react-admin

[在线预览](http://47.98.204.143:3000/login)

账号： test/test(测试用户) admin/admin111(管理员用户)

这是一个利用 react18 + typescript 实现的 Web 后台管理系统模板,后台基于[react-admin-backend](https://github.com/sunburst89757/react-admin-backend),由 koa typescript 实现。

## 特性

- react18: 函数式组件开发
- TypeScript: javaScript 的超集，支持静态类型检测
- redux-toolkit: 全局状态管理工具
- react-router-dom6: 路由管理工具
- css module 和 tailwind css 做样式管理方案
- vite 新一代构建工具
- 使用 access_token refresh_token 支持无感刷新
- 支持页面级、资源级权限管理方案
- 支持黑暗模式 色弱模式 自定义调整主题色
- 封装了易用的 echarts hook,快速创建 echarts 图表
- 集成了通用的[大文件上传组件](https://github.com/sunburst89757/react-simple-upload)支持秒传 断点续传

## 准备

- 了解 node 和 git 开发环境
- 熟悉 react18 语法
- 熟悉 TypeScript 基本语法
- 熟悉 ES6+基本语法
- 熟悉 react-router-dom6 的基本使用
- 熟悉 redux 的基本使用
- 熟悉 Antd 组件库 ui 的使用
- 熟悉 css module 和 tailwind css 样式的基本使用方法

### 安装使用

- 获取项目代码
  ```
  git clone https://github.com/sunburst89757/react-admin
  ```
- 安装依赖
  ```
  npm install
  ```
- 运行
  ```
  npm run start
  ```
- 登录使用
  ```
  admin: admin
  ```
- 打包上线
  ```
  npm run build
  ```
- git 提交规范
  ```
  npm run commit
  ```

## 使用规则

### 路由新增原则

1. 在 pages/xxx/xxx/index.tsx 下新增路由组件 使用默认导出
2. router/modules 下的二级路由添加 路由组件对应的 pages 下的路径： xxx/xxx
3. 后端服务器上添加当前用户允许访问的菜单路由
   系统设置/菜单管理 添加即可

   ![](/src/assets/readme/menuManage.png)
