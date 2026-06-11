/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Whiteboard } from './components/Whiteboard';
import { Toolbar } from './components/Toolbar';
import { BottomPanel } from './components/BottomPanel';
import { ShareModal } from './components/ShareModal';
import { ResetModal } from './components/ResetModal';
import {
  ToolType,
  BackgroundType,
  BottomTabType,
  Stroke,
  CanvasElement,
  StampType,
  StickerType,
  TapeType,
} from './types';

export default function App() {
  // Master Interactive State History Engine
  const [history, setHistory] = useState<{ strokes: Stroke[]; elements: CanvasElement[] }[]>([
    { strokes: [], elements: [] },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Active board components retrieved from index
  const currentHistory = history[historyIndex] || { strokes: [], elements: [] };
  const strokes = currentHistory.strokes;
  const elements = currentHistory.elements;

  // Active Tool state
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [background, setBackground] = useState<BackgroundType>('plain');

  // Brush styling characteristics
  const [penColor, setPenColor] = useState('#006CFF'); // Main default color
  const [penWidth, setPenWidth] = useState(4);
  const [penOpacity, setPenOpacity] = useState(1.0);
  const [brushType, setBrushType] = useState<'pen' | 'highlighter' | 'calligraphy' | 'dashed' | 'crayon' | 'rainbow'>('pen');

  // Interactive Bottom Tabs Setup
  const [bottomTab, setBottomTab] = useState<BottomTabType>('pen');

  // Modals visibility indicators
  const [shareOpen, setShareOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  // Element selection indicator
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Sub-tool contextual states
  const [selectedShapeType, setSelectedShapeType] = useState<'rectangle' | 'circle' | 'triangle' | 'arrow'>('rectangle');
  const [selectedRulerType, setSelectedRulerType] = useState<'line' | 'triangle' | 'circle'>('line');

  const handleSelectRulerType = (type: 'line' | 'triangle' | 'circle') => {
    setSelectedRulerType(type);
    
    // Immediately spawn a beautiful physical ruler at exact center coordinates (1000x1100)
    const newId = Math.random().toString();
    let rW = 380;
    let rH = 80;
    if (type === 'triangle' || type === 'circle') {
      rW = 260;
      rH = 260;
    }

    const newEl: CanvasElement = {
      id: newId,
      type: 'ruler',
      x: 500, // exact VIRTUAL_WIDTH / 2
      y: 550, // exact VIRTUAL_HEIGHT / 2
      width: rW,
      height: rH,
      rotation: 0,
      scale: 1.0,
      subType: type,
      color: penColor,
    };

    const nextElements = [...elements, newEl];
    setElements(nextElements);
    setSelectedElementId(newId);
    setActiveTool('select'); // Switch to Selection mode immediately for instant rotation & translation!
  };

  // History pushing handler
  const saveState = (newStrokes?: Stroke[], newElements?: CanvasElement[]) => {
    const freshStrokes = newStrokes !== undefined ? newStrokes : strokes;
    const freshElements = newElements !== undefined ? newElements : elements;

    // Prune forward redos if timeline changed
    const activeTimeline = history.slice(0, historyIndex + 1);
    const nextTimeline = [...activeTimeline, { strokes: freshStrokes, elements: freshElements }];

    setHistory(nextTimeline);
    setHistoryIndex(nextTimeline.length - 1);
  };

  // State setters updating through history tracker
  const setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>> = (val) => {
    const nextStrokes = typeof val === 'function' ? val(strokes) : val;
    saveState(nextStrokes, elements);
  };

  const setElements: React.Dispatch<React.SetStateAction<CanvasElement[]>> = (val) => {
    const nextElements = typeof val === 'function' ? val(elements) : val;
    saveState(strokes, nextElements);
  };

  // System actions
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSelectedElementId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSelectedElementId(null);
    }
  };

  const handleClearAllBoard = () => {
    saveState([], []);
    setSelectedElementId(null);
  };

  // SPAWNER EVENTS - Automatically positions elements in the center and selects them for immediate modification
  const handleSpawnStamp = (stamp: StampType) => {
    const newId = Math.random().toString();
    const newEl: CanvasElement = {
      id: newId,
      type: 'stamp',
      subType: stamp,
      x: 600, // exact screen middle of 1200x900
      y: 450,
      width: 100,
      height: 100,
      rotation: 0,
      scale: 1.0,
      color: penColor, // inherits current selected color
    };

    const nextElements = [...elements, newEl];
    setElements(nextElements);
    setSelectedElementId(newId);
    setActiveTool('select'); // switches to pointer tool immediately so user can drag or scale!
  };

  const handleSpawnSticker = (sticker: StickerType) => {
    const newId = Math.random().toString();
    const isMemo = sticker.startsWith('memo_');

    const newEl: CanvasElement = {
      id: newId,
      type: isMemo ? 'note' : 'sticker',
      subType: sticker,
      x: 600,
      y: 450,
      width: isMemo ? 180 : 120,
      height: isMemo ? 180 : 120,
      rotation: 0,
      scale: 1.0,
      value: isMemo ? '여기에 소중한 기록을 채워두세요.' : undefined,
      bgColor: sticker === 'memo_yellow' ? '#FEF08A' : sticker === 'memo_pink' ? '#FBCFE8' : undefined,
    };

    const nextElements = [...elements, newEl];
    setElements(nextElements);
    setSelectedElementId(newId);
    setActiveTool('select');
  };

  const handleSpawnTape = (tape: TapeType) => {
    const newId = Math.random().toString();
    const newEl: CanvasElement = {
      id: newId,
      type: 'tape',
      subType: tape,
      x: 600,
      y: 450,
      width: 220,
      height: 40,
      rotation: -12, // cute tilted washi look
      scale: 1.0,
    };

    const nextElements = [...elements, newEl];
    setElements(nextElements);
    setSelectedElementId(newId);
    setActiveTool('select');
  };

  const handleSpawnPaper = (type: string, param: string) => {
    const newId = Math.random().toString();
    let newEl: CanvasElement;

    // Custom badges / Note templates
    if (type === 'date_badge') {
      newEl = {
        id: newId,
        type: 'text',
        x: 600,
        y: 450,
        width: 180,
        height: 48,
        rotation: 0,
        scale: 1.3,
        value: `🗓️ ${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}`,
        color: param || '#006CFF',
      };
    } else if (type === 'emoji_badge') {
      newEl = {
        id: newId,
        type: 'text',
        x: 600,
        y: 450,
        width: 70,
        height: 70,
        rotation: 0,
        scale: 2.2,
        value: param,
      };
    } else if (type === 'eval_badge') {
      newEl = {
        id: newId,
        type: 'text',
        x: 600,
        y: 450,
        width: 160,
        height: 40,
        rotation: -4,
        scale: 1.5,
        value: `🏅 [${param}]`,
        color: '#EF4444',
      };
    } else if (type === 'goal_box') {
      newEl = {
        id: newId,
        type: 'note',
        x: 600,
        y: 450,
        width: 220,
        height: 120,
        rotation: 0,
        scale: 1.0,
        value: '[오늘의 목표]\n1. \n2. ',
        bgColor: '#FFFFFF',
      };
    } else if (type === 'checklist') {
      newEl = {
        id: newId,
        type: 'note',
        x: 600,
        y: 450,
        width: 240,
        height: 190,
        rotation: 0,
        scale: 1.0,
        value: '■ 체크리스트\n□ 국어 복습 완\n□ 단어 암기 완\n□ 수학 오답 보',
        bgColor: '#F8FAFC',
      };
    } else {
      // standard custom-colored memo paper
      newEl = {
        id: newId,
        type: 'note',
        x: 600,
        y: 450,
        width: 190,
        height: 190,
        rotation: 0,
        scale: 1.0,
        value: '여기에 기록을 남겨보세요.',
        bgColor: param || '#FFFFFF',
      };
    }

    const nextElements = [...elements, newEl];
    setElements(nextElements);
    setSelectedElementId(newId);
    setActiveTool('select');
  };

  return (
    <div
      className="w-screen h-screen bg-[#EBF4FF] flex items-center justify-center overflow-hidden font-sans"
      style={{ boxSizing: 'border-box' }}
    >
      {/* 
        Sleek, border-free digital signage container.
        Locks perfectly to 1080x1920 portrait ratio (9:16) and scales proportionally
        to fit standard displays with zero vertical or horizontal scrolling.
      */}
      <div
        className="relative bg-[#EBF4FF] flex flex-col justify-between overflow-hidden self-center rounded-none"
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '9 / 16',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        id="lecture-tablet-mock-frame"
      >
        {/* 1. Header Navigation elements */}
        <Header
          onShare={() => setShareOpen(true)}
          onClose={() => setResetOpen(true)}
          title="판서 보드"
        />

        {/* 2. Main Whiteboard Canvas */}
        <Whiteboard
          activeTool={activeTool}
          background={background}
          penColor={penColor}
          penWidth={penWidth}
          penOpacity={penOpacity}
          brushType={brushType}
          strokes={strokes}
          setStrokes={setStrokes}
          elements={elements}
          setElements={setElements}
          saveState={saveState}
          selectedElementId={selectedElementId}
          setSelectedElementId={setSelectedElementId}
          selectedShapeType={selectedShapeType}
          setSelectedShapeType={setSelectedShapeType}
          selectedRulerType={selectedRulerType}
          setSelectedRulerType={setSelectedRulerType}
        />

        {/* Vertical Spacing element */}
        <div className="h-2" />

        {/* 3. Floating Toolbar center-pin */}
        <Toolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          penColor={penColor}
          setPenColor={setPenColor}
          selectedShapeType={selectedShapeType}
          setSelectedShapeType={setSelectedShapeType}
          selectedRulerType={selectedRulerType}
          setSelectedRulerType={handleSelectRulerType}
        />

        {/* Vertical Spacing element */}
        <div className="h-3" />

        {/* 4. Bottom Tab Submenu control center */}
        <BottomPanel
          activeTab={bottomTab}
          setActiveTab={setBottomTab}
          penWidth={penWidth}
          setPenWidth={setPenWidth}
          penColor={penColor}
          setPenColor={setPenColor}
          penOpacity={penOpacity}
          setPenOpacity={setPenOpacity}
          brushType={brushType}
          setBrushType={setBrushType}
          onSelectStamp={handleSpawnStamp}
          onSelectSticker={handleSpawnSticker}
          onSelectBackground={setBackground}
          onSelectTape={handleSpawnTape}
          onSelectPaper={handleSpawnPaper}
          currentBg={background}
          setActiveTool={setActiveTool}
        />

        {/* INTERACTIVE POPUP MODALS */}
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          strokes={strokes}
          elements={elements}
          background={background}
        />

        <ResetModal
          isOpen={resetOpen}
          onClose={() => setResetOpen(false)}
          onConfirm={handleClearAllBoard}
        />
      </div>
    </div>
  );
}
