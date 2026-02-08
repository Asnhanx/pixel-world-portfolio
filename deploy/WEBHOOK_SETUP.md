# GitHub Webhook 自动部署配置指南

## 概述

当你推送代码到 GitHub 后，VPS 会自动拉取最新代码，无需手动操作。

---

## 配置步骤

### 第一步：修改 webhook.php 配置

编辑 `api/webhook.php`，修改以下两行：

```php
$secret = 'YOUR_WEBHOOK_SECRET_HERE'; // 设置一个随机密钥，例如: 'my-super-secret-key-123'
$projectPath = '/www/wwwroot/your-project-path'; // 你的项目实际路径
```

### 第二步：上传到 VPS

将 `webhook.php` 上传到 VPS 的 api 目录：

```bash
cd /你的项目目录
git pull origin main
```

### 第三步：配置 GitHub Webhook

1. 打开你的 GitHub 仓库：https://github.com/Asnhanx/pixel-world-portfolio
2. 点击 **Settings** → **Webhooks** → **Add webhook**
3. 填写以下信息：

| 字段 | 值 |
|------|---|
| **Payload URL** | `https://你的域名/api/webhook.php` |
| **Content type** | `application/json` |
| **Secret** | 与 webhook.php 中的 `$secret` 相同 |
| **SSL verification** | 启用 (如果有 HTTPS) |
| **Which events** | Just the push event |

4. 点击 **Add webhook**

### 第四步：设置文件权限（VPS）

确保 www 用户有权限执行 git：

```bash
# 设置项目目录权限
chown -R www:www /www/wwwroot/你的项目目录

# 确保 .git 目录可写
chmod -R 755 /www/wwwroot/你的项目目录/.git
```

### 第五步：配置 Git 安全目录（可能需要）

```bash
git config --global --add safe.directory /www/wwwroot/你的项目目录
```

---

## 测试

1. 在本地修改任意文件
2. 提交并推送到 GitHub
3. 检查 VPS 上的 `api/deploy.log` 查看部署日志

```bash
tail -f /www/wwwroot/你的项目目录/api/deploy.log
```

---

## 故障排除

### Webhook 返回 403
- 检查 `$secret` 是否与 GitHub 设置一致

### 部署失败
- 检查 `deploy.log` 日志
- 确保 www 用户有 git 权限
- 运行 `git config --global --add safe.directory /路径`

### 超时
- PHP 默认执行时间可能太短，在 `webhook.php` 开头添加：
```php
set_time_limit(120);
```
