const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const https = require('https');

console.log('测试 Gemini API 连接...\n');

// 测试基本网络连接
console.log('1. 测试网络连接到 Google API...');
https.get('https://generativelanguage.googleapis.com/', (res) => {
  console.log('Google API 响应状态码:', res.statusCode);
}).on('error', (err) => {
  console.error('网络连接错误:', err.message);
});

// 测试 Gemini API
const apiKey = 'AIzaSyBGFJ2I0p8HTe9RjHEaR3U_M3rJ8wfx9Ck';
const genAI = new GoogleGenerativeAI(apiKey);

async function testGeminiText() {
  console.log('\n2. 测试纯文本生成...');
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say hello in Chinese');
    const response = await result.response;
    console.log('✅ 文本生成成功:', response.text());
  } catch (error) {
    console.error('❌ 文本生成失败:', error.message);
    if (error.message.includes('fetch failed')) {
      console.log('\n可能的解决方案:');
      console.log('1. 检查网络连接');
      console.log('2. 使用代理或VPN');
      console.log('3. 检查 API 密钥是否有效');
    }
  }
}

async function testGeminiImage() {
  console.log('\n3. 测试图片识别...');
  try {
    const imagePath = '/Users/mac/Desktop/合照.jpg';
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([
      '请描述这张图片的内容',
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      }
    ]);
    
    const response = await result.response;
    console.log('✅ 图片识别成功:', response.text());
  } catch (error) {
    console.error('❌ 图片识别失败:', error.message);
  }
}

// 运行测试
(async () => {
  await testGeminiText();
  await testGeminiImage();
  
  console.log('\n\n如果连接失败，请考虑:');
  console.log('1. 使用 OpenRouter API (支持更多模型)');
  console.log('2. 配置 HTTP 代理');
  console.log('3. 使用其他 AI 服务');
})();