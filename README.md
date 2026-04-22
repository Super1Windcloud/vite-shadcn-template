# Vite Shadcn Template

一个基于 `Vite + React + TypeScript + shadcn/ui` 的后台模板，内置路由、表格、主题切换、国际化、表单、测试与基础工程化配置，适合作为中后台项目起点。


## Overview

- `React 19` + `TypeScript`
- `Vite 8` 构建
- `TanStack Router` 路由
- `TanStack Query` 数据请求缓存
- `TanStack Table` 表格能力
- `Tailwind CSS 4` + `shadcn/ui`
- `i18next` + `react-i18next`
- `Biome` 负责 lint / format
- `Vitest` + browser mode 测试
- `Husky` + `commitlint` 提交规范校验

## Features

- 完整的后台界面骨架
- 深色 / 浅色主题切换
- `en` / `zh-CN` 国际化骨架
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

如果你要运行浏览器测试，需要先安装 Playwright 浏览器：

```bash
pnpm test:install
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
pnpm check
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm format
pnpm format:check
pnpm fix
pnpm type-check
pnpm test
pnpm test:install
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
│  ├─ i18n/                国际化资源与配置
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

## Template First Steps

建议在正式开始业务开发前先做这几步：

1. 替换 `src/components/layout/data/sidebar-data.ts` 中的演示账号、团队和菜单。
2. 清理 `src/features/dashboard`、`src/features/chats` 等示例内容，保留你真正需要的模块。
3. 根据你的鉴权方案决定是否保留 `src/routes/clerk`。
4. 在 `.env.example` 中补充你自己的 API、监控和发布配置变量。

## Internationalization

当前内置语言：

- `en`
- `zh-CN`

国际化入口位于：

- `src/i18n/index.ts`
- `src/i18n/settings.ts`
- `src/context/locale-provider.tsx`

新增语言时建议同步处理：

1. 在 `src/i18n/locales/<locale>/common.ts` 中补资源。
2. 在 `src/i18n/settings.ts` 中注册 locale 与标签。
3. 如果语言需要 RTL，再配合现有 `DirectionProvider` 做默认方向策略。

## Tailwind CSS Notes

项目已经接入 `Tailwind CSS 4`，建议把它当成设计 token 和页面骨架层，而不是任意堆 class：

- 主题 token 统一维护在 `src/styles/theme.css`
- 全局基础样式和自定义 utility 维护在 `src/styles/index.css`
- 优先复用 `src/components/ui` 和已有布局组件，避免页面内重复拼装低层样式
- 尽量先扩展 CSS 变量和语义色，再使用任意值 class

## Quality Gates

推荐的本地验收顺序：

```bash
pnpm check
pnpm test
```

其中：

- `pnpm check` 会执行 `lint + type-check + build`
- `pnpm test` 依赖 Playwright 浏览器，首次运行前先执行 `pnpm test:install`

## Recommended Workflow

开发时建议使用以下顺序：

```bash
pnpm dev
pnpm check
pnpm test
```

## License

Licensed under the [MIT License](LICENSE).
