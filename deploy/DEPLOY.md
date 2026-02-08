# Pixel World Portfolio - Deployment Guide

## 服务器环境要求

- Linux (推荐 Ubuntu 22.04+ / CentOS 8+)
- Nginx 1.18+
- MySQL 9.x
- PHP 8.3+
- PHP 扩展: pdo, pdo_mysql, json, mbstring

---

## 部署步骤

### 1. 数据库配置

```bash
# 登录 MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE pixel_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建专用用户（推荐）
CREATE USER 'pixel_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON pixel_blog.* TO 'pixel_user'@'localhost';
FLUSH PRIVILEGES;

# 导入数据表
USE pixel_blog;
SOURCE /path/to/api/init.sql;
```

### 2. 上传文件

```bash
# 建议的目录结构
/var/www/pixel-blog/
├── public/          # 前端构建产物 (npm run build 的 dist 目录)
│   ├── index.html
│   ├── assets/
│   └── ...
└── api/             # PHP 后端
    ├── .env
    ├── config.php
    ├── index.php
    ├── posts.php
    ├── projects.php
    └── settings.php
```

### 3. 配置 API 环境变量

```bash
# 复制环境变量模板
cp /var/www/pixel-blog/api/.env.example /var/www/pixel-blog/api/.env

# 编辑 .env 文件
nano /var/www/pixel-blog/api/.env
```

填入实际配置：
```
DB_HOST=localhost
DB_NAME=pixel_blog
DB_USER=pixel_user
DB_PASS=your_secure_password
API_DEBUG=false
CORS_ORIGIN=https://your-domain.com
```

### 4. 设置文件权限

```bash
# 设置所有者
sudo chown -R www-data:www-data /var/www/pixel-blog

# 设置权限
sudo chmod -R 755 /var/www/pixel-blog
sudo chmod 600 /var/www/pixel-blog/api/.env
```

### 5. 配置 Nginx

创建站点配置文件：

```bash
sudo nano /etc/nginx/sites-available/pixel-blog
```

粘贴以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # 重定向到 HTTPS（如果已配置 SSL）
    # return 301 https://$server_name$request_uri;
    
    root /var/www/pixel-blog/public;
    index index.html;

    # 前端静态文件
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 请求代理到 PHP
    location /api/ {
        alias /var/www/pixel-blog/api/;
        
        # 重写 API 路径
        rewrite ^/api/(.*)$ /index.php?$1 break;
        
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME /var/www/pixel-blog/api/index.php;
        include fastcgi_params;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/pixel-blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. 构建前端

在本地开发机器上：

```bash
cd d:\blog\pixel-world-portfolio
npm run build
```

将 `dist/` 目录内容上传到服务器的 `/var/www/pixel-blog/public/`

---

## 验证部署

1. **测试 API**
```bash
curl http://your-domain.com/api/health
# 预期返回: {"status":"ok","timestamp":"...","version":"1.0.0"}

curl http://your-domain.com/api/posts
# 预期返回博客文章列表
```

2. **测试前端**
   - 访问 http://your-domain.com
   - 检查首页、博客、作品页面是否正常加载数据

---

## SSL 证书（推荐）

使用 Let's Encrypt 免费 SSL：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 故障排查

| 问题 | 解决方案 |
|------|----------|
| 500 Internal Server Error | 检查 PHP 错误日志: `tail -f /var/log/nginx/error.log` |
| 数据库连接失败 | 确认 `.env` 配置正确，MySQL 服务运行中 |
| API 返回 404 | 检查 Nginx rewrite 规则 |
| CORS 错误 | 确认 `.env` 中 CORS_ORIGIN 配置正确 |
