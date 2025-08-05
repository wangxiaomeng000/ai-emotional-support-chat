const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 配置
const API_URL = 'http://localhost:3001/api';
const IMAGE_PATH = '/Users/mac/Desktop/合照.jpg';

async function testImageRecognition() {
  try {
    console.log('开始图片识别测试...\n');

    // 1. 读取图片并转换为base64
    console.log('1. 读取图片文件...');
    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    const imageBase64 = imageBuffer.toString('base64');
    console.log(`   ✅ 图片大小: ${(imageBuffer.length / 1024 / 1024).toFixed(2)}MB`);

    // 2. 发送带图片的消息
    console.log('\n2. 发送带图片的消息到AI服务...');
    const response = await axios.post(`${API_URL}/chat/message`, {
      content: '这是一张什么样的照片？请详细描述你看到的内容。',
      image: imageBase64
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 3. 显示AI的响应
    console.log('\n3. AI响应结果:');
    console.log('─'.repeat(50));
    
    if (response.data.success) {
      const { aiMessage } = response.data;
      
      console.log('\n📝 AI回复:');
      console.log(aiMessage.content);
      
      if (aiMessage.analysis) {
        console.log('\n📊 分析结果:');
        console.log('事实层:', aiMessage.analysis.facts);
        console.log('洞察层:', aiMessage.analysis.insights);
        console.log('概念层:', aiMessage.analysis.concepts);
        console.log('情绪分析:', aiMessage.analysis.emotionalTone);
        
        if (aiMessage.analysis.suggestions) {
          console.log('\n💡 建议:');
          aiMessage.analysis.suggestions.forEach((s, i) => {
            console.log(`   ${i + 1}. ${s}`);
          });
        }
      }
      
      console.log('\n✅ 图片识别测试成功！');
    } else {
      console.log('❌ 测试失败:', response.data.error);
    }

  } catch (error) {
    console.error('\n❌ 测试出错:');
    if (error.response) {
      console.error('状态码:', error.response.status);
      console.error('错误信息:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('无法连接到服务器。请确保后端服务正在运行。');
      console.error('运行命令: cd backend && npm start');
    } else {
      console.error(error.message);
    }
  }
}

// 运行测试
console.log('🖼️  AI情感支持聊天系统 - 图片识别测试');
console.log('─'.repeat(50));
testImageRecognition();