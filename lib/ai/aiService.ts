import { analysisEngine } from './analysisEngine';
import { responseGenerator } from './responseGenerator';
import { Message, AnalysisResult } from '../../types';
import { generateLayerColor } from '../utils';

interface ProcessMessageOptions {
  includeAnalysis?: boolean;
  responseDelay?: number;
  imageAnalysisTime?: number;
}

class AiService {
  // 处理用户消息
  async processMessage(
    content: string, 
    image?: string, 
    options: ProcessMessageOptions = {}
  ): Promise<{
    response: string;
    analysis: AnalysisResult | null;
  }> {
    const {
      includeAnalysis = true,
      responseDelay = 1000,
      imageAnalysisTime = 500
    } = options;
    
    const hasImage = !!image;
    
    // 添加延迟模拟处理时间
    await this.delay(responseDelay + (hasImage ? imageAnalysisTime : 0));
    
    // 生成回复
    const { response, analysis } = responseGenerator.generateResponse(content, hasImage);
    
    return {
      response,
      analysis: includeAnalysis ? analysis : null
    };
  }

  // 生成对多个消息的分析
  analyzeConversation(messages: Message[]): AnalysisResult[] {
    return messages
      .filter(m => m.role === 'user')
      .map(m => analysisEngine.analyzeMessage(m.content, !!m.image));
  }

  // 生成3D层数据
  generateLayerData(messages: Message[]): any[] {
    const layerData: any[] = [];
    
    messages.forEach(message => {
      if (message.role !== 'ai' || !message.analysis) return;
      
      const { facts, insights, concepts } = message.analysis;
      
      // 事实层
      facts.forEach((fact, index) => {
        layerData.push({
          id: `fact-${message.id}-${index}`,
          type: 'facts',
          content: fact,
          position: this.randomPosition(1),
          color: generateLayerColor('facts'),
          intensity: 0.8,
          relatedMessageId: message.id
        });
      });
      
      // 洞见层
      insights.forEach((insight, index) => {
        layerData.push({
          id: `insight-${message.id}-${index}`,
          type: 'insights',
          content: insight,
          position: this.randomPosition(2),
          color: generateLayerColor('insights'),
          intensity: 0.7,
          relatedMessageId: message.id
        });
      });
      
      // 观念层
      concepts.forEach((concept, index) => {
        layerData.push({
          id: `concept-${message.id}-${index}`,
          type: 'concepts',
          content: concept,
          position: this.randomPosition(3),
          color: generateLayerColor('concepts'),
          intensity: 0.9,
          relatedMessageId: message.id
        });
      });
    });
    
    return layerData;
  }

  // 延迟函数
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 生成随机位置
  private randomPosition(layer: number): [number, number, number] {
    const radius = 5;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    const y = layer * 2; // 不同层级在不同高度
    
    return [x, y, z];
  }

  // 生成鼓励性响应
  getEncouragingResponse(): string {
    return responseGenerator.generateEncouragingResponse();
  }

  // 生成简短回应
  getShortResponse(message: string): string {
    return responseGenerator.generateShortResponse(message);
  }
}

export const aiService = new AiService();
export default aiService;