/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  ToolType,
  BackgroundType,
  Point,
  Stroke,
  CanvasElement,
  StampType,
  StickerType,
  TapeType,
} from '../types';
import { StampRenderer } from './StampRenderer';
import { StickerRenderer } from './StickerRenderer';
import { getTapeStyle } from '../lib/tapeStyles';
import { getNoteStyle } from '../lib/noteStyles';
import { Trash2, Move, RotateCcw, X, Check, Edit2 } from 'lucide-react';

interface WhiteboardProps {
  activeTool: ToolType;
  background: BackgroundType;
  penColor: string;
  penWidth: number;
  penOpacity: number;
  brushType: 'pen' | 'highlighter' | 'calligraphy' | 'dashed' | 'crayon' | 'rainbow';
  // State lists
  strokes: Stroke[];
  setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>;
  elements: CanvasElement[];
  setElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  // Undo redo tracking
  saveState: (newStrokes?: Stroke[], newElements?: CanvasElement[]) => void;
  // Selection
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  // Sub-tool contextual states
  selectedShapeType: 'rectangle' | 'circle' | 'triangle' | 'arrow';
  setSelectedShapeType: (type: 'rectangle' | 'circle' | 'triangle' | 'arrow') => void;
  selectedRulerType: 'line' | 'triangle' | 'circle';
  setSelectedRulerType: (type: 'line' | 'triangle' | 'circle') => void;
  eraserWidth: number;
}

// Seedable pseudo-random number generator (Mulberry32)
function createRandom(seed: number) {
  let a = seed;
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getSeedFromId(id: string): number {
  let hash = 0;
  if (!id) return 123456789;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) || 123456789;
}

// Calculate shortest distance from point p to line segment ab
function getDistanceToSegment(p: Point, a: Point, b: Point): number {
  const abX = b.x - a.x;
  const abY = b.y - a.y;
  const apX = p.x - a.x;
  const apY = p.y - a.y;
  
  const abLenSq = abX * abX + abY * abY;
  if (abLenSq === 0) {
    return Math.sqrt(apX * apX + apY * apY);
  }
  
  let t = (apX * abX + apY * abY) / abLenSq;
  t = Math.max(0, Math.min(1, t));
  
  const closestX = a.x + t * abX;
  const closestY = a.y + t * abY;
  
  const dx = p.x - closestX;
  const dy = p.y - closestY;
  return Math.sqrt(dx * dx + dy * dy);
}

export const Whiteboard: React.FC<WhiteboardProps> = ({
  activeTool,
  background,
  penColor,
  penWidth,
  penOpacity,
  brushType,
  strokes,
  setStrokes,
  elements,
  setElements,
  saveState,
  selectedElementId,
  setSelectedElementId,
  selectedShapeType,
  setSelectedShapeType,
  selectedRulerType,
  setSelectedRulerType,
  eraserWidth,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);

  const eraseStrokesAtSegment = (pA: Point, pB: Point) => {
    const eraserRadius = eraserWidth; // Eraser size matching visual brush
    let strokeChanged = false;
    const updatedStrokes: Stroke[] = [];

    strokes.forEach((stroke) => {
      const segments: Point[][] = [];
      let currentSegment: Point[] = [];

      stroke.points.forEach((p) => {
        const dist = getDistanceToSegment(p, pA, pB);
        if (dist >= eraserRadius) {
          currentSegment.push(p);
        } else {
          if (currentSegment.length > 0) {
            segments.push(currentSegment);
            currentSegment = [];
          }
          strokeChanged = true;
        }
      });

      if (currentSegment.length > 0) {
        segments.push(currentSegment);
      }

      if (segments.length === 0) {
        // Entire stroke was erased
        strokeChanged = true;
      } else if (segments.length === 1 && segments[0].length === stroke.points.length) {
        // Untouched
        updatedStrokes.push(stroke);
      } else {
        // Split or shortened
        segments.forEach((seg, idx) => {
          updatedStrokes.push({
            ...stroke,
            id: `${stroke.id}_split_${idx}_${Math.random().toString().slice(2, 8)}`,
            points: seg,
          });
        });
        strokeChanged = true;
      }
    });

    if (strokeChanged) {
      setStrokes(updatedStrokes);
    }
  };

  // Dragging and Transform management for elements
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState<Point>({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartDist, setResizeStartDist] = useState<number>(0);
  const [resizeStartScale, setResizeStartScale] = useState<number>(1);
  const [isRotating, setIsRotating] = useState(false);
  const [rotateStartAngle, setRotateStartAngle] = useState<number>(0);
  const [rotateStartElAngle, setRotateStartElAngle] = useState<number>(0);

  // Text inline editing states
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  // Shape and Ruler states
  const [shapeStartPt, setShapeStartPt] = useState<Point | null>(null);
  const [tempShapeBounds, setTempShapeBounds] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [hoverPt, setHoverPt] = useState<Point | null>(null);

  // Dimensions of the virtual canvas
  const VIRTUAL_WIDTH = 1200;
  const VIRTUAL_HEIGHT = 900;

  // React to canvas sizing
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * 2; // high-dpi
        canvasRef.current.height = rect.height * 2;
        canvasRef.current.style.width = `${rect.width}px`;
        canvasRef.current.style.height = `${rect.height}px`;
        drawAll();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const observer = new ResizeObserver(resizeCanvas);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, [strokes, background, penColor, elements]);

  // Main drawing engine redraw trigger
  useEffect(() => {
    drawAll();
  }, [strokes, background, elements, currentStroke, hoverPt]);

  const drawAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = canvas.width;
    const h = canvas.height;

    // Clear physical frame
    ctx.clearRect(0, 0, w, h);

    // Save and apply scale to match the 1000x1100 virtual coordinate box
    ctx.save();
    ctx.scale(w / VIRTUAL_WIDTH, h / VIRTUAL_HEIGHT);

    // Draw background grid patterns if selected
    drawBackgroundPattern(ctx);

    // Render ink strokes with smooth curve
    renderStrokes(ctx);

    // Render current active drawing stroke helper
    if (isDrawing && currentStroke.length > 0) {
      if (activeTool === 'ruler') {
        drawActiveRulerGraphic(ctx);
      }
      renderActiveStroke(ctx);
    }

    // Render beautiful eraser circular contact guide HUD
    if (activeTool === 'eraser' && hoverPt) {
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)'; // soft red Outline
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]); // dashed ring representation
      ctx.beginPath();
      ctx.arc(hoverPt.x, hoverPt.y, eraserWidth, 0, 2 * Math.PI); // dynamic radius
      ctx.stroke();

      // soft semi-transparent core filled shape
      ctx.fillStyle = 'rgba(244, 63, 94, 0.08)';
      ctx.beginPath();
      ctx.arc(hoverPt.x, hoverPt.y, eraserWidth, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  };

  const drawBackgroundPattern = (ctx: CanvasRenderingContext2D) => {
    // 1. Fill base backgrounds
    if (background === 'blackboard') {
      ctx.fillStyle = '#134E4A'; // Classroom dark blackboard green
      ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

      // Blackboard dusty context decoration
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.02;
      const bgRng = createRandom(123456);
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(bgRng() * VIRTUAL_WIDTH, bgRng() * VIRTUAL_HEIGHT, 10 + bgRng() * 80, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Golden wood outline frame
      ctx.strokeStyle = '#92400E';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(3, 3, VIRTUAL_WIDTH - 6, VIRTUAL_HEIGHT - 6);
      return;
    } else {
      ctx.fillStyle = background === 'kraft' ? '#E8C595' : '#FDFBF7'; // Premium soft warm off-white/ivory
      ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    }

    // ... templates
    if (background === 'grid') {
      // Small blue coordinate grids
      ctx.strokeStyle = 'rgba(156,170,236,0.18)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = step; x < VIRTUAL_WIDTH; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, VIRTUAL_HEIGHT);
        ctx.stroke();
      }
      for (let y = step; y < VIRTUAL_HEIGHT; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(VIRTUAL_WIDTH, y);
        ctx.stroke();
      }
    } else if (background === 'lined') {
      // Simple lined notebook pattern
      ctx.strokeStyle = 'rgba(96,165,250,0.25)';
      ctx.lineWidth = 1;
      const spacing = 50;
      for (let y = 100; y < VIRTUAL_HEIGHT; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(VIRTUAL_WIDTH - 40, y);
        ctx.stroke();
      }
      // Single red layout vertical margin key line
      ctx.strokeStyle = 'rgba(239,68,68,0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(100, 0);
      ctx.lineTo(100, VIRTUAL_HEIGHT);
      ctx.stroke();
    } else if (background === 'english') {
      // Four-line English copy practice notebook layouts
      const clusterSpacing = 160;
      const lineGap = 16;
      ctx.lineWidth = 1;

      for (let yStart = 120; yStart < VIRTUAL_HEIGHT - 100; yStart += clusterSpacing) {
        // Line 1: Grey
        ctx.strokeStyle = 'rgba(156,163,175,0.2)';
        ctx.beginPath();
        ctx.moveTo(50, yStart);
        ctx.lineTo(VIRTUAL_WIDTH - 50, yStart);
        ctx.stroke();

        // Line 2: Blue
        ctx.strokeStyle = 'rgba(59,130,246,0.25)';
        ctx.beginPath();
        ctx.moveTo(50, yStart + lineGap);
        ctx.lineTo(VIRTUAL_WIDTH - 50, yStart + lineGap);
        ctx.stroke();

        // Line 3: Pink (baseline)
        ctx.strokeStyle = 'rgba(244,63,94,0.35)';
        ctx.beginPath();
        ctx.moveTo(50, yStart + lineGap * 2);
        ctx.lineTo(VIRTUAL_WIDTH - 50, yStart + lineGap * 2);
        ctx.stroke();

        // Line 4: Grey
        ctx.strokeStyle = 'rgba(156,163,175,0.2)';
        ctx.beginPath();
        ctx.moveTo(50, yStart + lineGap * 3);
        ctx.lineTo(VIRTUAL_WIDTH - 50, yStart + lineGap * 3);
        ctx.stroke();
      }
    } else if (background === 'music') {
      // Music staff lines! Five thin lines repeated
      ctx.strokeStyle = 'rgba(71,85,105,0.25)';
      ctx.lineWidth = 1;
      const staffSpacing = 160;
      const lineGap = 11;
      for (let yStart = 110; yStart < VIRTUAL_HEIGHT - 100; yStart += staffSpacing) {
        for (let i = 0; i < 5; i++) {
          const y = yStart + i * lineGap;
          ctx.beginPath();
          ctx.moveTo(50, y);
          ctx.lineTo(VIRTUAL_WIDTH - 50, y);
          ctx.stroke();
        }
      }
    } else if (background === 'dots') {
      // Elegant dotted grid
      ctx.fillStyle = 'rgba(99,102,241,0.25)';
      const spacing = 35;
      for (let x = spacing; x < VIRTUAL_WIDTH; x += spacing) {
        for (let y = spacing; y < VIRTUAL_HEIGHT; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (background === 'kraft') {
      // Kraft paper texture fibers
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 0.8;
      const bgRng = createRandom(654321);
      for (let i = 0; i < 75; i++) {
        ctx.beginPath();
        const lx = bgRng() * VIRTUAL_WIDTH;
        const ly = bgRng() * VIRTUAL_HEIGHT;
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx + bgRng() * 20 - 10, ly + bgRng() * 8 - 4);
        ctx.stroke();
      }
    } else if (background === 'manuscript') {
      // Red-orange traditional Korean 200-char manuscript squares
      ctx.strokeStyle = 'rgba(220,80,50,0.28)';
      ctx.lineWidth = 1;
      const cellWidth = 36;
      const cellHeight = 36;
      const cols = 20;
      const rows = 22;
      const startX = (VIRTUAL_WIDTH - (cols * cellWidth)) / 2;
      const startY = 80;

      for (let r = 0; r < rows; r++) {
        const y = startY + r * (cellHeight + 11);
        for (let c = 0; c < cols; c++) {
          const x = startX + c * cellWidth;
          ctx.strokeRect(x, y, cellWidth, cellHeight);
        }
      }
    } else if (background === 'graph') {
      // Micro graph paper grid
      for (let x = 20; x < VIRTUAL_WIDTH; x += 20) {
        ctx.strokeStyle = x % 100 === 0 ? 'rgba(14,165,233,0.25)' : 'rgba(14,165,233,0.08)';
        ctx.lineWidth = x % 100 === 0 ? 1.2 : 0.6;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, VIRTUAL_HEIGHT);
        ctx.stroke();
      }
      for (let y = 20; y < VIRTUAL_HEIGHT; y += 20) {
        ctx.strokeStyle = y % 100 === 0 ? 'rgba(14,165,233,0.25)' : 'rgba(14,165,233,0.08)';
        ctx.lineWidth = y % 100 === 0 ? 1.2 : 0.6;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(VIRTUAL_WIDTH, y);
        ctx.stroke();
      }
    }
  };

  const drawSingleStroke = (
    ctx: CanvasRenderingContext2D,
    points: Point[],
    type: string,
    color: string,
    width: number,
    opacity: number,
    strokeSeed?: string | number
  ) => {
    if (points.length < 2) return;
    const seedNum = typeof strokeSeed === 'number' 
      ? strokeSeed 
      : getSeedFromId(strokeSeed || 'default_stroke_seed');
    const rng = createRandom(seedNum);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.globalAlpha = opacity;
    ctx.lineCap = type === 'highlighter' ? 'square' : 'round';
    ctx.lineJoin = 'round';

    // Blackboard specific powdery/glow styling base
    if (background === 'blackboard') {
      ctx.shadowColor = color;
      ctx.shadowBlur = 1.5;
    }

    if (type === 'dashed') {
      ctx.setLineDash([width * 2, width * 2]);
    } else {
      ctx.setLineDash([]);
    }

    if (type === 'calligraphy') {
      // High-performance dynamic multi-bristle calligraphy brush engine
      // Simulates real hair tips spreading, organic density, and variable line-width texturing
      const bristleCount = 8;
      const bristles: { dx: number; dy: number; alpha: number; weight: number }[] = [];
      
      // Seed beautiful hair distribution inside the brush head radius
      for (let b = 0; b < bristleCount; b++) {
        const angle = (b / bristleCount) * Math.PI * 2;
        const distance = (0.15 + rng() * 0.8) * (width * 0.42);
        bristles.push({
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          alpha: 0.3 + rng() * 0.5,
          weight: 0.45 + rng() * 0.55
        });
      }

      // Draw each bristle stream individually
      bristles.forEach((bristle) => {
        ctx.save();
        ctx.lineWidth = Math.max(0.65, width * 0.22 * bristle.weight);
        ctx.strokeStyle = color;
        
        ctx.beginPath();
        let prevPt = points[0];
        ctx.moveTo(prevPt.x + bristle.dx, prevPt.y + bristle.dy);

        for (let i = 1; i < points.length; i++) {
          const currPt = points[i];
          const dx = currPt.x - prevPt.x;
          const dy = currPt.y - prevPt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Speed factor (longer segments indicate rapid motion -> bristles stretch and fade out)
          const speedFactor = Math.min(2.4, Math.max(0.35, dist / 3.8));
          
          // Organic bristle drift
          const spreadX = bristle.dx * speedFactor;
          const spreadY = bristle.dy * speedFactor;
          
          // Dry-out effect at high speed
          ctx.globalAlpha = opacity * bristle.alpha * (1.12 - Math.min(0.6, dist / 20.0));

          const cx = (prevPt.x + currPt.x) / 2;
          const cy = (prevPt.y + currPt.y) / 2;
          
          ctx.quadraticCurveTo(
            prevPt.x + spreadX, 
            prevPt.y + spreadY, 
            cx + spreadX, 
            cy + spreadY
          );
          
          prevPt = currPt;
        }
        ctx.lineTo(points[points.length - 1].x + bristle.dx, points[points.length - 1].y + bristle.dy);
        ctx.stroke();
        ctx.restore();
      });

      // Overlay an organic central ink core to weld the bristle paths beautifully
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width * 0.48;
      ctx.globalAlpha = opacity * 0.76;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
      ctx.restore();
    } else if (type === 'crayon') {
      // Premium wax oil crayon engine with real-world paper tooth porosity and powdery wax crumble debris
      // 1. Draw central textured core using triple jittered micro-dash paths
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = opacity * 0.38;
      
      for (let lineOffset = 0; lineOffset < 3; lineOffset++) {
        const rx = (rng() - 0.5) * (width * 0.18);
        const ry = (rng() - 0.5) * (width * 0.18);
        
        ctx.setLineDash([1.8, Math.max(1.2, width * (0.35 + rng() * 0.45))]);
        ctx.beginPath();
        ctx.moveTo(points[0].x + rx, points[0].y + ry);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x + rx, points[i].y + ry, xc + rx, yc + ry);
        }
        ctx.lineTo(points[points.length - 1].x + rx, points[points.length - 1].y + ry);
        ctx.stroke();
      }
      ctx.restore();

      // 2. High-fidelity wax flaking & crumble splatter
      ctx.save();
      ctx.fillStyle = color;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const specks = Math.max(2, Math.floor(dist / 1.4));
        for (let j = 0; j <= specks; j++) {
          const ratio = j / specks;
          const cx = p1.x + dx * ratio;
          const cy = p1.y + dy * ratio;
          
          const flakeDensity = Math.max(3, Math.floor(width / 2.2));
          for (let p = 0; p < flakeDensity; p++) {
            const angle = rng() * Math.PI * 2;
            const distanceRatio = Math.pow(rng(), 1.6); // heavily dynamic cluster concentration
            const r = distanceRatio * (width * 0.58);
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            
            const crumbSize = 0.8 + rng() * (width * 0.32);
            ctx.globalAlpha = opacity * (0.12 + rng() * 0.78);
            ctx.beginPath();
            
            // Render non-uniform wax textures using ellipse or arc
            if (p % 2 === 0) {
              const rx = crumbSize / 2;
              const ry = crumbSize * (0.35 + rng() * 0.45);
              const rot = rng() * Math.PI;
              ctx.ellipse(px, py, rx, ry, rot, 0, Math.PI * 2);
            } else {
              ctx.arc(px, py, crumbSize / 2, 0, Math.PI * 2);
            }
            ctx.fill();
          }
        }
      }
      ctx.restore();
    } else if (type === 'rainbow') {
      // Pristine smooth multi-band paint roller engine (texture-free, solid colors)
      const rainbowColors = [
        '#EF4444', // Red
        '#F97316', // Orange
        '#FBBF24', // Yellow
        '#10B981', // Green
        '#3B82F6', // Blue
        '#8B5CF6'  // Purple
      ];

      const stripeWidth = width / 4.4; // slight overlap for a blended paint ribbon

      // Calculate normals for each point to prevent any disconnects or breaks
      const normals: { x: number; y: number }[] = [];
      for (let k = 0; k < points.length; k++) {
        let dx = 0;
        let dy = 0;
        if (k === 0) {
          dx = points[1].x - points[0].x;
          dy = points[1].y - points[0].y;
        } else if (k === points.length - 1) {
          dx = points[k].x - points[k - 1].x;
          dy = points[k].y - points[k - 1].y;
        } else {
          dx = points[k + 1].x - points[k - 1].x;
          dy = points[k + 1].y - points[k - 1].y;
        }
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.1) {
          normals.push(k > 0 ? normals[k - 1] : { x: 0, y: -1 });
        } else {
          normals.push({ x: -dy / dist, y: dx / dist });
        }
      }

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw individual continuous colored paint lanes
      rainbowColors.forEach((stripeColor, index) => {
        const offsetRatio = index - (rainbowColors.length - 1) / 2;
        const offsetDistance = offsetRatio * (width / rainbowColors.length);

        ctx.beginPath();
        ctx.strokeStyle = stripeColor;
        ctx.lineWidth = stripeWidth;

        const firstPtX = points[0].x + normals[0].x * offsetDistance;
        const firstPtY = points[0].y + normals[0].y * offsetDistance;
        ctx.moveTo(firstPtX, firstPtY);

        for (let k = 1; k < points.length; k++) {
          const ptX = points[k].x + normals[k].x * offsetDistance;
          const ptY = points[k].y + normals[k].y * offsetDistance;
          ctx.lineTo(ptX, ptY);
        }
        ctx.stroke();
      });
      ctx.restore();
    } else if (type === 'pen' || type === 'default' || !['dashed', 'calligraphy', 'crayon', 'rainbow', 'highlighter'].includes(type)) {
      // Just a clean, beautiful and smooth gel pen line using quadratic curves
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
    }

    ctx.restore();
  };

  const renderStrokes = (ctx: CanvasRenderingContext2D) => {
    strokes.forEach((stroke) => {
      drawSingleStroke(ctx, stroke.points, stroke.type, stroke.color, stroke.width, stroke.opacity, stroke.id);
    });
  };

  const drawActiveRulerGraphic = (ctx: CanvasRenderingContext2D) => {
    if (!shapeStartPt || currentStroke.length < 2) return;
    const endPt = currentStroke[currentStroke.length - 1];

    ctx.save();

    if (selectedRulerType === 'line') {
      // 1. STRAIGHT RULER
      const dx = endPt.x - shapeStartPt.x;
      const dy = endPt.y - shapeStartPt.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        ctx.restore();
        return;
      }
      const angle = Math.atan2(dy, dx);

      ctx.translate(shapeStartPt.x, shapeStartPt.y);
      ctx.rotate(angle);

      const rulerLength = dist + 40;
      const rX = -20;
      const rY = 0;
      const rH = 50;

      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(rX, rY, rulerLength, rH, 6);
      } else {
        ctx.rect(rX, rY, rulerLength, rH);
      }
      ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rX + 4, rY + 4);
      ctx.lineTo(rX + rulerLength - 4, rY + 4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(120, 53, 4, 0.85)';
      ctx.fillStyle = 'rgba(120, 53, 4, 0.85)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';

      for (let d = 0; d <= rulerLength; d += 5) {
        const x = rX + d;
        if (x < rX || x > rX + rulerLength) continue;

        let tickLen = 5;
        let drawLabel = false;
        let labelVal = '';

        if (d % 50 === 0) {
          tickLen = 14;
          drawLabel = true;
          labelVal = `${d / 10}cm`;
        } else if (d % 25 === 0) {
          tickLen = 9;
        }

        ctx.beginPath();
        ctx.moveTo(x, rY);
        ctx.lineTo(x, rY + tickLen);
        ctx.lineWidth = d % 50 === 0 ? 1.2 : 0.7;
        ctx.stroke();

        if (drawLabel && d > 0 && d < rulerLength) {
          ctx.fillText(labelVal, x, rY + 24);
        }
      }

      ctx.font = 'bold 8px sans-serif';
      ctx.fillStyle = 'rgba(120, 53, 4, 0.5)';
      ctx.textAlign = 'left';
      ctx.fillText('정밀 직선자 (STANDARD RULER)', rX + 20, rY + 38);

    } else if (selectedRulerType === 'triangle') {
      // 2. SET SQUARE TRIANGLE RULER
      const p1 = shapeStartPt;
      const p2 = { x: endPt.x, y: shapeStartPt.y };
      const p3 = endPt;

      ctx.fillStyle = 'rgba(14, 165, 233, 0.18)';
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.7)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      const w = Math.abs(p2.x - p1.x);
      const h = Math.abs(p3.y - p2.y);
      if (w > 30 && h > 30) {
        const sx = Math.sign(p2.x - p1.x);
        const sy = Math.sign(p3.y - p2.y);
        const inset = 18;

        const ip1 = { x: p1.x + sx * inset * 1.5, y: p1.y + sy * inset * 0.5 };
        const ip2 = { x: p2.x - sx * inset * 0.7, y: p2.y + sy * inset * 0.7 };
        const ip3 = { x: p3.x - sx * inset * 0.5, y: p3.y - sy * inset * 1.5 };

        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.beginPath();
        ctx.moveTo(ip1.x, ip1.y);
        ctx.lineTo(ip2.x, ip2.y);
        ctx.lineTo(ip3.x, ip3.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = 'rgba(2, 132, 199, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ip1.x, ip1.y);
        ctx.lineTo(ip2.x, ip2.y);
        ctx.lineTo(ip3.x, ip3.y);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(3, 105, 161, 0.8)';
      ctx.fillStyle = 'rgba(3, 105, 161, 0.8)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';

      const dx = p2.x - p1.x;
      const stepH = 5 * Math.sign(dx);
      const countH = Math.floor(Math.abs(dx) / 5);

      for (let i = 0; i <= countH; i++) {
        const x = p1.x + i * stepH;
        let tickLen = 4;
        let drawLabel = false;
        if (i % 10 === 0) {
          tickLen = 10;
          drawLabel = true;
        } else if (i % 5 === 0) {
          tickLen = 7;
        }

        ctx.beginPath();
        ctx.moveTo(x, p1.y);
        ctx.lineTo(x, p1.y + (p3.y > p1.y ? tickLen : -tickLen));
        ctx.lineWidth = i % 10 === 0 ? 1 : 0.6;
        ctx.stroke();

        if (drawLabel && i > 0 && i < countH) {
          ctx.fillText(`${i / 2}cm`, x, p1.y + (p3.y > p1.y ? tickLen + 8 : -tickLen - 2));
        }
      }

      const dy = p3.y - p2.y;
      const stepV = 5 * Math.sign(dy);
      const countV = Math.floor(Math.abs(dy) / 5);
      ctx.textAlign = 'left';

      for (let i = 0; i <= countV; i++) {
        const y = p2.y + i * stepV;
        let tickLen = 4;
        let drawLabel = false;
        if (i % 10 === 0) {
          tickLen = 10;
          drawLabel = true;
        } else if (i % 5 === 0) {
          tickLen = 7;
        }

        ctx.beginPath();
        ctx.moveTo(p2.x, y);
        ctx.lineTo(p2.x + (p1.x > p2.x ? tickLen : -tickLen), y);
        ctx.lineWidth = i % 10 === 0 ? 1 : 0.6;
        ctx.stroke();

        if (drawLabel && i > 0 && i < countV) {
          ctx.fillText(`${i / 2}cm`, p2.x + (p1.x > p2.x ? tickLen + 3 : -tickLen - 18), y + 3);
        }
      }

      ctx.font = 'bold 8px sans-serif';
      ctx.fillStyle = 'rgba(3, 105, 161, 0.5)';
      ctx.textAlign = 'center';
      if (w > 60 && h > 60) {
        ctx.fillText('삼각자 (SET SQUARE)', (p1.x + p2.x + p3.x) / 3, p2.y + dy * 0.3);
      }

    } else if (selectedRulerType === 'circle') {
      // 3. CIRCULAR PROTRACTOR DIAL TEMPLATE RULER
      const cx = (shapeStartPt.x + endPt.x) / 2;
      const cy = (shapeStartPt.y + endPt.y) / 2;
      const rx = Math.abs(endPt.x - shapeStartPt.x) / 2;
      const ry = Math.abs(endPt.y - shapeStartPt.y) / 2;

      if (rx > 3 && ry > 3) {
        ctx.fillStyle = 'rgba(236, 72, 153, 0.12)';
        ctx.strokeStyle = 'rgba(219, 39, 119, 0.7)';
        ctx.lineWidth = 1.8;

        const outerRx = rx + 12;
        const outerRy = ry + 12;

        ctx.beginPath();
        ctx.ellipse(cx, cy, outerRx, outerRy, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        const innerRx = Math.max(8, rx - 14);
        const innerRy = Math.max(8, ry - 14);

        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, innerRx, innerRy, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = 'rgba(219, 39, 119, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, innerRx, innerRy, 0, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(219, 39, 119, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx - outerRx + 4, cy);
        ctx.lineTo(cx - innerRx, cy);
        ctx.moveTo(cx + innerRx, cy);
        ctx.lineTo(cx + outerRx - 4, cy);
        ctx.moveTo(cx, cy - outerRy + 4);
        ctx.lineTo(cx, cy - innerRy);
        ctx.moveTo(cx, cy + innerRy);
        ctx.lineTo(cx, cy + outerRy - 4);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(157, 23, 77, 0.75)';
        ctx.fillStyle = 'rgba(157, 23, 77, 0.75)';
        ctx.font = '7px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let angleDeg = 0; angleDeg < 360; angleDeg += 10) {
          const rad = (angleDeg * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);

          const startX = cx + rx * cos;
          const startY = cy + ry * sin;

          const tickLen = angleDeg % 90 === 0 ? 12 : angleDeg % 30 === 0 ? 8 : 4;
          const endX = cx + (rx + tickLen) * cos;
          const endY = cy + (ry + tickLen) * sin;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.lineWidth = angleDeg % 90 === 0 ? 1.2 : 0.6;
          ctx.stroke();

          if (angleDeg % 30 === 0 && rx > 35) {
            const numX = cx + (rx + tickLen + 8) * cos;
            const numY = cy + (ry + tickLen + 8) * sin;
            ctx.fillText(`${angleDeg}°`, numX, numY);
          }
        }

        if (rx > 50) {
          ctx.font = 'bold 7px sans-serif';
          ctx.fillStyle = 'rgba(157, 23, 77, 0.45)';
          ctx.textAlign = 'center';
          ctx.fillText('학습용 원형자 (PROTRACTOR)', cx, cy - innerRy - 4);
        }
      }
    }

    ctx.restore();
  };

  const renderActiveStroke = (ctx: CanvasRenderingContext2D) => {
    if (activeTool === 'eraser') {
      // Draw a soft translucent pink-rose eraser trail representation
      drawSingleStroke(
        ctx,
        currentStroke,
        'eraser',
        'rgba(244, 63, 94, 0.25)', // beautiful translucent rose
        eraserWidth * 2, // dynamic thickness matching eraser radius
        1.0,
        "active_eraser_stroke"
      );
    } else {
      drawSingleStroke(
        ctx,
        currentStroke,
        activeTool === 'highlighter' ? 'highlighter' : brushType,
        penColor,
        penWidth,
        penOpacity,
        "active_drawing_stroke"
      );
    }
  };

  // Convert browser cursor client space to virtual coordinate bounds
  const getVirtualCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): Point => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * VIRTUAL_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * VIRTUAL_HEIGHT;

    return {
      x: Math.max(0, Math.min(VIRTUAL_WIDTH, x)),
      y: Math.max(0, Math.min(VIRTUAL_HEIGHT, y)),
    };
  };

  // EVENT HANDLERS
  const startDrawingOrSelection = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const pt = getVirtualCoordinates(e);

    // 1. Shape Mode
    if (activeTool === 'shape') {
      setIsDrawing(true);
      setShapeStartPt(pt);
      setTempShapeBounds({ x: pt.x, y: pt.y, w: 0, h: 0 });
      return;
    }

    // 2. Selector Mode or Ruler Mode
    if (activeTool === 'select' || activeTool === 'ruler') {
      // Find elements clicked (search in reverse order to tap foremost elements first)
      const clickedEl = [...elements]
        .reverse()
        .find((el) => {
          // Approximate hit testing for simple drag selection
          const halfW = (el.width * el.scale) / 2;
          const halfH = (el.height * el.scale) / 2;
          return (
            pt.x >= el.x - halfW &&
            pt.x <= el.x + halfW &&
            pt.y >= el.y - halfH &&
            pt.y <= el.y + halfH
          );
        });

      if (clickedEl) {
        setSelectedElementId(clickedEl.id);
        setDragStartOffset({
          x: pt.x - clickedEl.x,
          y: pt.y - clickedEl.y,
        });
        setIsDragging(true);
      } else {
        if (activeTool === 'ruler') {
          // Empty space click in Ruler Mode: Spawn a beautiful physical ruler!
          const newId = Math.random().toString();
          let rW = 380;
          let rH = 80;
          if (selectedRulerType === 'triangle') {
            rW = 260;
            rH = 260;
          } else if (selectedRulerType === 'circle') {
            rW = 260;
            rH = 260;
          }

          const newEl: CanvasElement = {
            id: newId,
            type: 'ruler',
            x: pt.x,
            y: pt.y,
            width: rW,
            height: rH,
            rotation: 0,
            scale: 1.0,
            subType: selectedRulerType,
            color: penColor,
          };

          const updated = [...elements, newEl];
          setElements(updated);
          setSelectedElementId(newId);
          saveState(strokes, updated);
        } else {
          setSelectedElementId(null);
        }
      }
      return;
    }

    // 4. Eraser Mode: Click erasing elements
    if (activeTool === 'eraser') {
      const hitIndex = [...elements].reverse().findIndex((el) => {
        const halfW = (el.width * el.scale) / 2;
        const halfH = (el.height * el.scale) / 2;
        return (
          pt.x >= el.x - halfW &&
          pt.x <= el.x + halfW &&
          pt.y >= el.y - halfH &&
          pt.y <= el.y + halfH
        );
      });

      if (hitIndex !== -1) {
        // Flip the reverse index back to positive
        const actualIndex = elements.length - 1 - hitIndex;
        const copyElements = [...elements];
        copyElements.splice(actualIndex, 1);
        setElements(copyElements);
        saveState(strokes, copyElements);
        return;
      }

      // If clicked empty space, start eraser stroke which allows drawing an eraser trail
      setIsDrawing(true);
      setCurrentStroke([pt]);
      eraseStrokesAtSegment(pt, pt);
      return;
    }

    // 5. Spawners: Text & Note directly at pt
    if (activeTool === 'text') {
      const newId = Math.random().toString();
      const newEl: CanvasElement = {
        id: newId,
        type: 'text',
        x: pt.x,
        y: pt.y,
        width: 180,
        height: 50,
        rotation: 0,
        scale: 1.2,
        value: '텍스트 입력',
        color: penColor,
      };
      const updated = [...elements, newEl];
      setElements(updated);
      setSelectedElementId(newId);
      setEditingElementId(newId);
      setEditingValue('텍스트 입력');
      saveState(strokes, updated);
      return;
    }

    if (activeTool === 'note') {
      const newId = Math.random().toString();
      const newEl: CanvasElement = {
        id: newId,
        type: 'note',
        x: pt.x,
        y: pt.y,
        width: 180,
        height: 180,
        rotation: 0,
        scale: 1.0,
        value: '여기에 메모를 입력하세요.',
        bgColor: '#FEF08A', // Yellow stickie note default
      };
      const updated = [...elements, newEl];
      setElements(updated);
      setSelectedElementId(newId);
      setEditingElementId(newId);
      setEditingValue('여기에 메모를 입력하세요.');
      saveState(strokes, updated);
      return;
    }

    // 6. Drawing Mode
    if (activeTool === 'pen' || activeTool === 'highlighter') {
      setIsDrawing(true);
      setCurrentStroke([pt]);
    }
  };

  const handleDrawingAndMoving = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    // Prevent standard scroll on mobile touch events
    if (e.cancelable) e.preventDefault();

    const pt = getVirtualCoordinates(e);

    // Track cursor location for drawing special cues (like eraser ring)
    if (activeTool === 'eraser') {
      setHoverPt(pt);
    } else if (hoverPt !== null) {
      setHoverPt(null);
    }

    // Dynamic Shape Move
    if (isDrawing && activeTool === 'shape' && shapeStartPt) {
      const minX = Math.min(shapeStartPt.x, pt.x);
      const minY = Math.min(shapeStartPt.y, pt.y);
      const w = Math.abs(shapeStartPt.x - pt.x);
      const h = Math.abs(shapeStartPt.y - pt.y);
      setTempShapeBounds({ x: minX, y: minY, w, h });
      return;
    }

    // Dynamic Ruler line
    if (isDrawing && activeTool === 'ruler' && shapeStartPt) {
      if (selectedRulerType === 'triangle') {
        const p1 = shapeStartPt;
        const p2 = { x: pt.x, y: shapeStartPt.y };
        const p3 = pt;
        setCurrentStroke([p1, p2, p3, p1]);
      } else if (selectedRulerType === 'circle') {
        const pts: Point[] = [];
        const cx = (shapeStartPt.x + pt.x) / 2;
        const cy = (shapeStartPt.y + pt.y) / 2;
        const rx = Math.abs(pt.x - shapeStartPt.x) / 2;
        const ry = Math.abs(pt.y - shapeStartPt.y) / 2;
        for (let i = 0; i <= 40; i++) {
          const theta = (i / 40) * 2 * Math.PI;
          pts.push({ x: cx + rx * Math.cos(theta), y: cy + ry * Math.sin(theta) });
        }
        setCurrentStroke(pts);
      } else {
        setCurrentStroke([shapeStartPt, pt]);
      }
      return;
    }

    // 1. Dragging Elements (Fallback handled globally by window event listeners)
    if (isDragging && selectedElementId && (activeTool === 'select' || activeTool === 'ruler')) {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id === selectedElementId) {
            return {
              ...el,
              x: Math.max(0, Math.min(VIRTUAL_WIDTH, pt.x - dragStartOffset.x)),
              y: Math.max(0, Math.min(VIRTUAL_HEIGHT, pt.y - dragStartOffset.y)),
            };
          }
          return el;
        })
      );
      return;
    }

    // 2. Drag Eraser interaction with drawn marks - Splits segments to erase touched coordinates only!
    if (isDrawing && activeTool === 'eraser') {
      const pA = currentStroke.length > 0 ? currentStroke[currentStroke.length - 1] : pt;
      eraseStrokesAtSegment(pA, pt);
    }

    // 3. Drawing strokes
    if (isDrawing && (activeTool === 'pen' || activeTool === 'highlighter' || activeTool === 'eraser')) {
      setCurrentStroke((prev) => [...prev, pt]);
    }
  };

  const finishDrawingOrMoving = () => {
    if (isDrawing && activeTool === 'shape' && shapeStartPt && tempShapeBounds) {
      const { w, h } = tempShapeBounds;
      if (w > 5 || h > 5) {
        const newId = Math.random().toString();
        // Calculate center point for rotation and position
        const centerPt = {
          x: tempShapeBounds.x + w / 2,
          y: tempShapeBounds.y + h / 2,
        };
        const newEl: CanvasElement = {
          id: newId,
          type: 'shape',
          x: centerPt.x,
          y: centerPt.y,
          width: w,
          height: h,
          rotation: 0,
          scale: 1.0,
          subType: selectedShapeType,
          color: penColor,
        };
        const updated = [...elements, newEl];
        setElements(updated);
        setSelectedElementId(newId);
        saveState(strokes, updated);
      }
      setIsDrawing(false);
      setShapeStartPt(null);
      setTempShapeBounds(null);
      return;
    }

    if (isDrawing && activeTool === 'ruler' && shapeStartPt) {
      if (currentStroke.length > 1) {
        const newStroke: Stroke = {
          id: Math.random().toString(),
          points: currentStroke,
          color: penColor,
          width: penWidth,
          opacity: penOpacity,
          type: brushType,
        };
        const updated = [...strokes, newStroke];
        setStrokes(updated);
        saveState(updated, elements);
      }
      setIsDrawing(false);
      setShapeStartPt(null);
      setCurrentStroke([]);
      return;
    }

    if (isDragging && selectedElementId) {
      setIsDragging(false);
      saveState(strokes, elements);
    }

    if (isDrawing) {
      setIsDrawing(false);
      if (currentStroke.length > 1) {
        if (activeTool === 'eraser') {
          // Clear current temporary eraser trail
          setCurrentStroke([]);
          saveState(strokes, elements);
        } else {
          const newStroke: Stroke = {
            id: Math.random().toString(),
            points: currentStroke,
            color: penColor,
            width: penWidth,
            opacity: penOpacity,
            type: activeTool === 'highlighter' ? 'highlighter' : brushType,
          };
          const updated = [...strokes, newStroke];
          setStrokes(updated);
          saveState(updated, elements);
          setCurrentStroke([]);
        }
      }
    }

    // Stop all element helpers
    setIsResizing(false);
    setIsRotating(false);
    setIsDragging(false);
    setHoverPt(null);
  };

  // HANDLERS FOR THE ACTIVE ELEMENT BOUNCING EXTRAS (RESIZE, ROTATE, DELETE)
  const handleElementDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = elements.filter((el) => el.id !== id);
    setElements(filtered);
    setSelectedElementId(null);
    saveState(strokes, filtered);
  };

  const startElementResize = (el: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);

    const pt = getVirtualCoordinates(e as any);
    const dx = pt.x - el.x;
    const dy = pt.y - el.y;
    const currentDist = Math.sqrt(dx * dx + dy * dy);

    setResizeStartDist(currentDist);
    setResizeStartScale(el.scale);
  };

  const startElementRotate = (el: CanvasElement, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const pt = getVirtualCoordinates(e as any);
    const rad = Math.atan2(pt.y - el.y, pt.x - el.x);
    const deg = (rad * 180) / Math.PI;

    setRotateStartAngle(deg);
    setRotateStartElAngle(el.rotation || 0);
  };

  // Drag listeners specifically for Floating handles & Selected Element dragging (since mouse/touch might leave target bounds)
  useEffect(() => {
    const handleGlobalMove = (clientX: number, clientY: number) => {
      if (!selectedElementId) return;
      const el = elements.find((item) => item.id === selectedElementId);
      if (!el || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const pX = ((clientX - rect.left) / rect.width) * VIRTUAL_WIDTH;
      const pY = ((clientY - rect.top) / rect.height) * VIRTUAL_HEIGHT;
      const pt = { x: pX, y: pY };

      if (isDragging && activeTool === 'select') {
        const targetX = Math.max(0, Math.min(VIRTUAL_WIDTH, pt.x - dragStartOffset.x));
        const targetY = Math.max(0, Math.min(VIRTUAL_HEIGHT, pt.y - dragStartOffset.y));
        setElements((prev) =>
          prev.map((item) => {
            if (item.id === selectedElementId) {
              return { ...item, x: targetX, y: targetY };
            }
            return item;
          })
        );
      } else if (isResizing) {
        const dx = pt.x - el.x;
        const dy = pt.y - el.y;
        const currentDist = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = resizeStartDist > 0 ? (currentDist / resizeStartDist) : 1;
        const newScale = Math.max(0.3, Math.min(5, resizeStartScale * scaleFactor));

        setElements((prev) =>
          prev.map((item) => (item.id === selectedElementId ? { ...item, scale: newScale } : item))
        );
      } else if (isRotating) {
        const rad = Math.atan2(pt.y - el.y, pt.x - el.x);
        let deg = (rad * 180) / Math.PI;
        const deltaAngle = deg - rotateStartAngle;
        const newRotation = (rotateStartElAngle + deltaAngle) % 360;

        setElements((prev) =>
          prev.map((item) => (item.id === selectedElementId ? { ...item, rotation: newRotation } : item))
        );
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleGlobalMove(e.clientX, e.clientY);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleGlobalMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isResizing || isRotating || isDragging) {
        setIsResizing(false);
        setIsRotating(false);
        setIsDragging(false);
        saveState(strokes, elements);
      }
    };

    if (isResizing || isRotating || isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [
    isResizing,
    isRotating,
    isDragging,
    selectedElementId,
    elements,
    strokes,
    dragStartOffset,
    resizeStartDist,
    resizeStartScale,
    rotateStartAngle,
    rotateStartElAngle,
    activeTool,
  ]);

  // Dynamically recolor selected element if penColor changes and we are in select mode
  useEffect(() => {
    if (selectedElementId && activeTool === 'select') {
      const el = elements.find((item) => item.id === selectedElementId);
      if (el && (el.type === 'stamp' || el.type === 'text' || el.type === 'shape')) {
        const updated = elements.map((item) => {
          if (item.id === selectedElementId) {
            return { ...item, color: penColor };
          }
          return item;
        });
        setElements(updated);
        saveState(strokes, updated);
      }
    }
  }, [penColor]);

  // Inline text editing double click handler
  const handleElementDoubleClick = (el: CanvasElement, e: React.MouseEvent) => {
    if (activeTool !== 'select') return;
    e.stopPropagation();
    setEditingElementId(el.id);
    setEditingValue(el.value || '');
  };

  const handleTextEditSave = () => {
    if (!editingElementId) return;
    const updated = elements.map((el) => {
      if (el.id === editingElementId) {
        return {
          ...el,
          value: editingValue,
          // Auto size slightly based on string size
          width: el.type === 'text' ? Math.max(140, editingValue.length * 14) : el.width,
        };
      }
      return el;
    });
    setElements(updated);
    setEditingElementId(null);
    saveState(strokes, updated);
  };

  return (
    <div className="flex-1 min-h-0 w-full flex items-center justify-center py-[10px] px-6" id="main-whiteboard-canvas-card-wrapper">
      <div
        ref={containerRef}
        className="relative w-full h-full rounded-[48px] border-4 border-slate-200/80 bg-[#FDFBF7] shadow-[0_24px_64px_rgba(0,0,0,0.04)] overflow-hidden cursor-crosshair group-canvas"
        id="main-whiteboard-canvas-card"
      >
      {/* 1. Underlying Interactive Canvas drawing board */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawingOrSelection}
        onMouseMove={handleDrawingAndMoving}
        onMouseUp={finishDrawingOrMoving}
        onMouseLeave={finishDrawingOrMoving}
        onTouchStart={startDrawingOrSelection}
        onTouchMove={handleDrawingAndMoving}
        onTouchEnd={finishDrawingOrMoving}
        className="absolute top-0 left-0 w-full h-full block z-10"
      />

      {/* 2. Floating elements layer (Stamps, Stickers, Stickies, Text) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        {elements.map((el) => {
          const isSelected = selectedElementId === el.id && activeTool === 'select';
          const isEditing = editingElementId === el.id;

          // Convert virtual 1000x1100 to percentage relative position
          const leftPercent = `${(el.x / VIRTUAL_WIDTH) * 100}%`;
          const topPercent = `${(el.y / VIRTUAL_HEIGHT) * 100}%`;

          return (
            <div
              key={el.id}
              className={`absolute origin-center select-none ${
                isSelected ? 'pointer-events-auto z-40' : 'pointer-events-auto z-30'
              }`}
              style={{
                left: leftPercent,
                top: topPercent,
                width: `${el.width}px`,
                height: `${el.height}px`,
                marginLeft: `-${el.width / 2}px`,
                marginTop: `-${el.height / 2}px`,
                transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
                transition: isDragging && selectedElementId === el.id ? 'none' : 'transform 0.05s ease-out',
              }}
              onMouseDown={(e) => {
                if (activeTool === 'select') {
                  e.stopPropagation();
                  e.preventDefault(); // Prevents default browser text select / outline drags
                  setSelectedElementId(el.id);
                  const pt = {
                    x: ((e.clientX - containerRef.current!.getBoundingClientRect().left) / containerRef.current!.getBoundingClientRect().width) * VIRTUAL_WIDTH,
                    y: ((e.clientY - containerRef.current!.getBoundingClientRect().top) / containerRef.current!.getBoundingClientRect().height) * VIRTUAL_HEIGHT,
                  };
                  setDragStartOffset({ x: pt.x - el.x, y: pt.y - el.y });
                  setIsDragging(true);
                } else if (activeTool === 'eraser') {
                  // Instant tap deletion
                  handleElementDelete(el.id, e);
                }
              }}
              onTouchStart={(e) => {
                if (activeTool === 'select') {
                  e.stopPropagation();
                  e.preventDefault();
                  setSelectedElementId(el.id);
                  if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    const pt = {
                      x: ((touch.clientX - containerRef.current!.getBoundingClientRect().left) / containerRef.current!.getBoundingClientRect().width) * VIRTUAL_WIDTH,
                      y: ((touch.clientY - containerRef.current!.getBoundingClientRect().top) / containerRef.current!.getBoundingClientRect().height) * VIRTUAL_HEIGHT,
                    };
                    setDragStartOffset({ x: pt.x - el.x, y: pt.y - el.y });
                    setIsDragging(true);
                  }
                } else if (activeTool === 'eraser') {
                  handleElementDelete(el.id, e as any);
                }
              }}
              onDoubleClick={(e) => handleElementDoubleClick(el, e)}
            >
              {/* Outer Bounding box outline for SELECTED state */}
              {isSelected && (
                <div className="absolute -inset-3.5 border-2 border-dashed border-[#006CFF] rounded-lg animate-pulse" />
              )}

              {/* RENDER DYNAMIC COMPONENTS BY TYPE */}
              {el.type === 'stamp' && el.subType && (
                <div className="w-full h-full flex items-center justify-center">
                  <StampRenderer type={el.subType as StampType} size="100%" color={el.color} />
                </div>
              )}

              {el.type === 'sticker' && el.subType && (
                <div className="w-full h-full flex items-center justify-center">
                  <StickerRenderer type={el.subType as StickerType} size="100%" />
                </div>
              )}

              {el.type === 'text' && (
                <div className="w-full h-full flex items-center justify-center">
                  {isEditing ? (
                    <div className="bg-white/95 border border-[#006CFF] rounded px-1 flex items-center shadow-lg w-full">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={handleTextEditSave}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleTextEditSave();
                        }}
                        className="text-sm font-bold w-full bg-transparent border-none focus:outline-none p-1 text-slate-900"
                        autoFocus
                      />
                      <button
                        onClick={handleTextEditSave}
                        className="p-1 text-green-600 hover:bg-slate-100 rounded"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{ color: el.color || '#000000' }}
                      className="text-base font-black px-2 py-1 leading-tight tracking-tight text-center whitespace-nowrap block drop-shadow-sm font-sans"
                    >
                      {el.value}
                    </span>
                  )}
                </div>
              )}

              {el.type === 'note' && (() => {
                const noteStyle = getNoteStyle(el.bgColor || '#FEF08A');
                return (
                  <div
                    className="w-full h-full p-3.5 border rounded-xl flex flex-col justify-between"
                    style={{
                      background: noteStyle.background,
                      borderColor: noteStyle.borderColor,
                      boxShadow: noteStyle.boxShadow || '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                      backgroundSize: el.bgColor === 'memo_daisy' || el.bgColor === 'memo_stars' ? '30px 30px' : el.bgColor === 'memo_gingham' ? '16px 16px' : el.bgColor === 'memo_kraft' || el.bgColor === 'memo_grid_blue' ? '15px 15px' : el.bgColor === 'memo_polka' ? '12px 12px' : 'auto',
                    }}
                  >
                    <div className="w-full h-1 rounded-full mb-1" style={{ backgroundColor: noteStyle.badgeLineColor }} />
                    {isEditing ? (
                      <div className="flex-1 flex flex-col justify-between">
                        <textarea
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="w-full flex-1 bg-transparent border-none focus:outline-none text-xs font-semibold resize-none h-full focus:ring-0 leading-tight"
                          style={{ color: noteStyle.textColor, fontFamily: noteStyle.fontFamily || 'inherit' }}
                          autoFocus
                        />
                        <button
                          onClick={handleTextEditSave}
                          className="self-end p-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-green-600 shadow-sm flex items-center gap-0.5"
                        >
                          <Check className="w-3 h-3" /> 완료
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="flex-1 text-left text-xs font-bold leading-tight break-all overflow-hidden"
                        style={{ color: noteStyle.textColor, fontFamily: noteStyle.fontFamily || 'monospace' }}
                      >
                        {el.value}
                      </div>
                    )}
                    <span 
                      className="text-[8px] font-extrabold text-right tracking-tight mt-1"
                      style={{ color: noteStyle.textColor, opacity: 0.4, fontFamily: 'monospace' }}
                    >
                      double-click to edit
                    </span>
                  </div>
                );
              })()}

              {/* RANDOMLY CUSTOM PAPERS like Goal charts or Checklists */}
              {el.type === 'tape' && (
                <div
                  className={`w-full h-full opacity-80 shadow-sm rounded flex items-center justify-center overflow-hidden border border-white/40`}
                  style={getTapeStyle(el.subType as TapeType)}
                />
              )}

              {/* DRAW SHAPES (RECT, CIRCLE, TRIANGLE, ARROW) */}
              {el.type === 'shape' && (
                <div className="w-full h-full flex items-center justify-center">
                  {el.subType === 'rectangle' && (
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <rect x="2" y="2" width="96" height="96" rx="4" fill="none" stroke={el.color || '#000000'} strokeWidth="4" />
                    </svg>
                  )}
                  {el.subType === 'circle' && (
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke={el.color || '#000000'} strokeWidth="4" />
                    </svg>
                  )}
                  {el.subType === 'triangle' && (
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon points="50,4 96,96 4,96" fill="none" stroke={el.color || '#000000'} strokeWidth="4" strokeLinejoin="round" />
                    </svg>
                  )}
                  {el.subType === 'arrow' && (
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="10" y1="50" x2="84" y2="50" stroke={el.color || '#000000'} strokeWidth="6" strokeLinecap="round" />
                      <polyline points="72,32 90,50 72,68" fill="none" stroke={el.color || '#000000'} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              )}

              {/* DRAW PHYSICAL RULERS (LINE, TRIANGLE, CIRCLE) */}
              {el.type === 'ruler' && el.subType === 'line' && (
                <div className="w-full h-full relative flex items-center justify-center pointer-events-none select-none">
                  <div className="w-full h-full bg-amber-100/90 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.3),rgba(217,119,6,0.1))] border-2 border-amber-600/70 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.6)] flex flex-col justify-between p-1 select-none overflow-hidden relative" style={{ backdropFilter: 'blur(1px)' }}>
                    {/* Top Wood Grain Highlight Line */}
                    <div className="absolute top-1 left-2 right-2 h-[1px] bg-white/40" />
                    {/* Ticks & markings along top */}
                    <div className="flex justify-between items-start w-full px-4 pt-1 h-8">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const isMajor = i % 5 === 0;
                        const tickHeight = isMajor ? 'h-5' : 'h-2.5';
                        return (
                          <div key={`tick-top-${i}`} className="flex flex-col items-center gap-0.5">
                            <div className={`w-[1.5px] bg-amber-900/80 ${tickHeight}`} />
                            {isMajor && <span className="text-[10px] font-bold text-amber-950 font-mono -mt-1">{i}</span>}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Wooden texture center text */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none justify-center">
                      <span className="text-[11px] font-bold tracking-widest text-amber-900/60 font-mono">
                        📐 정밀 원목 직선자 • 15cm
                      </span>
                    </div>

                    {/* Ticks & markings along bottom */}
                    <div className="flex justify-between items-end w-full px-4 pb-1 h-8">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const isMajor = i % 5 === 0;
                        const tickHeight = isMajor ? 'h-5' : 'h-2.5';
                        return (
                          <div key={`tick-bottom-${i}`} className="flex flex-col-reverse items-center gap-0.5">
                            <div className={`w-[1.5px] bg-amber-900/80 ${tickHeight}`} />
                            {isMajor && <span className="text-[10px] font-bold text-amber-950 font-mono -mb-1">{i}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {el.type === 'ruler' && el.subType === 'triangle' && (
                <div className="w-full h-full relative p-1 overflow-visible pointer-events-none select-none">
                  <svg className="w-full h-full overflow-visible drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)]" viewBox="0 0 200 200">
                    {/* Outer Triangle Body with translucent blue fill */}
                    <polygon
                      points="10,190 190,190 190,10"
                      fill="rgba(56, 189, 248, 0.25)"
                      stroke="rgba(2, 132, 199, 0.82)"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    {/* Inner Cutout Triangle */}
                    <polygon
                      points="55,165 165,165 165,55"
                      fill="#FDFBF7"
                      className="fill-[#FDFBF7] dark:fill-slate-900"
                      stroke="rgba(2, 132, 199, 0.45)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />

                    {/* Horizontal Ticks (Bottom edge) */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const x = 10 + i * 16.5;
                      const isMajor = i % 2 === 0;
                      const tickY = 190 - (isMajor ? 12 : 6);
                      return (
                        <g key={`ht-${i}`}>
                          <line x1={x} y1="190" x2={x} y2={tickY} stroke="rgba(3, 105, 161, 0.85)" strokeWidth={isMajor ? "1.5" : "1"} />
                          {isMajor && (
                            <text x={x} y={tickY - 4} fill="rgba(3, 105, 161, 0.85)" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              {i}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Vertical Ticks (Right edge) */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const y = 190 - i * 16.5;
                      const isMajor = i % 2 === 0;
                      const tickX = 190 - (isMajor ? 12 : 6);
                      return (
                        <g key={`vt-${i}`}>
                          <line x1="190" y1={y} x2={tickX} y2={y} stroke="rgba(3, 105, 161, 0.85)" strokeWidth={isMajor ? "1.5" : "1"} />
                          {isMajor && (
                            <text x={tickX - 6} y={y + 3} fill="rgba(3, 105, 161, 0.85)" fontSize="8.5" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                              {i}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Set square inner text */}
                    <text x="110" y="140" fill="rgba(3, 105, 161, 0.5)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      📐 삼각자 (SET SQUARE)
                    </text>
                  </svg>
                </div>
              )}

              {el.type === 'ruler' && el.subType === 'circle' && (
                <div className="w-full h-full relative flex items-center justify-center p-1 pointer-events-none select-none">
                  <div className="w-full h-full bg-pink-500/15 backdrop-blur-[0.5px] border-2 border-pink-500/60 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center relative overflow-visible">
                    {/* Outer Ring & Center cut-out */}
                    <div className="w-24 h-24 bg-[#FDFBF7] dark:bg-slate-900 border border-pink-500/40 rounded-full flex items-center justify-center relative shadow-inner">
                      <span className="text-[10px] font-bold text-pink-700/60 font-sans absolute">
                        ⭕ 원형자
                      </span>
                      {/* Center Crosshair */}
                      <div className="w-6 h-[1.5px] bg-pink-500/40 absolute" />
                      <div className="h-6 w-[1.5px] bg-pink-500/40 absolute" />
                    </div>

                    {/* Radial Markings around Protractor (0 to 360 degrees) */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 100">
                      {Array.from({ length: 24 }).map((_, idx) => {
                        const angleDeg = idx * 15;
                        const rad = (angleDeg * Math.PI) / 180;
                        const isMajor = angleDeg % 45 === 0;
                        const tickLen = isMajor ? 8 : 4;
                        const cos = Math.cos(rad);
                        const sin = Math.sin(rad);
                        const x1 = 50 + 44 * cos;
                        const y1 = 50 + 44 * sin;
                        const x2 = 50 + (44 - tickLen) * cos;
                        const y2 = 50 + (44 - tickLen) * sin;
                        const textX = 50 + (44 - tickLen - 6) * cos;
                        const textY = 50 + (44 - tickLen - 6) * sin;

                        return (
                          <g key={`deg-${angleDeg}`} className="select-none">
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(190, 24, 74, 0.8)" strokeWidth={isMajor ? "1" : "0.5"} />
                            {isMajor && (
                              <text
                                x={textX}
                                y={textY + 1.5}
                                fill="rgba(190, 24, 74, 0.8)"
                                fontSize="5.5"
                                fontWeight="bold"
                                textAnchor="middle"
                                fontFamily="sans-serif"
                              >
                                {angleDeg}°
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}

              {/* SELECTION CONTROL HANDLES FOR THE ELEMENT ACTIONS (DELETION, ROTATE, SCALE) */}
              {isSelected && (
                <>
                  {/* Handle A: Delete Button (Top-Left) */}
                  <button
                    onMouseDown={(e) => handleElementDelete(el.id, e)}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleElementDelete(el.id, e as any);
                    }}
                    className="absolute -top-3 -left-3 w-7 h-7 bg-red-500 hover:bg-red-600 active:scale-90 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-pointer"
                    title="오벨트 삭제"
                  >
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  {/* Handle B: Rotate Handle (Top-Right) */}
                  <div
                    onMouseDown={(e) => startElementRotate(el, e)}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsRotating(true);
                      if (e.touches.length > 0) {
                        const touch = e.touches[0];
                        const pt = {
                          x: ((touch.clientX - containerRef.current!.getBoundingClientRect().left) / containerRef.current!.getBoundingClientRect().width) * VIRTUAL_WIDTH,
                          y: ((touch.clientY - containerRef.current!.getBoundingClientRect().top) / containerRef.current!.getBoundingClientRect().height) * VIRTUAL_HEIGHT,
                        };
                        const rad = Math.atan2(pt.y - el.y, pt.x - el.x);
                        const deg = (rad * 180) / Math.PI;
                        setRotateStartAngle(deg);
                        setRotateStartElAngle(el.rotation || 0);
                      }
                    }}
                    className="absolute -top-3 -right-3 w-7 h-7 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-pointer"
                    title="드래그로 회전"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </div>

                  {/* Handle C: Scaling Resize Handle (Bottom-Right) */}
                  {el.type !== 'ruler' && (
                    <div
                      onMouseDown={(e) => startElementResize(el, e)}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsResizing(true);
                        if (e.touches.length > 0) {
                          const touch = e.touches[0];
                          const pt = {
                            x: ((touch.clientX - containerRef.current!.getBoundingClientRect().left) / containerRef.current!.getBoundingClientRect().width) * VIRTUAL_WIDTH,
                            y: ((touch.clientY - containerRef.current!.getBoundingClientRect().top) / containerRef.current!.getBoundingClientRect().height) * VIRTUAL_HEIGHT,
                          };
                          const dx = pt.x - el.x;
                          const dy = pt.y - el.y;
                          const currentDist = Math.sqrt(dx * dx + dy * dy);
                          setResizeStartDist(currentDist);
                          setResizeStartScale(el.scale);
                        }
                      }}
                      className="absolute -bottom-3 -right-3 w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-se-resize"
                      title="드래그로 크기조절"
                    >
                      <Move className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Handle D: Quick Color Accent Cycle (Bottom-Left) */}
                  {(el.type === 'note' || el.type === 'text') && (
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // Toggle stickie notes/texts colors
                        const optionColors = ['#FEF08A', '#FBCFE8', '#BFDBFE', '#BBF7D0', '#FFFFFF'];
                        const curIndex = optionColors.indexOf(el.bgColor || '');
                        const nextColor = optionColors[(curIndex + 1) % optionColors.length];

                        const updated = elements.map((item) => {
                          if (item.id === el.id) {
                            return {
                              ...item,
                              bgColor: nextColor,
                              color: nextColor === '#FFFFFF' ? '#006CFF' : item.color,
                            };
                          }
                          return item;
                        });
                        setElements(updated);
                        saveState(strokes, updated);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // Toggle stickie notes/texts colors
                        const optionColors = ['#FEF08A', '#FBCFE8', '#BFDBFE', '#BBF7D0', '#FFFFFF'];
                        const curIndex = optionColors.indexOf(el.bgColor || '');
                        const nextColor = optionColors[(curIndex + 1) % optionColors.length];

                        const updated = elements.map((item) => {
                          if (item.id === el.id) {
                            return {
                              ...item,
                              bgColor: nextColor,
                              color: nextColor === '#FFFFFF' ? '#006CFF' : item.color,
                            };
                          }
                          return item;
                        });
                        setElements(updated);
                        saveState(strokes, updated);
                      }}
                      className="absolute -bottom-3 -left-3 w-7 h-7 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-pointer text-xs"
                      title="색상 배색 전환"
                    >
                      🎨
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Empty blackboard instruction prompt for teachers */}
      {strokes.length === 0 && elements.length === 0 && !isDrawing && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center select-none pointer-events-none z-0 opacity-40">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <Edit2 className="w-6 h-6 text-[#006CFF]" />
          </div>
          <span className="text-sm font-black text-slate-800 block">
            비어있는 판서 화면입니다.
          </span>
          <span className="text-xs font-bold text-slate-500 mt-1 block">
            도장, 스티커, 마스킹테이프를 추가하거나 필기를 시작하세요.
          </span>
        </div>
      )}

      {/* Dynamic Shape Drag Preview Outline */}
      {isDrawing && activeTool === 'shape' && tempShapeBounds && (
        <div
          className="absolute border-2 border-dashed border-[#006CFF] pointer-events-none z-30"
          style={{
            left: `${(tempShapeBounds.x / VIRTUAL_WIDTH) * 100}%`,
            top: `${(tempShapeBounds.y / VIRTUAL_HEIGHT) * 100}%`,
            width: `${(tempShapeBounds.w / VIRTUAL_WIDTH) * 100}%`,
            height: `${(tempShapeBounds.h / VIRTUAL_HEIGHT) * 100}%`,
          }}
        >
          {selectedShapeType === 'rectangle' && (
            <div className="w-full h-full border-2 border-[#006CFF] rounded-md opacity-60" />
          )}
          {selectedShapeType === 'circle' && (
            <div className="w-full h-full border-2 border-[#006CFF] rounded-full opacity-60" />
          )}
          {selectedShapeType === 'triangle' && (
            <svg className="w-full h-full overflow-visible opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="50,4 96,96 4,96" fill="none" stroke="#006CFF" strokeWidth="4" />
            </svg>
          )}
          {selectedShapeType === 'arrow' && (
            <svg className="w-full h-full overflow-visible opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="10" y1="50" x2="84" y2="50" stroke="#006CFF" strokeWidth="6" />
              <polyline points="72,32 90,50 72,68" fill="none" stroke="#006CFF" strokeWidth="6" />
            </svg>
          )}
        </div>
      )}

      {/* Ruler dynamic HUD angle indicator with localized titles */}
      {isDrawing && activeTool === 'ruler' && shapeStartPt && currentStroke.length > 1 && (
        (() => {
          const endPt = currentStroke[currentStroke.length - 1];
          const dx = endPt.x - shapeStartPt.x;
          const dy = endPt.y - shapeStartPt.y;
          const dist = Math.round(Math.sqrt(dx * dx + dy * dy));
          const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
          const labelTitle = selectedRulerType === 'triangle' ? '삼각자가이드' : selectedRulerType === 'circle' ? '원형자가이드' : '직선자가이드';
          
          return (
            <div
              className="absolute pointer-events-none z-30 flex items-center justify-center font-mono text-xs font-black bg-slate-900/90 text-white px-2.5 py-1.5 rounded-lg border border-slate-700/80 shadow-md gap-1.5"
              style={{
                left: `${(endPt.x / VIRTUAL_WIDTH) * 100}%`,
                top: `${((endPt.y - 35) / VIRTUAL_HEIGHT) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span>📐 {labelTitle}: {dist}px</span>
              <span className="text-[#38BDF8]">({angle}° )</span>
            </div>
          );
        })()
      )}
      </div>
    </div>
  );
};
