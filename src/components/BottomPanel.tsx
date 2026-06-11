/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BottomTabType,
  StampType,
  StickerType,
  BackgroundType,
  TapeType,
} from '../types';
import { StampRenderer } from './StampRenderer';
import { StickerRenderer } from './StickerRenderer';
import { ColorWheel } from './ColorWheel';
import { tapeList, getTapeStyle } from '../lib/tapeStyles';
import { getNoteStyle } from '../lib/noteStyles';
import { Trash2, Plus, PenTool, Flame, RefreshCcw } from 'lucide-react';

// Realistic standing pencils, pens, and markers (Standing Pen Tray)
const StandingPen: React.FC<{ color: string; isSelected: boolean }> = ({ color, isSelected }) => (
  <svg viewBox="0 0 40 140" className={`w-[84px] h-[155px] transition-all duration-300 drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] origin-bottom ${isSelected ? 'scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]' : 'hover:scale-105 hover:-translate-y-0.5'}`}>
    {/* Pen Clip */}
    <rect x="25" y="70" width="3" height="30" rx="1.5" fill="url(#metallicSilver)" />
    <circle cx="26.5" cy="100" r="2.5" fill="#334155" />
    
    {/* Main Body (Glossy Dark Gray 3D Barrel) */}
    <path d="M12 60 C12 60, 12 135, 12 135 C12 137.8, 15.6 140, 20 140 C24.4 140, 28 137.8, 28 135 C28 135, 28 60, 28 60 Z" fill="url(#blueBarrelGradient)" />
    
    {/* Reflections Overlay */}
    <path d="M13 60 L13 134 C13 136, 14.5 137.5, 17 138" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.3" id="barrel-reflection" />
    <path d="M12 85 L28 85" stroke="#000000" strokeWidth="1.5" opacity="0.25" />
    <path d="M12 110 L28 110" stroke="#000000" strokeWidth="1.5" opacity="0.25" />

    {/* Elegant Silver/Gold Metal Middle Band */}
    <rect x="12" y="52" width="16" height="8" fill="url(#goldBand)" />
    
    {/* Translucent Ink Level Window */}
    <path d="M13 36 L27 36 L26 52 L14 52 Z" fill="url(#glassWindow)" />
    <rect x="18" y="38" width="4" height="12" fill={color} opacity="0.75" rx="1" />
    
    {/* Metal fountain nib pointing UPWARD */}
    <path d="M14 36 L15 28 L20 12 L25 28 L26 36 Z" fill="url(#metallicFeather)" stroke="#64748B" strokeWidth="0.5" />
    <line x1="20" y1="28" x2="20" y2="18" stroke="#475569" strokeWidth="0.5" />
    <circle cx="20" cy="28" r="1.2" fill="#334155" />

    {/* Pen tip soaked in dynamic active color */}
    <path d="M17.5 20 L20 12 L22.5 20 Z" fill={color} />

    <defs>
      <linearGradient id="blueBarrelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="25%" stopColor="#334155" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="75%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#854D0E" />
        <stop offset="30%" stopColor="#EAB308" />
        <stop offset="50%" stopColor="#FEF08A" />
        <stop offset="70%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#713F12" />
      </linearGradient>
      <linearGradient id="glassWindow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
        <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="70%" stopColor="#E2E8F0" stopOpacity="0.30" />
        <stop offset="100%" stopColor="#475569" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#64748B" />
        <stop offset="50%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="metallicFeather" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
  </svg>
);

const StandingHighlighter: React.FC<{ color: string; isSelected: boolean }> = ({ color, isSelected }) => (
  <svg viewBox="0 0 40 140" className={`w-[84px] h-[155px] transition-all duration-300 drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] origin-bottom ${isSelected ? 'scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]' : 'hover:scale-105 hover:-translate-y-0.5'}`}>
    {/* Wide Soft Pastel Orange/Chalk Highlighter body with gorgeous 3D wrap */}
    <path d="M8 52 C8 52, 8 134, 8 134 C8 137.3, 13.4 140, 20 140 C26.6 140, 32 137.3, 32 134 L32 52 Z" fill="url(#highlighter3dBody)" />
    
    {/* Gloss highlight on body */}
    <path d="M11 52 L11 133 C11 135, 13 138, 17 138.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.35" />
    
    {/* Brand sticker emblem */}
    <rect x="12" y="70" width="16" height="42" rx="4" fill="#FFFFFF" opacity="0.8" />
    <text x="20" y="94" fontFamily="sans-serif" fontSize="6" fontWeight="bold" fill="#334155" textAnchor="middle" opacity="0.9">NEON</text>
    <line x1="14" y1="100" x2="26" y2="100" stroke={color} strokeWidth="1.5" />
    
    {/* Metallic collar ring */}
    <rect x="12" y="48" width="16" height="4" fill="url(#metallicSilver)" />

    {/* Black plastic/matte textured neck sleeve */}
    <path d="M13 38 L27 38 L27 48 L13 48 Z" fill="url(#matteBlackSleeve)" />
    
    <path d="M15 38 L25 38 L24 20 L16 20 Z" fill="#E2E8F0" />
    
    {/* Pointed translucent neon tip dipped under color */}
    <path d="M16 26 L24 26 L23 18 L16 23 Z" fill={color} opacity="0.9" />

    <defs>
      <linearGradient id="highlighter3dBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="25%" stopColor="#334155" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="75%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="matteBlackSleeve" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#64748B" />
        <stop offset="50%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
  </svg>
);

const StandingCalligraphy: React.FC<{ color: string; isSelected: boolean }> = ({ color, isSelected }) => (
  <svg viewBox="0 0 40 140" className={`w-[84px] h-[155px] transition-all duration-300 drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] origin-bottom ${isSelected ? 'scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]' : 'hover:scale-105 hover:-translate-y-0.5'}`}>
    {/* Realistic bamboo handle */}
    <path d="M17 48 C17 48, 17 138, 17 138 C17 139, 18.3 140, 20 140 C21.7 140, 23 139, 23 138 L23 48 Z" fill="url(#bambooWood)" />
    
    {/* Segments of bamboo cane */}
    <path d="M17 78 L23 78" stroke="#5C3D2E" strokeWidth="1" opacity="0.6" />
    <path d="M17 108 L23 108" stroke="#5C3D2E" strokeWidth="1" opacity="0.6" />
    
    {/* Highlights for rich wood roundness */}
    <path d="M18 48 L18 138" stroke="#FFEBCD" strokeWidth="0.8" fill="none" opacity="0.25" />

    {/* Shiny black lacquer thread wrap/ferrule with silver metallic band at connection */}
    <path d="M16 40 L24 40 L23 48 L17 48 Z" fill="url(#lacquerBlack)" />
    <rect x="16.5" y="40" width="7" height="1.5" fill="url(#goldBand)" />

    {/* Soft goat-hair calligraphy brush bristles pointing up, fully saturated with the selected active color */}
    <path d="M17 40 L23 40 C25 32, 24 22, 20 10 C16 22, 15 32, 17 40 Z" fill={color} stroke="#D1D5DB" strokeWidth="0.5" />
    <path d="M18.5 40 C19.5 35, 19.5 25, 20 12 C19.5 25, 19.5 35, 18.5 40" stroke="#9CA3AF" strokeWidth="0.5" fill="none" opacity="0.5" />
    
    {/* Fine tip heavily loaded with rich, wet dynamic painting ink of the active color */}
    <path d="M17.4 34 C18.8 24, 19.5 15, 20 10 C20.5 15, 21.2 24, 22.6 34 Z" fill={color} />
    {/* An extra beautiful glossy wet highlight on the saturated brush tip for physically loaded realism */}
    <path d="M18.5 25 C19.0 20, 19.3 16, 19.6 12 C19.2 16, 18.8 20, 18.5 25 Z" fill="#FFFFFF" opacity="0.4" />

    <defs>
      <linearGradient id="bambooWood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8C6239" />
        <stop offset="30%" stopColor="#C69C6D" />
        <stop offset="60%" stopColor="#E5C49F" />
        <stop offset="85%" stopColor="#A5753F" />
        <stop offset="100%" stopColor="#5C3D2E" />
      </linearGradient>
      <linearGradient id="lacquerBlack" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0B0F17" />
        <stop offset="50%" stopColor="#374151" />
        <stop offset="100%" stopColor="#030712" />
      </linearGradient>
      <linearGradient id="brushBristles" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D1D5DB" />
        <stop offset="50%" stopColor="#F9FAFB" />
        <stop offset="100%" stopColor="#9CA3AF" />
      </linearGradient>
      <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#854D0E" />
        <stop offset="30%" stopColor="#EAB308" />
        <stop offset="50%" stopColor="#FEF08A" />
        <stop offset="70%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#713F12" />
      </linearGradient>
    </defs>
  </svg>
);

const StandingDashed: React.FC<{ color: string; isSelected: boolean }> = ({ color, isSelected }) => (
  <svg viewBox="0 0 40 140" className={`w-[84px] h-[155px] transition-all duration-300 drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] origin-bottom ${isSelected ? 'scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]' : 'hover:scale-105 hover:-translate-y-0.5'}`}>
    {/* Tech fineliner body (Matte Slate finish with gorgeous 3D cylindrical shader) */}
    <path d="M13 52 L27 52 L27 137 C27 138.5, 24 140, 20 140 C16 140, 13 138.5, 13 137 Z" fill="url(#finelinerBody)" />
    
    {/* Concentric Tech Ridley Grip Ridges */}
    <rect x="13" y="115" width="14" height="2" fill="#0F172A" opacity="0.6" />
    <rect x="13" y="120" width="14" height="2" fill="#0F172A" opacity="0.6" />
    <rect x="13" y="125" width="14" height="2" fill="#0F172A" opacity="0.6" />
    <rect x="13" y="130" width="14" height="2" fill="#0F172A" opacity="0.6" />

    {/* Technical specifications label */}
    <rect x="15" y="65" width="10" height="36" rx="1" fill="#FFFFFF" opacity="0.15" />
    <text x="20" y="78" fontFamily="monospace" fontSize="5" fontWeight="black" fill="#FFFFFF" textAnchor="middle" opacity="0.8" transform="rotate(90, 20, 78)">PIN-04</text>
    
    {/* Silver collar core */}
    <rect x="14" y="34" width="12" height="18" fill="url(#metallicSilver)" stroke="#475569" strokeWidth="0.3" />
    <rect x="16" y="30" width="8" height="4" fill="#64748B" />

    {/* Super fine metal guide sleeve (drawing point) */}
    <rect x="18.5" y="18" width="3" height="12" fill="url(#metallicSilver)" stroke="#475569" strokeWidth="0.2" />
    {/* Tiny needle fiber tip containing dynamic color block */}
    <circle cx="20" cy="18" r="1.8" fill={color} />

    <defs>
      <linearGradient id="finelinerBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="25%" stopColor="#334155" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="75%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#64748B" />
        <stop offset="50%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
  </svg>
);

const StandingCrayon: React.FC<{ color: string; isSelected: boolean }> = ({ color, isSelected }) => (
  <svg viewBox="0 0 40 140" className={`w-[84px] h-[155px] transition-all duration-300 drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] origin-bottom ${isSelected ? 'scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]' : 'hover:scale-105 hover:-translate-y-0.5'}`}>
    {/* 3D Wax Crayon Body Core (glorious cylindrical light shader) */}
    <path d="M11 44 C11 44, 11 138, 11 138 C11 139, 14 140, 20 140 C26 140, 29 139, 29 138 L29 44 Z" fill={color} />
    <path d="M11 44 L29 44 L29 138 L11 138 Z" fill="url(#crayonCylinderShade)" style={{ mixBlendMode: 'multiply' }} opacity="0.35" />

    {/* Paper wrapper wrap around central crayon */}
    <path d="M11 50 C11 50, 11 137, 11 137 C11 138.5, 14 140, 20 140 C26 140, 29 138.5, 29 137 L29 50 Z" fill="url(#crayonPaperTexture)" />
    
    {/* Wrapper borders in the active color */}
    <path d="M11 50 L29 50 M11 54 L29 54" stroke={color} strokeWidth="1.5" opacity="0.85" />
    <path d="M11 126 L29 126 M11 130 L29 130" stroke={color} strokeWidth="1.5" opacity="0.85" />
    
    {/* Retro branding wavy line design inside paper casing */}
    <path d="M11 80 Q15 75, 20 80 T29 80" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
    <path d="M11 86 Q15 81, 20 86 T29 86" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
    <text x="20" y="104" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" fill={color} textAnchor="middle" opacity="0.8" letterSpacing="0.5">CRAYON</text>

    {/* Shaded Wrapper overlay to give it 3D cylindrical form */}
    <path d="M11 50 L29 50 L29 138 L11 138 Z" fill="url(#crayonCylinderShade)" style={{ mixBlendMode: 'multiply' }} opacity="0.25" />
    <path d="M12 50 L12 137" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.4" />

    {/* Exposed woodcone and wax crayon pointing up */}
    <path d="M11 44 L29 44 L27 22 L13 22 Z" fill={color} />
    <path d="M11 44 L29 44 L27 22 L13 22 Z" fill="url(#crayonCylinderShade)" style={{ mixBlendMode: 'multiply' }} opacity="0.2" />
    
    {/* Sharpened tip */}
    <path d="M13 22 L27 22 L20 10 Z" fill={color} />
    <path d="M13 22 L27 22 L20 10 Z" fill="url(#crayonCylinderShade)" style={{ mixBlendMode: 'multiply' }} opacity="0.3" />

    <defs>
      <linearGradient id="crayonPaperTexture" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="20%" stopColor="#F8FAFC" />
        <stop offset="80%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="crayonCylinderShade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
        <stop offset="30%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
      </linearGradient>
    </defs>
  </svg>
);

const StandingRainbow: React.FC<{ isSelected: boolean }> = ({ isSelected }) => (
  <svg viewBox="0 0 40 140" className={`w-[102px] h-[155px] transition-all duration-300 drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)] origin-bottom ${isSelected ? 'scale-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]' : 'hover:scale-105 hover:-translate-y-0.5'}`}>
    {/* Dark contours to make silver rod stand out against lighter backgrounds */}
    <path d="M20 75 L20 138" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" opacity="0.9" />
    <path d="M6 46 L6 75 L34 75 L34 46" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />

    {/* Thick brush metal wire bracket and holder shaft with rich shading */}
    <path d="M20 75 L20 138" stroke="url(#metallicSilver)" strokeWidth="4.5" strokeLinecap="round" />
    <rect x="15" y="100" width="10" height="38" rx="2.5" fill="#1E293B" stroke="url(#metallicSilver)" strokeWidth="1" />
    <path d="M20 100 L20 130" stroke="#000000" strokeWidth="1.5" opacity="0.3" />

    {/* Rainbow wire framing roller wheel */}
    <path d="M6 46 L6 75 L34 75 L34 46" stroke="url(#metallicSilver)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="6" cy="46" r="3.2" fill="#1E293B" />
    <circle cx="6" cy="46" r="2.2" fill="url(#metallicSilver)" />
    <circle cx="34" cy="46" r="3.2" fill="#1E293B" />
    <circle cx="34" cy="46" r="2.2" fill="url(#metallicSilver)" />
    
    {/* Horizontal rotating rainbow foam cylinder drum */}
    <g>
      <rect x="2" y="24" width="36" height="22" rx="3" fill="#1E293B" />
      <rect x="3" y="25" width="6" height="20" fill="#EF4444" />
      <rect x="9" y="25" width="6" height="20" fill="#F59E0B" />
      <rect x="15" y="25" width="6" height="20" fill="#10B981" />
      <rect x="21" y="25" width="6" height="20" fill="#3B82F6" />
      <rect x="27" y="25" width="6" height="20" fill="#6366F1" />
      <rect x="33" y="25" width="4" height="20" fill="#8B5CF6" />
      
      {/* 3D Cylindrical Shader Layer with Blend Mode */}
      <rect x="2" y="24" width="36" height="22" rx="3" fill="url(#rainbowFoamShading)" />
    </g>

    <defs>
      <linearGradient id="rainbowFoamShading" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
        <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="60%" stopColor="#000000" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="35%" stopColor="#CBD5E1" />
        <stop offset="50%" stopColor="#F8FAFC" />
        <stop offset="65%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
  </svg>
);

interface BottomPanelProps {
  activeTab: BottomTabType;
  setActiveTab: (tab: BottomTabType) => void;
  // Pen controls
  penWidth: number;
  setPenWidth: (w: number) => void;
  penColor: string;
  setPenColor: (c: string) => void;
  penOpacity: number;
  setPenOpacity: (o: number) => void;
  brushType: 'pen' | 'highlighter' | 'calligraphy' | 'dashed' | 'crayon' | 'rainbow';
  setBrushType: (t: 'pen' | 'highlighter' | 'calligraphy' | 'dashed' | 'crayon' | 'rainbow') => void;
  // Selection handlers
  onSelectStamp: (type: StampType) => void;
  onSelectSticker: (type: StickerType) => void;
  onSelectBackground: (type: BackgroundType) => void;
  onSelectTape: (type: TapeType) => void;
  onSelectPaper: (type: string, bgColor: string) => void;
  // Current board state
  currentBg: BackgroundType;
  setActiveTool?: (tool: any) => void;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
  activeTab,
  setActiveTab,
  penWidth,
  setPenWidth,
  penColor,
  setPenColor,
  penOpacity,
  setPenOpacity,
  brushType,
  setBrushType,
  onSelectStamp,
  onSelectSticker,
  onSelectBackground,
  onSelectTape,
  onSelectPaper,
  currentBg,
  setActiveTool,
}) => {
  const [selectedStickerTag, setSelectedStickerTag] = useState<'all' | 'illustration' | 'basic' | 'weather' | 'emotion' | 'check'>('all');

  // Static Preset Palette Colors matching Korea school/stationery aesthetic
  const presetColors = [
    { hex: '#006CFF', name: '메인 블루' },
    { hex: '#FF3B30', name: '레드' },
    { hex: '#FF9500', name: '오렌지' },
    { hex: '#4CD964', name: '그린' },
    { hex: '#FFCC00', name: '옐로우' },
    { hex: '#AF52DE', name: '퍼플' },
    { hex: '#E2D1B2', name: '베이지' },
    { hex: '#1E293B', name: '슬레이트' },
    { hex: '#000000', name: '블랙' },
    { hex: '#EC4899', name: '핑크' },
    { hex: '#14B8A6', name: '민트' },
    { hex: '#FF6B6B', name: '코랄' },
    { hex: '#34D399', name: '에메랄드' },
    { hex: '#60A5FA', name: '스카이' },
    { hex: '#F43F5E', name: '로즈' },
    { hex: '#A855F7', name: '보라' },
  ];

  // Korean Tab Labels
  const tabLabels: { id: BottomTabType; label: string }[] = [
    { id: 'pen', label: '펜' },
    { id: 'color', label: '색상' },
    { id: 'stamp', label: '스티커' },
    { id: 'background', label: '배경지' },
    { id: 'tape', label: '테이프' },
    { id: 'paper', label: '종이' },
  ];

  // Stamp configurations
  const basicStamps: StampType[] = [
    'dotted_square',
    'circle',
    'star_outline',
    'heart_outline',
    'flower_outline',
    'clover_outline',
    'crown_outline',
    'cloud_outline',
    'sun_outline',
    'moon_outline',
    'music_outline',
    'bubble',
    'check',
    'cross',
    'smile',
    'thumbs_up',
    'heart',
    'star',
    'clover',
    'crown',
    'cloud',
    'apple',
    'cat',
    'tree',
    'emoji:✨', 'emoji:🌟', 'emoji:⭐', 'emoji:💫', 'emoji:☄️', 'emoji:⚡', 'emoji:🌈', 'emoji:🔥', 'emoji:💎', 'emoji:🔮',
    'emoji:❤️', 'emoji:🧡', 'emoji:💛', 'emoji:💚', 'emoji:💙', 'emoji:💜', 'emoji:🖤', 'emoji:🤍', 'emoji:🤎', 'emoji:💖', 'emoji:💕', 'emoji:💞',
    'emoji:✏️', 'emoji:✒️', 'emoji:🖌️', 'emoji:🖍️', 'emoji:🎨', 'emoji:🎯', 'emoji:🎒', 'emoji:🎓', 'emoji:📚', 'emoji:📖', 'emoji:🔖', 'emoji:🎟️', 'emoji:🎫', 'emoji:🎖️', 'emoji:🏆', 'emoji:🏅', 'emoji:🥇', 'emoji:🥈', 'emoji:🥉',
    'emoji:🟢', 'emoji:🟡', 'emoji:🔴', 'emoji:🔵', 'emoji:🟣', 'emoji:🟧', 'emoji:🟩', 'emoji:🟨', 'emoji:🔺', 'emoji:🔹', 'emoji:💮', 'emoji:💠', 'emoji:🔱', 'emoji: Bellamy', 'emoji:🛎️', 'emoji:📢', 'emoji:📣', 'emoji:💭',
    'emoji:🧸', 'emoji:🪁', 'emoji:♟️', 'emoji:🎲', 'emoji:🧩', 'emoji:🎈', 'emoji:🎉', 'emoji:🎊', 'emoji:🎁', 'emoji:📦', 'emoji:🛹', 'emoji:🚲', 'emoji:🛴', 'emoji:🪀', 'emoji:⚽', 'emoji:🏀', 'emoji:🧮', 'emoji:🧪', 'emoji:🌍', 'emoji:🗺️'
  ].slice(0, 100);

  const weatherStamps: StampType[] = [
    'emoji:☀️', 'emoji:🌤️', 'emoji:⛅', 'emoji:🌥️', 'emoji:☁️', 'emoji:🌦️', 'emoji:🌧️', 'emoji:⛈️', 'emoji:🌩️', 'emoji:🌨️',
    'emoji:❄️', 'emoji:⛄', 'emoji:☃️', 'emoji:🌬️', 'emoji:💨', 'emoji: Tornado', 'emoji:🌫️', 'emoji:☔', 'emoji:☂️', 'emoji:💦',
    'emoji:🌊', 'emoji:🌀', 'emoji:🌈', 'emoji:🌅', 'emoji:🌄', 'emoji:🌇', 'emoji:🌞', 'emoji:🌝', 'emoji:🌚', 'emoji:🪐',
    'emoji:🌎', 'emoji:🌍', 'emoji:🌏', 'emoji:☄️', 'emoji:🌠', 'emoji:🌌', 'emoji:🌡️', 'emoji:⚡', 'emoji:🌋', 'emoji:🏕️',
    'emoji:🌱', 'emoji:🌿', 'emoji:☘️', 'emoji:🍀', 'emoji:🪴', 'emoji:🌳', 'emoji:🌲', 'emoji:🌴', 'emoji: cactus', 'emoji:🌾',
    'emoji:🍁', 'emoji:🍂', 'emoji:🍃', 'emoji:🌸', 'emoji:🌹', 'emoji:🌺', 'emoji:🌻', 'emoji:🌼', 'emoji:🌷', 'emoji:🍄',
    'emoji:🍒', 'emoji:🍓', 'emoji:🍇', 'emoji:🍎', 'emoji:🍊', 'emoji:🍋', 'emoji:🍑', 'emoji:🍉', 'emoji:🍍', 'emoji:🥑',
    'emoji: Squirrel', 'emoji:🐰', 'emoji:🦊', 'emoji:🐻', 'emoji:🐨', 'emoji:🐼', 'emoji:🦁', 'emoji:🐯', 'emoji:🐵', 'emoji:🦌',
    'emoji: Eagle', 'emoji:🦆', 'emoji:🦉', 'emoji:🦇', 'emoji:🦋', 'emoji:🐌', 'emoji:🐞', 'emoji:🐝', 'emoji: Cricket', 'emoji:🕷️',
    'emoji:🐚', 'emoji:🐠', 'emoji:🐤', 'emoji:🦖', 'emoji:🦕', 'emoji:🐩', 'emoji:🐈', 'emoji:🐕', 'emoji:🐾', 'emoji:🗺️'
  ].slice(0, 100);

  const emotionStamps: StampType[] = [
    'emoji:😀', 'emoji:😃', 'emoji:😄', 'emoji:😁', 'emoji:😆', 'emoji:😅', 'emoji:😂', 'emoji:🤣', 'emoji:😊', 'emoji:😇',
    'emoji:🙂', 'emoji:🙃', 'emoji:😉', 'emoji:😌', 'emoji:😍', 'emoji:🥰', 'emoji:😘', 'emoji:😗', 'emoji:😙', 'emoji:😚',
    'emoji:😋', 'emoji:😛', 'emoji:😜', 'emoji:🤪', 'emoji:😝', 'emoji:🤑', 'emoji:🤗', 'emoji:🤭', 'emoji:🤫', 'emoji:🤔',
    'emoji:🤐', 'emoji:🤨', 'emoji:😐', 'emoji:😑', 'emoji:😶', 'emoji:😏', 'emoji:😒', 'emoji:🙄', 'emoji:😬', 'emoji:🤥',
    'emoji:😌', 'emoji:😔', 'emoji:😪', 'emoji:🤤', 'emoji:😴', 'emoji:😷', 'emoji:🤒', 'emoji:🤕', 'emoji:🤢', 'emoji:🤮',
    'emoji:🤧', 'emoji:🥵', 'emoji:🥶', 'emoji:🥴', 'emoji:😵', 'emoji:🤯', 'emoji:🤠', 'emoji:🥳', 'emoji:🥸', 'emoji:😎',
    'emoji:🤓', 'emoji:🧐', 'emoji:😕', 'emoji:😟', 'emoji:🙁', 'emoji:☹️', 'emoji:😮', 'emoji:😯', 'emoji:😲', 'emoji:😳',
    'emoji:🥺', 'emoji:😦', 'emoji:😧', 'emoji:😨', 'emoji:😰', 'emoji:😱', 'emoji:😭', 'emoji:😢', 'emoji:🥱', 'emoji:😩',
    'emoji:😫', 'emoji:😖', 'emoji:😣', 'emoji:😞', 'emoji:😓', 'emoji:😩', 'emoji:😤', 'emoji:😠', 'emoji:😡', 'emoji:🤬',
    'emoji:😈', 'emoji:👿', 'emoji:💀', 'emoji:☠️', 'emoji:💩', 'emoji:🤡', 'emoji:👹', 'emoji:👺', 'emoji:👽', 'emoji:👾'
  ].slice(0, 100);

  const checkStamps: StampType[] = [
    'emoji:✅', 'emoji:☑️', 'emoji:✔️', 'emoji:❌', 'emoji:❎', 'emoji:✖️', 'emoji:➕', 'emoji:➖', 'emoji:❓', 'emoji:❔',
    'emoji:❗', 'emoji:❕', 'emoji:⚠️', 'emoji:🚨', 'emoji:🛑', 'emoji:⛔', 'emoji:🔇', 'emoji:🚫', 'emoji:🔔', 'emoji:🔕',
    'emoji:💯', 'emoji:🆗', 'emoji:🆙', 'emoji:🆒', 'emoji:🆕', 'emoji:🔴', 'emoji:🟠', 'emoji:🟡', 'emoji:🟢', 'emoji:🔵',
    'emoji:🟣', 'emoji:🟤', 'emoji:⚫', 'emoji:⚪', 'emoji:🔳', 'emoji:🔲', 'emoji:🏁', 'emoji:🚩', 'emoji:🎌', 'emoji:⛳',
    'emoji:📌', 'emoji:📍', 'emoji:📎', 'emoji:📏', 'emoji:📐', 'emoji:⚖️', 'emoji:⚓', 'emoji:🔑', 'emoji:🗝️', 'emoji:🔒',
    'emoji:🔓', 'emoji:0️⃣', 'emoji:1️⃣', 'emoji:2️⃣', 'emoji:3️⃣', 'emoji:4️⃣', 'emoji:5️⃣', 'emoji:6️⃣', 'emoji:7️⃣', 'emoji:8️⃣',
    'emoji:9️⃣', 'emoji:🔟', 'emoji:🅰️', 'emoji:🅱️', 'emoji:🅾️', 'emoji:🅿️', 'emoji:🆎', 'emoji:🆑', 'emoji:🆒', 'emoji:🇲',
    'emoji:👍', 'emoji:👎', 'emoji:✊', 'emoji:👊', 'emoji:🤛', 'emoji:🤜', 'emoji:🤞', 'emoji:✌️', 'emoji:🤟', 'emoji:🤘',
    'emoji:👌', 'emoji:👈', 'emoji:👉', 'emoji:👆', 'emoji:👇', 'emoji:🙏', 'emoji:👐', 'emoji:🤲', 'emoji:👏', 'emoji:🤝',
    'emoji:🎖️', 'emoji:🏆', 'emoji:🏅', 'emoji:🥇', 'emoji:🥈', 'emoji:🥉', 'emoji:🏵️', 'emoji:🎟️', 'emoji:🎫', 'emoji:👑'
  ].slice(0, 100);

  // Stickers configurations
  const stickersList: { id: StickerType; label: string }[] = [
    { id: 'good', label: 'GOOD' },
    { id: 'fighting', label: '화이팅!' },
    { id: 'well_done', label: '참 잘했어요' },
    { id: 'love', label: 'LOVE' },
    { id: 'wow', label: 'WOW!' },
    { id: 'happy', label: 'HAPPY' },
    { id: 'congrats', label: 'CONGRATS' },
    { id: 'cute_bear', label: '아기곰' },
    { id: 'memo_yellow', label: '메모패드 (황)' },
    { id: 'memo_pink', label: '메모패드 (홍)' },
    { id: 'good_job', label: '참 잘함 👍' },
    { id: 'perfect', label: '완벽해요 💯' },
    { id: 'heart_star', label: '우정의 별' },
    { id: 'clover_luck', label: '네잎 행운 🍀' },
    { id: 'dino', label: '아기공룡' },
    { id: 'star_stamp', label: '슈퍼스타 ✨' },
    { id: 'check_box_done', label: '할일 완료 ✓' },
    { id: 'coffee', label: '커피 한잔 ☕' },
    { id: 'bulb', label: '아이디어 💡' },
    { id: 'rainbow_sticker', label: '무지개 미소' },
  ];

  // Background Options (배경지)
  const backgroundList: { id: BackgroundType; label: string; previewClass: string }[] = [
    { id: 'plain', label: '기본 아이보리', previewClass: 'bg-[#FDFBF7] border border-slate-300' },
    { id: 'grid', label: '모눈 격자지', previewClass: 'bg-[#FDFBF7] bg-[linear-gradient(rgba(156,170,236,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(156,170,236,0.15)_1px,transparent_1px)] bg-[size:20px_20px] border border-slate-300' },
    { id: 'lined', label: '줄 노트', previewClass: 'bg-[#FDFBF7] bg-[linear-gradient(rgba(96,165,250,0.2)_1px,transparent_1px)] bg-[size:100%_25px] border border-slate-300' },
    { id: 'english', label: '4선 영어종이', previewClass: 'bg-[#FDFBF7] bg-[linear-gradient(rgba(248,113,113,0.15)_1px,transparent_1px),linear-gradient(rgba(96,165,250,0.15)_1px,transparent_1px)] bg-[size:100%_40px] border border-slate-300' },
    { id: 'blackboard', label: '칠판 녹색지', previewClass: 'bg-[#134E4A] border border-[#0F3F3E] text-white shadow-inner' },
    { id: 'music', label: '오선 학습지', previewClass: 'bg-[#FDFBF7] bg-[linear-gradient(rgba(71,85,105,0.25)_1px,transparent_1px)] bg-[size:100%_15px] border border-slate-300' },
    { id: 'dots', label: '도트 방안지', previewClass: 'bg-[#FDFBF7] bg-[radial-gradient(rgba(99,102,241,0.3)_1.5px,transparent_1.5px)] bg-[size:16px_16px] border border-slate-300' },
    { id: 'kraft', label: '아날로그 크라프트', previewClass: 'bg-[#E8C595] border border-[#C6A06F]' },
    { id: 'manuscript', label: '한국 원고지', previewClass: 'bg-[#FDFBF7] bg-[linear-gradient(rgba(220,80,50,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(220,80,50,0.25)_1px,transparent_1px)] bg-[size:15px_15px] border border-slate-300' },
    { id: 'graph', label: '정밀 수안방안', previewClass: 'bg-[#FDFBF7] bg-[linear-gradient(rgba(14,165,233,0.15)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(14,165,233,0.15)_0.5px,transparent_0.5px)] bg-[size:10px_10px] border border-slate-300' },
  ];

  // Paper/Note designs
  const paperList = [
    { id: 'memo_card_yellow', name: '노랑 스티키 메모', bg: '#FEF08A' },
    { id: 'memo_card_pink', name: '자주 스티키 메모', bg: '#FBCFE8' },
    { id: 'memo_card_blue', name: '하늘 스티키 메모', bg: '#BFDBFE' },
    { id: 'memo_card_green', name: '연두 스티키 메모', bg: '#BBF7D0' },
    { id: 'memo_lavender', name: '🔮 크림 라벤더 메모', bg: '#E9D5FF' },
    { id: 'memo_peach', name: '🍑 피치 망고 메모', bg: '#FFEDD5' },
    { id: 'memo_slate', name: '♟️ 시크 모노 메모', bg: '#475569' },
    { id: 'memo_rainbow', name: '🌈 오로라 스티키', bg: 'linear-gradient(135deg, #fef08a, #fbcfe8, #c084fc)' },
    { id: 'memo_gingham', name: '🌸 러블리 깅엄 메모', bg: '#fce7f3' },
    { id: 'memo_daisy', name: '🌼 데이지 가든 메모', bg: '#FEF9C3' },
    { id: 'memo_stars', name: '⭐ 밤하늘 별빛 메모', bg: '#1e1b4b' },
    { id: 'memo_kraft', name: '🪵 크라프트 격자 메모', bg: '#ebd5b3' },
    { id: 'memo_grid_blue', name: '🌀 하늘 모눈 메모', bg: '#f0f9ff' },
    { id: 'memo_polka', name: '🎈 빨간 도트 메모', bg: '#fee2e2' },
    { id: 'goal_box', name: '🎯 오늘의 목표 함', bg: '#FFFFFF' },
    { id: 'checklist', name: '📝 체크리스트 종이', bg: '#F8FAFC' },
  ];

  return (
    <div
      className="w-full h-[600px] bg-white rounded-t-[48px] border-t border-slate-200/50 shadow-[0_-12px_48px_-20px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden select-none shrink-0"
      id="bottom-tab-panel"
    >
      {/* 1. Main Navigation Tabs */}
      <div className="flex border-b border-slate-100 px-8 relative overflow-x-auto scrollbar-none shrink-0">
        {tabLabels.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if ((tab.id === 'pen' || tab.id === 'color') && setActiveTool) {
                  setActiveTool('pen');
                }
              }}
              className={`flex-1 min-w-[112px] py-6 text-center text-[32px] transition-all duration-300 relative leading-none shrink-0 cursor-pointer ${
                isActive ? 'text-[#006CFF] font-bold text-[34px]' : 'text-slate-400 font-normal hover:text-slate-600'
              }`}
              id={`tab-btn-${tab.id}`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-4 right-4 h-2 bg-[#006CFF] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Active Tab Content Window (Height Locked to prevent overflow) */}
      <div 
        className={`flex-1 pt-6 pb-12 px-8 bg-white ${activeTab === 'color' || activeTab === 'pen' ? 'overflow-hidden' : 'overflow-y-auto'}`} 
        id="bottom-panel-scroll-area"
      >
        {activeTab === 'pen' && (
          <div className="flex flex-col gap-2 pb-0">
            {/* Expanded 6-Style Brush Selection Studio */}
            <div className="flex flex-col gap-3">
              <span className="text-xl font-normal text-slate-800 leading-none">펜 유형 스튜디오</span>
              
              {/* Aluminum Desk Rack Stand */}
              <div className="relative bg-[#FAFAFA] border border-slate-200/80 rounded-[24px] p-4 pt-4 h-[208px] flex gap-2 justify-between items-end overflow-visible shadow-[inset_0_4px_16px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] animate-fade-in">

                {[
                  { id: 'pen', label: '만년필 젤펜', desc: '기본 다이어리', icon: (col: string, sel: boolean) => <StandingPen color={col} isSelected={sel} />, opacity: 1, width: 4 },
                  { id: 'highlighter', label: '사각 형광펜', desc: '투명 강조', icon: (col: string, sel: boolean) => <StandingHighlighter color={col} isSelected={sel} />, opacity: 0.4, width: 18 },
                  { id: 'calligraphy', label: '감성 서예붓', desc: '전통 서예 촉', icon: (col: string, sel: boolean) => <StandingCalligraphy color={col} isSelected={sel} />, opacity: 0.95, width: 6 },
                  { id: 'dashed', label: '패턴 점선펜', desc: '가이드 점선', icon: (col: string, sel: boolean) => <StandingDashed color={col} isSelected={sel} />, opacity: 1, width: 4 },
                  { id: 'crayon', label: '파스텔 크레용', desc: '손그림 질감', icon: (col: string, sel: boolean) => <StandingCrayon color={col} isSelected={sel} />, opacity: 0.9, width: 8 },
                  { id: 'rainbow', label: '레인보우 롤러', desc: '알록달록 무지개', icon: (_col: string, sel: boolean) => <StandingRainbow isSelected={sel} />, opacity: 1, width: 8 },
                ].map((item) => {
                  const isSelected = brushType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setBrushType(item.id as any);
                        setPenOpacity(item.opacity);
                        setPenWidth(item.width);
                        if (setActiveTool) {
                          setActiveTool('pen');
                        }
                      }}
                      className="flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer focus:outline-none group select-none"
                    >
                      {/* Floating pen wrapper */}
                      <div className={`transition-all duration-300 ease-out flex flex-col items-center justify-end pb-2 z-10 ${
                        isSelected ? '-translate-y-2 scale-105' : 'translate-y-0 hover:-translate-y-0.5'
                       }`}>
                        {item.icon(penColor, isSelected)}
                      </div>

                      {/* Dynamic background glow / outgrow shadow layer behind chosen pen */}
                      {isSelected && (
                        <div 
                           className="absolute bottom-[2px] w-12 h-16 rounded-full bg-[#006CFF]/15 blur-sm pointer-events-none transition-all duration-300 animate-pulse"
                           style={{ 
                             boxShadow: '0 0 25px 10px rgba(0, 108, 255, 0.35)'
                           }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thickness Slider - Pushed slightly down with mt-4 */}
            <div className="flex flex-col gap-1.5 mt-4">
              <div className="flex justify-between items-center text-xl font-normal text-slate-800">
                <span>펜 두께 선별 ({penWidth}px)</span>
                <span className="text-[#006CFF] text-[18px]">최대 40px</span>
              </div>
              <input
                type="range"
                min="1"
                max={brushType === 'highlighter' ? '40' : '20'}
                value={penWidth}
                onChange={(e) => setPenWidth(Number(e.target.value))}
                className="giant-custom-slider cursor-pointer"
              />
            </div>

            {/* Opacity Slider - Pushed slightly down with mt-4 */}
            <div className="flex flex-col gap-1.5 mt-4">
              <div className="flex justify-between items-center text-xl font-normal text-slate-800">
                <span>투명도 조절 ({Math.round(penOpacity * 100)}%)</span>
                <span className="text-[#006CFF] text-[18px]">흐리게 ~ 진하게</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={penOpacity}
                onChange={(e) => setPenOpacity(Number(e.target.value))}
                className="giant-custom-slider cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeTab === 'color' && (
          <div className="grid grid-cols-2 gap-4 h-full mt-1" id="color-dual-panel">
            {/* Left Column: Custom Color Wheel */}
            <div className="flex flex-col gap-2 h-full pr-4 justify-start pt-1">
              <span className="text-lg font-normal text-slate-400 uppercase tracking-widest leading-none">
                사용자 정의 색상
              </span>
              <div className="flex justify-center py-1">
                <ColorWheel 
                  penColor={penColor} 
                  setPenColor={(color) => {
                    setPenColor(color);
                    if (setActiveTool) {
                      setActiveTool('pen');
                    }
                  }} 
                />
              </div>
            </div>

            {/* Right Column: 색상 파레트 */}
            <div className="flex flex-col gap-3 h-full pl-4 justify-start border-l border-slate-100 pt-1">
              <span className="text-lg font-normal text-slate-400 uppercase tracking-widest leading-none">
                색상 파레트
              </span>
              
              {/* Detailed Grid Palette: 24 curated designer shades for zero scroll (4 rows of 6) */}
              <div className="grid grid-cols-6 gap-2 animate-fade-in pb-1">
                {[
                  // Row 1: Vivid primary accents
                  '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#A259FF',
                  // Row 2: Premium warm/muted/pastels
                  '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#E8AEFF',
                  // Row 3: Classy dark/light essentials
                  '#1A1A1A', '#4A5568', '#718096', '#A0AEC0', '#CBD5E0', '#FFFFFF',
                  // Row 4: Elegant custom matching tones requested
                  '#8E7C68', '#7B9E87', '#7596B2', '#C78B91', '#DFC79B', '#F7EBE1'
                ].map((colorHex) => {
                  const isSelected = penColor.toLowerCase() === colorHex.toLowerCase();
                  return (
                    <button
                      key={`palette-${colorHex}`}
                      onClick={() => {
                        setPenColor(colorHex);
                        if (setActiveTool) {
                          setActiveTool('pen');
                        }
                      }}
                      style={{ backgroundColor: colorHex }}
                      className={`aspect-square rounded-xl border cursor-pointer transition-all active:scale-90 ${
                        isSelected
                          ? 'border-slate-900 ring-2 ring-[#006CFF]/30 scale-105'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                      title={colorHex}
                    />
                  );
                })}
              </div>

              {/* Directly input Hex */}
              <div className="relative pt-1.5 border-t border-slate-200/50 mt-0.5">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-slate-400 font-mono">#</span>
                  <input
                    type="text"
                    value={penColor.replace('#', '').toUpperCase()}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val.length <= 6) {
                        setPenColor('#' + val);
                        if (setActiveTool && val.length === 6) {
                          setActiveTool('pen');
                        }
                      }
                    }}
                    placeholder="FFFFFF"
                    className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-9 pr-3 font-mono text-[16px] font-normal uppercase focus:outline-none focus:border-[#006CFF] text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stamp' && (
          <div className="flex flex-col gap-6 h-full pb-72">
            {/* Category Tags for Stickers/Stamps */}
            <div className="flex gap-2 flex-wrap mb-2" id="sticker-tags-container">
              {[
                { id: 'all', label: '전체' },
                { id: 'illustration', label: '일러스트' },
                { id: 'basic', label: '도형' },
                { id: 'weather', label: '날씨' },
                { id: 'emotion', label: '감정/표정' },
                { id: 'check', label: '체크/기호' },
              ].map((tag) => {
                const isActive = selectedStickerTag === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedStickerTag(tag.id as any)}
                    className={`px-5 py-2.5 rounded-full font-normal text-[18px] border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#006CFF] text-white border-[#006CFF] shadow-sm scale-105'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>

            <div className="w-full" id="stamp-catalog-area">
              <div className="grid grid-cols-6 gap-5">
                {/* 1. Illustration Stickers */}
                {(selectedStickerTag === 'all' || selectedStickerTag === 'illustration') && stickersList.map((item) => (
                  <button
                    key={`unified-sticker-${item.id}`}
                    onClick={() => onSelectSticker(item.id)}
                    className="bg-white hover:bg-slate-100 hover:shadow active:scale-95 border-2 border-slate-200 rounded-[32px] p-3 flex items-center justify-center aspect-square transition-all cursor-pointer shadow-sm group"
                    title={`${item.label} 스티커 추가`}
                  >
                    <StickerRenderer type={item.id} className="group-hover:scale-108 transition-all max-w-full max-h-full" size="100%" />
                  </button>
                ))}

                {/* 2. Basic Stamps */}
                {(selectedStickerTag === 'all' || selectedStickerTag === 'basic') && basicStamps.map((stamp, idx) => (
                  <button
                    key={`unified-basic-${stamp}-${idx}`}
                    onClick={() => onSelectStamp(stamp)}
                    className="bg-white hover:bg-slate-100 hover:shadow active:scale-95 border-2 border-slate-200/70 rounded-[32px] aspect-square flex items-center justify-center p-3 transition-all cursor-pointer shadow-sm group"
                    title="도장 클릭해서 캔버스에 추가"
                  >
                    <StampRenderer type={stamp} className="group-hover:scale-108 transition-all" size="100%" />
                  </button>
                ))}

                {/* 3. Weather Stamps */}
                {(selectedStickerTag === 'all' || selectedStickerTag === 'weather') && weatherStamps.map((stamp, idx) => (
                  <button
                    key={`unified-weather-${stamp}-${idx}`}
                    onClick={() => onSelectStamp(stamp)}
                    className="bg-white hover:bg-slate-100 hover:shadow active:scale-95 border-2 border-slate-200/70 rounded-[32px] aspect-square flex items-center justify-center p-3 transition-all cursor-pointer shadow-sm group"
                    title="날씨 도장 클릭해서 캔버스에 추가"
                  >
                    <StampRenderer type={stamp} className="group-hover:scale-108 transition-all" size="100%" />
                  </button>
                ))}

                {/* 4. Emotion Stamps */}
                {(selectedStickerTag === 'all' || selectedStickerTag === 'emotion') && emotionStamps.map((stamp, idx) => (
                  <button
                    key={`unified-emotion-${stamp}-${idx}`}
                    onClick={() => onSelectStamp(stamp)}
                    className="bg-white hover:bg-slate-100 hover:shadow active:scale-95 border-2 border-slate-200/70 rounded-[32px] aspect-square flex items-center justify-center p-3 transition-all cursor-pointer shadow-sm group"
                    title="감정 도장 클릭해서 캔버스에 추가"
                  >
                    <StampRenderer type={stamp} className="group-hover:scale-108 transition-all" size="100%" />
                  </button>
                ))}

                {/* 5. Check Stamps */}
                {(selectedStickerTag === 'all' || selectedStickerTag === 'check') && checkStamps.map((stamp, idx) => (
                  <button
                    key={`unified-check-${stamp}-${idx}`}
                    onClick={() => onSelectStamp(stamp)}
                    className="bg-white hover:bg-slate-100 hover:shadow active:scale-95 border-2 border-slate-200/70 rounded-[32px] aspect-square flex items-center justify-center p-3 transition-all cursor-pointer shadow-sm group"
                    title="체크 도장 클릭해서 캔버스에 추가"
                  >
                    <StampRenderer type={stamp} className="group-hover:scale-108 transition-all" size="130%" />
                  </button>
                ))}
              </div>
            </div>
            {/* Added extra scroll padding block */}
            <div className="h-32 w-full shrink-0" />
          </div>
        )}

        {activeTab === 'background' && (
          <div className="flex flex-col gap-7 h-full pb-72">
            <div className="grid grid-cols-2 gap-6" id="bg-grid-panel">
              {backgroundList.map((bg) => {
                const isSelected = currentBg === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => onSelectBackground(bg.id)}
                    className={`rounded-[32px] p-4 flex items-center gap-6 transition-all cursor-pointer text-left border-2 ${
                      isSelected
                        ? 'bg-blue-50/60 border-[#006CFF] text-slate-900 ring-4 ring-[#006CFF]/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
                    }`}
                  >
                    <div className={`w-28 h-22 rounded-xl shrink-0 ${bg.previewClass}`} />
                    <span className="text-xl font-normal truncate">{bg.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Added extra scroll padding block */}
            <div className="h-32 w-full shrink-0" />
          </div>
        )}

        {activeTab === 'tape' && (
          <div className="flex flex-col gap-6 h-full pb-72">
            <div className="grid grid-cols-2 gap-6" id="tape-grid-panel">
              {tapeList.map((tape) => (
                <button
                  key={tape.id}
                  onClick={() => onSelectTape(tape.id)}
                  className="bg-white hover:bg-slate-50 active:scale-98 border-2 border-slate-200 rounded-[24px] p-6 flex flex-col justify-between transition-all text-left cursor-pointer shadow-sm"
                >
                  <div className="w-full h-8 rounded-lg shadow-inner mb-7 border border-slate-200/50" style={getTapeStyle(tape.id)} />
                  <span className="text-xl font-normal text-slate-700 leading-none">{tape.label}</span>
                </button>
              ))}
            </div>
            {/* Added extra scroll padding block */}
            <div className="h-32 w-full shrink-0" />
          </div>
        )}

        {activeTab === 'paper' && (
          <div className="flex flex-col gap-6 h-full pb-72">
            <div className="grid grid-cols-2 gap-7" id="paper-grid-panel">
              {paperList.map((paper) => (
                <button
                  key={paper.id}
                  onClick={() => onSelectPaper(paper.id, paper.bg)}
                  className="bg-white hover:bg-slate-50 active:scale-98 border-2 border-slate-200 rounded-[24px] p-7 flex flex-col gap-4 transition-all cursor-pointer shadow-sm"
                >
                  <div
                    className="w-full h-16 rounded-lg border border-slate-200/50 shadow-inner flex items-center justify-center text-sm font-semibold tracking-wider opacity-90"
                    style={{
                      background: getNoteStyle(paper.id).background,
                      color: getNoteStyle(paper.id).textColor,
                      backgroundSize: paper.id === 'memo_daisy' || paper.id === 'memo_stars' ? '22px 22px' : paper.id === 'memo_gingham' ? '12px 12px' : paper.id === 'memo_kraft' || paper.id === 'memo_grid_blue' ? '12px 12px' : paper.id === 'memo_polka' ? '10px 10px' : 'auto'
                    }}
                  >
                    MEMO
                  </div>
                  <span className="text-xl font-normal text-slate-800 leading-none truncate w-full block">
                    {paper.name}
                  </span>
                </button>
              ))}
            </div>
            {/* Added extra scroll padding block */}
            <div className="h-32 w-full shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};
