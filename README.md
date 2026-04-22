# Vite Shadcn Template

一个基于 `Vite + React + TypeScript + shadcn/ui` 的后台模板，内置路由、表格、主题切换、表单、测试与基础工程化配置，适合作为中后台项目起点。

![Project Preview](public/images/shadcn-admin.png)

## Overview

- `React 19` + `TypeScript`
- `Vite 8` 构建
- `TanStack Router` 路由
- `TanStack Query` 数据请求缓存
- `TanStack Table` 表格能力
- `Tailwind CSS 4` + `shadcn/ui`
- `Biome` 负责 lint / format
- `Vitest` + browser mode 测试
- `Husky` + `commitlint` 提交规范校验

## Features

- 完整的后台界面骨架
- 深色 / 浅色主题切换
- 响应式布局与侧边栏
- 命令面板搜索
- 表格、分页、筛选、批量操作
- 表单与对话框组件
- RTL 支持
- Clerk 登录页示例

## Quick Start

```bash
git clone <your-repo-url>
cd vite-shadcn-template
pnpm install
pnpm dev
```

默认开发地址：

```bash
http://localhost:5173
```

## Environment Variables

复制环境变量文件并按需填写：

```bash
cp .env.example .env
```

当前示例环境变量：

```bash
VITE_CLERK_PUBLISHABLE_KEY=
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm format
pnpm format:check
pnpm fix
pnpm type-check
pnpm test
pnpm test:watch
pnpm test:ui
pnpm test:coverage
pnpm commitlint --edit
```

## Commit Workflow

项目已配置：

- `husky`
- `commitlint`
- `commitizen` 配置文件 `cz.yaml`

推荐提交格式：

```bash
feat: add dashboard filters
fix: correct table pagination state
docs: update setup guide
```

## Project Structure

```text
.
├─ public/                 静态资源
├─ src/
│  ├─ assets/              图片与图标
│  ├─ components/          通用组件
│  ├─ context/             全局上下文
│  ├─ features/            页面级功能模块
│  ├─ hooks/               复用 hooks
│  ├─ lib/                 工具函数
│  ├─ routes/              路由文件
│  ├─ stores/              状态管理
│  └─ styles/              全局样式
├─ .github/                CI 与协作模板
├─ .husky/                 Git hooks
├─ biome.json              Biome 配置
├─ commitlint.config.mjs   commitlint 配置
├─ components.json         shadcn 配置
├─ vite.config.ts          Vite 配置
└─ package.json
```

## UI Notes

该模板中的部分 `shadcn/ui` 组件做过定制，尤其是 RTL 和交互细节相关部分。升级组件时建议优先检查这些目录中的现有改动：

- `src/components/ui`
- `src/components/layout`
- `src/context`

## Recommended Workflow

开发时建议使用以下顺序：

```bash
pnpm dev
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

## License

Licensed under the [MIT License](LICENSE).
