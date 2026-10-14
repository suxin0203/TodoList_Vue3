# TodoList_Vue3

> Vue 3 + Element Plus + TypeScript + Pinia 的便签（TodoList）练手案例。**在线可直接玩：https://suxin0203.github.io/TodoList_Vue3/**
>
> 定位很明确：这是一个入门级案例项目，用来练 `script setup` + TS 类型 + Element Plus 组件组合，**没有后端、没有账号体系、没有复杂状态管理**。看代码请直奔 `src/App.vue`（约 250 行，逻辑全在这一个文件里）。

## 功能

| 功能 | 实现 |
|------|------|
| 新增便签 | `el-input` + 回车/按钮提交，写入 `todosData` |
| 切换完成 | `el-checkbox` 的 `@click.prevent` 手动改 `isCompeted` 字段 |
| 未完成 / 已完成 分区 | 两个列表分别渲染，`state.todosData.filter(data => !data.isCompeted)` |
| 入场动画 | animate.css：未完成列表 `bounceIn`，已完成列表 `fadeInDown` |
| 全选与计数 | `ischeckAll` 复选框 + 「N 条」统计 |
| 顶部轮播图 | `el-carousel` + `el-image`，图片地址走接口（见下方风险提示） |
| 持久化 | `localStorage`，键名 `todo_key`，封装在 `src/utils/localStorage.ts` 的 `saveTodo` / `readTodo` |

## 目录

```
src/
├── App.vue                  # 主体逻辑与布局（核心就这一个文件）
├── api/slider.js            # 轮播图接口
├── components/Header.vue    # 头部
├── components/Footer.vue    # 底部
├── components/List.vue      # 列表组件
├── types/todo.ts            # Todo 的 TS 类型定义
├── utils/localStorage.ts    # 读写 localStorage
└── utils/request.js         # axios 封装
```

## 运行

```sh
npm install
npm run dev        # Vite 开发服务器
npm run build      # 产出 dist/
npm run preview    # 预览构建结果
```

部署：`gh-pages` 分支承载 GitHub Pages，站点地址见顶部。

## 两个已知问题

1. **轮播图依赖外部旧后端。** `src/api/slider.js` 实际请求的是 `https://api.suxin23.cn/lbt/imglist`（旧博客系统 BlogServes 的接口），而原本的 fastmock 兜底地址是**被注释掉的**。所以一旦那个后端关停，Pages 上的轮播图会空掉——**便签本身的功能不受影响**，因为它只读 localStorage。
2. **字段名拼写有误。** 完成态字段是 `isCompeted`，正确拼写应为 `isCompleted`（少了一个 `a`）。因为项目内部用词一致（`App.vue` 9 处 + `types/todo.ts` 1 处），不影响运行，保留未改。

## 关于 dist/

构建产物 `dist/` 被提交进了仓库（约 1.19 MB）。这**不是疏漏**：`.gitignore` 第 11 行的 `dist` 是被故意注释掉的（写作 `# dist`），并且 2022-10-24 有一次专门的提交「新增dist打包文件夹」。推测当时是为了直接托管静态产物。现在站点已由 `gh-pages` 分支承载，main 里的这份 `dist/` 属于冗余，但清除它需要重写历史，故保留原样。
