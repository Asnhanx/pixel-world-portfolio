# Pixel World Portfolio 🌸

一个像素风格的个人博客网站。

![Preview](https://img.shields.io/badge/React-19-blue) ![PHP](https://img.shields.io/badge/PHP-8.3-purple) ![MySQL](https://img.shields.io/badge/MySQL-9-orange)

## ✨ 特性

- 🎨 像素艺术风格设计，三种主题页面
- 📝 博客文章管理（CRUD API）
- 🎮 项目作品展示
- 📱 响应式设计
- 🚀 前后端分离架构

## 🛠️ 技术栈

**前端:**
- React 19 + TypeScript
- Vite
- TailwindCSS

**后端:**
- PHP 8.3
- MySQL 9.x
- RESTful API

## 📁 项目结构

```
pixel-world-portfolio/
├── api/                    # PHP 后端 API
│   ├── config.php          # 数据库配置
│   ├── index.php           # API 路由
│   ├── posts.php           # 博客文章 API
│   ├── projects.php        # 项目作品 API
│   └── init.sql            # 数据库初始化
├── pages/                  # React 页面组件
│   ├── Home.tsx            # 首页
│   ├── Blog.tsx            # 博客页
│   └── Projects.tsx        # 作品页
├── services/               # API 客户端
│   └── api.ts
└── deploy/                 # 部署配置
    └── DEPLOY.md
```

## 🚀 快速开始

### 前端开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 后端配置

1. 复制环境变量配置：
```bash
cp api/.env.example api/.env
```

2. 编辑 `api/.env` 填入 MySQL 连接信息

3. 导入数据库：
```bash
mysql -u root -p < api/init.sql
```

## 📖 API 文档

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/posts` | GET | 获取文章列表 |
| `/api/posts/{id}` | GET | 获取单篇文章 |
| `/api/projects` | GET | 获取项目列表 |
| `/api/health` | GET | 健康检查 |

## 🖥️ 部署

详见 [deploy/DEPLOY.md](./deploy/DEPLOY.md)

## 📄 License test

MIT License
