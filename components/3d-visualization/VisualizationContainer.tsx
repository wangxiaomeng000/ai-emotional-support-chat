'use client';

import { useEffect, useState, useCallback } from 'react';
import { VisualizationPanel } from '../layout';
import Scene from './Scene';
import { useChat } from '../../hooks/use-chat';
import { LayerData, LayerType } from '../../types';
import { aiService } from '../../lib/ai';

interface VisualizationContainerProps {
  onItemClick?: (item: LayerData) => void;
}

export default function VisualizationContainer({ onItemClick }: VisualizationContainerProps) {
  const { currentSession, selectedLayer, selectLayer } = useChat();
  const [layerData, setLayerData] = useState<LayerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 生成3D层数据
  useEffect(() => {
    if (!currentSession || !currentSession.messages.length) {
      setLayerData([]);
      return;
    }

    setIsLoading(true);
    
    // 模拟数据生成延迟
    setTimeout(() => {
      const data = aiService.generateLayerData(currentSession.messages);
      setLayerData(data);
      setIsLoading(false);
    }, 300);
  }, [currentSession?.messages]);

  // 计算层级统计
  const layerCounts = {
    facts: layerData.filter(item => item.type === 'facts').length,
    insights: layerData.filter(item => item.type === 'insights').length,
    concepts: layerData.filter(item => item.type === 'concepts').length
  };

  // 重置视角
  const handleReset = useCallback(() => {
    // 重置视角的逻辑将由Scene组件处理
    console.log('Reset 3D view');
  }, []);

  // 全屏模式
  const handleFullscreen = useCallback(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }, []);

  // 处理层级选择
  const handleLayerSelect = useCallback((layer: LayerType | null) => {
    selectLayer(layer);
  }, [selectLayer]);

  // 处理3D项目点击
  const handleLayerClick = useCallback((item: LayerData) => {
    console.log('Layer item clicked:', item);
    if (onItemClick) {
      onItemClick(item);
    }
  }, [onItemClick]);

  return (
    <VisualizationPanel
      selectedLayer={selectedLayer}
      onLayerSelect={handleLayerSelect}
      layerCounts={layerCounts}
      onReset={handleReset}
      onFullscreen={handleFullscreen}
    >
      <div className="relative h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">生成可视化数据...</p>
            </div>
          </div>
        )}
        
        <Scene
          layerData={layerData}
          selectedLayer={selectedLayer}
          onLayerClick={handleLayerClick}
          onReset={handleReset}
        />
      </div>
    </VisualizationPanel>
  );
}