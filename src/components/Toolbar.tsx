/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ToolType,
} from '../types';
import {
  MousePointer,
  PenTool,
  Type,
  Shapes,
  Ruler,
  Eraser,
  Undo2,
  Redo2,
} from 'lucide-react';

interface ToolbarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  // Ink states
  penColor: string;
  setPenColor: (color: string) => void;
  // Sub-tool contextual states
  selectedShapeType: 'rectangle' | 'circle' | 'triangle' | 'arrow';
  setSelectedShapeType: (type: 'rectangle' | 'circle' | 'triangle' | 'arrow') => void;
  selectedRulerType: 'line' | 'triangle' | 'circle';
  setSelectedRulerType: (type: 'line' | 'triangle' | 'circle') => void;
  eraserWidth: number;
  setEraserWidth: (width: number) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  setActiveTool,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  penColor,
  setPenColor,
  selectedShapeType,
  setSelectedShapeType,
  selectedRulerType,
  setSelectedRulerType,
  eraserWidth,
  setEraserWidth,
}) => {
  // Setup dynamically tracked recent colors (up to 5) initialized with default palette
  const [recentColors, setRecentColors] = React.useState<string[]>([
    '#006CFF', // Default Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#FBBF24', // Yellow
    '#8B5CF6', // Purple
  ]);

  React.useEffect(() => {
    if (penColor) {
      setRecentColors((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== penColor.toLowerCase());
        return [penColor, ...filtered].slice(0, 5);
      });
    }
  }, [penColor]);

  const toolsList: { id: ToolType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'select',
      label: '선택',
      icon: <MousePointer className="w-7 h-7 stroke-[2.5]" />,
    },
    {
      id: 'pen',
      label: '펜',
      icon: <PenTool className="w-7 h-7 stroke-[2.5]" />,
    },
    {
      id: 'text',
      label: '글씨',
      icon: <Type className="w-7 h-7 stroke-[2.5]" />,
    },
    {
      id: 'shape',
      label: '도형그리기',
      icon: <Shapes className="w-7 h-7 stroke-[2.5]" />,
    },
    {
      id: 'ruler',
      label: '자',
      icon: <Ruler className="w-7 h-7 stroke-[2.5]" />,
    },
    {
      id: 'eraser',
      label: '지우개',
      icon: <Eraser className="w-7 h-7 stroke-[2.5]" />,
    },
  ];

  return (
    <div
      className="w-[calc(100%-4rem)] mx-auto bg-white rounded-[32px] border-2 border-slate-200/80 shadow-[0_16px_48px_rgba(0,0,0,0.06)] flex items-center justify-between px-6 py-3 flex-nowrap shrink-0 select-none"
      id="floating-canvas-toolbar"
    >
      {/* 1. Main Interactive Drawing and Editing Tools */}
      <div className="flex items-center gap-1.5" id="toolbar-tools-group">
        {toolsList.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <div key={tool.id} className="relative">
              <button
                onClick={() => setActiveTool(tool.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition duration-200 hover:bg-slate-50 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-[#006CFF] font-normal'
                    : 'text-slate-500'
                }`}
                title={`${tool.label} 도구`}
                id={`tool-${tool.id}`}
              >
                {tool.icon}
                <span className="text-[14px] font-normal tracking-tight leading-none">{tool.label}</span>
              </button>

              {/* A. Contextual floating Shape selection popup */}
              {tool.id === 'shape' && isActive && (
                <div className="absolute bottom-[calc(100%+22px)] left-1/2 transform -translate-x-1/2 bg-white border-2 border-slate-200/85 rounded-[28px] py-4 px-6 shadow-[0_24px_55px_rgba(0,0,0,0.16)] flex items-center gap-4 z-50 select-none animate-fade-in whitespace-nowrap">
                  {[
                    { id: 'rectangle', label: '네모', icon: '■' },
                    { id: 'circle', label: '동그라미', icon: '●' },
                    { id: 'triangle', label: '세모', icon: '▲' },
                    { id: 'arrow', label: '화살표', icon: '➔' }
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedShapeType(sh.id as any);
                      }}
                      className={`px-5 py-3 rounded-2xl font-normal text-[18px] tracking-tight transition cursor-pointer select-none ${
                        selectedShapeType === sh.id
                          ? 'bg-[#006CFF] text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      <span className="mr-1.5 inline-block text-[18px]">{sh.icon}</span>{sh.label}
                    </button>
                  ))}
                </div>
              )}

              {/* B. Contextual floating Ruler selection popup */}
              {tool.id === 'ruler' && isActive && (
                <div className="absolute bottom-[calc(100%+22px)] left-1/2 transform -translate-x-1/2 bg-white border-2 border-slate-200/85 rounded-[28px] py-4 px-6 shadow-[0_24px_55px_rgba(0,0,0,0.16)] flex items-center gap-4 z-50 select-none animate-fade-in whitespace-nowrap">
                  {[
                    { id: 'line', label: '직선자', icon: '📏' },
                    { id: 'triangle', label: '삼각자', icon: '📐' },
                    { id: 'circle', label: '원형자', icon: '⭕' }
                  ].map((rl) => (
                    <button
                      key={rl.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRulerType(rl.id as any);
                      }}
                      className={`px-5 py-3 rounded-2xl font-normal text-[18px] tracking-tight transition cursor-pointer select-none flex items-center gap-2 ${
                        selectedRulerType === rl.id
                          ? 'bg-[#006CFF] text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      <span className="text-[22px]">{rl.icon}</span><span>{rl.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* C. Contextual floating Eraser size adjustment popup */}
              {tool.id === 'eraser' && isActive && (
                <div className="absolute bottom-[calc(100%+22px)] left-1/2 transform -translate-x-1/2 bg-white border-2 border-slate-200/85 rounded-[28px] py-4 px-6 shadow-[0_24px_55px_rgba(0,0,0,0.16)] flex items-center gap-4 z-50 select-none animate-fade-in whitespace-nowrap">
                  <span className="text-slate-400 font-normal text-[16px] mr-1.5">두께:</span>
                  {[
                    { id: 10, label: '초미세', displaySize: 6 },
                    { id: 20, label: '세밀하게', displaySize: 10 },
                    { id: 36, label: '적당히', displaySize: 16 },
                    { id: 56, label: '두껍게', displaySize: 22 },
                    { id: 80, label: '왕지우개', displaySize: 28 },
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEraserWidth(sz.id);
                      }}
                      className={`px-4 py-2.5 rounded-2xl font-normal text-[17px] tracking-tight transition cursor-pointer select-none flex items-center gap-2 ${
                        eraserWidth === sz.id
                          ? 'bg-[#006CFF] text-white shadow-md font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span
                        className="rounded-full inline-block transition-colors"
                        style={{
                          width: `${sz.displaySize}px`,
                          height: `${sz.displaySize}px`,
                          backgroundColor: eraserWidth === sz.id ? '#FFFFFF' : '#94A3B8',
                        }}
                      />
                      <span>{sz.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Separator I */}
      <div className="w-[2px] h-[52px] bg-slate-100/90 mx-3 shrink-0" id="toolbar-sep-1" />

      {/* 2. Undo / Redo Actions */}
      <div className="flex items-center gap-1.5 shrink-0" id="toolbar-history-group">
        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition duration-200 cursor-pointer ${
            canUndo
              ? 'text-slate-500 hover:bg-slate-50 active:scale-95 text-slate-500'
              : 'text-slate-200 cursor-not-allowed'
          }`}
          title="뒤로가기"
          id="btn-undo"
        >
          <Undo2 className="w-7 h-7 stroke-[2.5]" />
          <span className="text-[14px] font-normal tracking-tight leading-none">뒤로가기</span>
        </button>

        {/* Redo */}
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition duration-200 cursor-pointer ${
            canRedo
              ? 'text-slate-500 hover:bg-slate-50 active:scale-95 text-slate-500'
              : 'text-slate-200 cursor-not-allowed'
          }`}
          title="앞으로가기"
          id="btn-redo"
        >
          <Redo2 className="w-7 h-7 stroke-[2.5]" />
          <span className="text-[14px] font-normal tracking-tight leading-none">앞으로가기</span>
        </button>
      </div>

      {/* Separator I */}
      <div className="w-[2px] h-[52px] bg-slate-100/90 mx-3 shrink-0" id="toolbar-sep-2" />

      {/* 3. Recently Selected Colors */}
      <div className="flex items-center gap-2.5 shrink-0 pl-1" id="toolbar-colors-group">
        {recentColors.map((color, idx) => {
          const isSelected = penColor.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={`${color}-${idx}`}
              onClick={() => setPenColor(color)}
              className="w-11 h-11 rounded-xl flex items-center justify-center p-0 cursor-pointer transition relative group active:scale-95"
              style={{ backgroundColor: color }}
              title={`잉크 색 변경: ${color}`}
            >
              {isSelected && (
                <div className="w-7 h-7 rounded-lg bg-white opacity-40 absolute inset-auto animate-ping" />
              )}
              {isSelected && (
                <div className="w-4 h-4 rounded-full bg-white border border-slate-600/10 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
