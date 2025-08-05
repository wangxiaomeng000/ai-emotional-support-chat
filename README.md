# AI情感支持聊天系统

一个基于AI的情感支持聊天系统，帮助用户通过深度对话分析获得情感支持和认知提升。

🎉 **支持多种AI服务！** 已配置OpenRouter API，可使用GPT-4获得最佳体验，也可选择免费的Mock模式。

## 核心功能

### 🧠 深度情感分析
- **三层分析系统**：将对话内容分解为事实层、洞见层、观念层
- **情绪识别**：准确识别用户的情绪状态和强度
- **模式发现**：识别思维模式和认知偏见

### 💎 3D可视化
- **动态生物体模型**：每个对话生成独特的3D视觉表现
- **层级可视化**：直观展示思维的三个层次
- **实时更新**：随对话发展动态演化

### 🎯 智能对话
- **情感支持**：提供温暖、理解的回应
- **引导式提问**：帮助用户深入探索内心
- **建设性建议**：基于分析提供有价值的洞察

### 📊 数据管理
- **多会话支持**：管理多个对话历史
- **导入/导出**：数据备份和迁移
- **隐私保护**：支持完全本地运行

## 快速开始

```bash
# 1. 克隆项目
git clone <repository-url>
cd ai-emotional-support-chat

# 2. 安装依赖
npm install
cd backend && npm install && cd ..

# 3. 启动系统（已配置OpenRouter/GPT-4）
./start.sh

# 访问 http://localhost:3000
```

### AI服务选项
- **OpenRouter (已配置)** - 使用GPT-4，获得最佳体验 [使用指南](./QUICK_START_OPENROUTER.md)
- **Mock模式** - 无需API密钥的免费选项 [使用指南](./QUICK_START_NO_API.md)

## 技术栈

- **前端**：Next.js 15 + React 19 + TypeScript + Three.js
- **后端**：Express + Node.js + TypeScript + MongoDB
- **AI服务**：支持多种AI服务（OpenRouter/GPT-4、OpenAI、Mock等）
- **部署**：Docker支持，易于部署

## 项目文档

- [快速开始（无API密钥）](./QUICK_START_NO_API.md) - 立即开始使用
- [完整项目指南](./PROJECT_GUIDE.md) - 详细的技术文档
- [实现总结](./IMPLEMENTATION_SUMMARY.md) - 功能实现概览

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License
