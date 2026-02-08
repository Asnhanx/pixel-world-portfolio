-- Pixel World Portfolio Database Schema
-- MySQL 9.x compatible

-- Create database (run separately if needed)
-- CREATE DATABASE IF NOT EXISTS pixel_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE pixel_blog;

-- Drop existing tables if needed (comment out in production)
-- DROP TABLE IF EXISTS posts;
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS settings;

-- Blog posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    excerpt VARCHAR(500),
    cover_image VARCHAR(500),
    category VARCHAR(50),
    tags JSON,
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects/Portfolio table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(300),
    description TEXT,
    tech_stack JSON,
    icon VARCHAR(100) DEFAULT 'code',
    link VARCHAR(500),
    status ENUM('active', 'archived') DEFAULT 'active',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Site settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Sample Data (based on frontend hardcoded data)
-- =============================================

-- Insert sample blog posts
INSERT INTO posts (title, content, excerpt, cover_image, category, tags, status, created_at) VALUES
(
    '有机架构',
    '探索自然界中的生成设计模式，从树叶脉络到代码结构。本文深入分析了大自然给予我们的设计灵感，以及如何将这些灵感应用到软件架构中。',
    '探索自然界中的生成设计模式，从树叶脉络到代码结构。',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB2oETTzrQEmQAb1b0vEB6uvAtWdJP70xCCAxfZj-M5XvJC19PPu7od5LShMGKIC4tC2WGLXWVyhCPDhvJHOOeP8Lbo4Qriwh_DMFSkjUotoNNDgUeVoaRcJebo47YZRdffcU4kMVSdCVz6alI86iYeaRw-Y5cqMECiyyxatabLgQxy02bNLsNatV767XL_QI6Iz4WgXbDX90EF_CRB_Xz9k7L3Mi-z9VfNsebLjstmtkHclwPsCns5HyPk7oP_tL4VSE807C43mcen',
    'design',
    '["design", "nature", "architecture"]',
    'published',
    '2023-11-14 10:00:00'
),
(
    '花园日志 #42',
    '更新生态系统以支持新的花卉引擎。这是一段芬芳的旅程。今天我们更新了整个开发环境，增加了对新框架的支持。',
    '更新生态系统以支持新的花卉引擎。这是一段芬芳的旅程。',
    '',
    'dev',
    '["dev", "update", "ecosystem"]',
    'published',
    '2023-11-02 14:30:00'
),
(
    '阳光下的思考',
    '没有什么比在充满阳光的午后，一边喝着冰茶一边构思更有趣了。这是一篇关于生活与编程平衡的随笔。',
    '没有什么比在充满阳光的午后，一边喝着冰茶一边构思更有趣了。',
    '',
    'life',
    '["life", "thinking", "summer"]',
    'published',
    '2023-10-28 16:00:00'
),
(
    '夏日祭的回忆: 烟火与祭典',
    '记录今年夏日祭的美好回忆，烟火绽放的瞬间，祭典的热闹氛围。',
    '记录今年夏日祭的美好回忆，烟火绽放的瞬间。',
    '',
    'life',
    '["life", "festival", "memory"]',
    'published',
    '2023-08-14 20:00:00'
);

-- Insert sample projects
INSERT INTO projects (title, subtitle, description, tech_stack, icon, link, status, display_order) VALUES
(
    'Cyber-Deck',
    'Next.js Dashboard',
    '现代化的数据仪表盘项目，使用 Next.js 和 React 构建，具有实时数据更新和响应式设计。',
    '["React", "Next.js", "Tailwind"]',
    'stadia_controller',
    '',
    'active',
    1
),
(
    'Pixel-Shop',
    'E-commerce UI Kit',
    '像素风格的电商 UI 组件库，包含完整的购物流程组件。',
    '["Vue", "Node.js", "MongoDB"]',
    'token',
    '',
    'active',
    2
),
(
    'Arcade-API',
    'Game Backend System',
    '游戏后端系统，提供用户登录、排行榜、成就系统等功能的 API。',
    '["Python", "FastAPI", "PostgreSQL"]',
    'joystick',
    '',
    'active',
    3
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
('site_title', '像素物語'),
('site_description', '在这个宁静的小角落，我记录着每一个闪光的瞬间'),
('author_name', 'Pixel World'),
('now_playing', '蒸汽波 - 浅草之夏 (Lofi)'),
('status_message', '庭院正在维护中...');
