/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StickerType } from '../types';

interface StickerRendererProps {
  type: StickerType;
  className?: string;
  size?: number | string;
}

export const StickerRenderer: React.FC<StickerRendererProps> = ({
  type,
  className = '',
  size = '100%',
}) => {
  switch (type) {
    case 'good':
      return (
        <div
          className={`flex items-center justify-center font-bold tracking-wider select-none transform rotate-[-4deg] ${className}`}
          style={{ width: size, height: size, color: '#3B82F6' }}
        >
          {/* Matches the "GOOD" stamp in the premium mock draft with gorgeous italicized hand-rendered outline typography */}
          <span className="text-4xl italic font-black uppercase drop-shadow-[1px_1px_0px_rgba(255,255,255,0.8)] border-2 border-dashed border-blue-500 rounded-lg px-2 py-0.5">
            GOOD
          </span>
        </div>
      );
    case 'fighting':
      return (
        <div
          className={`flex items-center justify-center font-bold select-none transform rotate-[3deg] ${className}`}
          style={{ width: size, height: size, color: '#EF4444' }}
        >
          <span className="text-3xl font-black tracking-tighter bg-amber-100 border-2 border-red-500 rounded-full px-3 py-1 shadow-md whitespace-nowrap">
            🔥 화이팅!
          </span>
        </div>
      );
    case 'well_done':
      return (
        <div
          className={`flex items-center justify-center font-bold select-none ${className}`}
          style={{ width: size, height: size }}
        >
          {/* Classic Korean "참 잘했어요" star-flower medal stamp with double red borders */}
          <div className="w-[85%] h-[85%] rounded-full border-4 border-double border-red-500 flex flex-col items-center justify-center p-1 bg-red-50/70">
            <span className="text-[12px] text-red-500 font-extrabold tracking-tighter leading-none mb-1">
              참 잘했어요
            </span>
            <div className="flex gap-0.5 text-xs text-red-500 leading-none">
              ★ ★ ★
            </div>
          </div>
        </div>
      );
    case 'love':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 30 C 40 10, 10 15, 10 45 C 10 73, 50 90, 50 90 C 50 90, 90 73, 90 45 C 90 15, 60 10, 50 30 Z"
            fill="#FF4B72"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <text
            x="50"
            y="52"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="18"
            fontWeight="bold"
          >
            LOVE
          </text>
        </svg>
      );
    case 'wow':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          className={`transform rotate-[6deg] ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 60 10 L 75 35 L 105 30 L 95 55 L 115 75 L 90 85 L 95 110 L 70 100 L 60 118 L 50 100 L 25 110 L 30 85 L 5 75 L 25 55 L 15 30 L 45 35 Z"
            fill="#FBBF24"
            stroke="#EF4444"
            strokeWidth="4"
          />
          <text
            x="60"
            y="65"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#EF4444"
            fontSize="24"
            fontWeight="900"
            fontStyle="italic"
          >
            WOW!
          </text>
        </svg>
      );
    case 'happy':
      return (
        <div
          className={`flex items-center justify-center select-none ${className}`}
          style={{ width: size, height: size }}
        >
          <div className="w-[85%] h-[85%] rounded-2xl bg-teal-400 text-white font-black text-center flex flex-col items-center justify-center border-2 border-white shadow-md">
            <span className="text-2xl">😊</span>
            <span className="text-[10px] tracking-tight mt-0.5 uppercase">HAPPY DAY</span>
          </div>
        </div>
      );
    case 'congrats':
      return (
        <div
          className={`flex items-center justify-center transform rotate-[-2deg] select-none ${className}`}
          style={{ width: size, height: size }}
        >
          <div className="px-3 py-1.5 bg-indigo-500 text-white font-extrabold text-sm rounded-lg border-2 border-white shadow-lg whitespace-nowrap">
            🎉 축하합니다!
          </div>
        </div>
      );
    case 'cute_bear':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bear Ears */}
          <circle cx="28" cy="30" r="14" fill="#E2B687" stroke="#8B5E3C" strokeWidth="3" />
          <circle cx="28" cy="30" r="7" fill="#FBCFE8" />
          <circle cx="72" cy="30" r="14" fill="#E2B687" stroke="#8B5E3C" strokeWidth="3" />
          <circle cx="72" cy="30" r="7" fill="#FBCFE8" />
          {/* Bear Body/Head */}
          <circle cx="50" cy="55" r="32" fill="#E2B687" stroke="#8B5E3C" strokeWidth="3" />
          {/* Bear Cheek blush */}
          <circle cx="32" cy="58" r="5" fill="#FBCFE8" opacity="0.8" />
          <circle cx="68" cy="58" r="5" fill="#FBCFE8" opacity="0.8" />
          {/* Bear snout */}
          <ellipse cx="50" cy="62" rx="10" ry="7" fill="#FFF" stroke="#8B5E3C" strokeWidth="2" />
          {/* Bear Nose */}
          <polygon points="46,59 54,59 50,63" fill="#8B5E3C" />
          {/* Bear eyes */}
          <circle cx="38" cy="48" r="3" fill="#4B2C1E" />
          <circle cx="62" cy="48" r="3" fill="#4B2C1E" />
          {/* Cute Smile */}
          <path
            d="M 46 64 Q 50 68 54 64"
            stroke="#8B5E3C"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'memo_yellow':
      return (
        <div className={`w-full h-full p-2 bg-yellow-100 border border-yellow-200 shadow-md ${className}`}>
          <div className="w-full text-left font-mono text-[9px] text-yellow-600/60 uppercase border-b border-yellow-200/50 pb-0.5 leading-none mb-1">
            Memo Note
          </div>
          <div className="w-[5px] h-[5px] rounded-full bg-yellow-400 absolute top-1 right-2" />
        </div>
      );
    case 'memo_pink':
      return (
        <div className={`w-full h-full p-2 bg-pink-100 border border-pink-200 shadow-md ${className}`}>
          <div className="w-full text-left font-mono text-[9px] text-pink-600/60 uppercase border-b border-pink-200/50 pb-0.5 leading-none mb-1">
            Memo Note
          </div>
          <div className="w-[5px] h-[5px] rounded-full bg-pink-400 absolute top-1 right-2" />
        </div>
      );
    case 'good_job':
      return (
        <div className={`flex items-center justify-center font-bold select-none rotate-[-2deg] ${className}`} style={{ width: size, height: size }}>
          <span className="text-[12px] sm:text-sm font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 border border-yellow-500 rounded-lg px-1.5 py-0.5 shadow-md whitespace-nowrap flex items-center gap-0.5">
            👍 GOOD JOB!
          </span>
        </div>
      );
    case 'perfect':
      return (
        <div className={`flex items-center justify-center font-bold select-none rotate-[4deg] ${className}`} style={{ width: size, height: size }}>
          <span className="text-[12px] sm:text-sm font-black text-rose-600 bg-rose-50 border-2 border-double border-rose-500 rounded-lg px-1.5 py-0.5 shadow-sm whitespace-nowrap">
            💯 PERFECT !!
          </span>
        </div>
      );
    case 'heart_star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Heart */}
          <path d="M 35 45 C 28 30, 8 32, 8 52 C 8 72, 35 88, 35 88 C 35 88, 62 72, 62 52 C 62 32, 42 30, 35 45 Z" fill="#F43F5E" />
          {/* Yellow Star overlap */}
          <path d="M 65 20 L 71 34 L 86 35 L 75 45 L 79 60 L 65 52 L 51 60 L 55 45 L 44 35 L 59 34 Z" fill="#FBBF24" stroke="#ffffff" strokeWidth="2" />
          <text x="35" y="58" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="950">YOU</text>
          <text x="65" y="42" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="950">STAR</text>
        </svg>
      );
    case 'clover_luck':
      return (
        <div className={`flex items-center justify-center font-bold select-none ${className}`} style={{ width: size, height: size }}>
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-2 shadow-md flex flex-col items-center">
            <span className="text-3xl leading-none">🍀</span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mt-1">LUCKY</span>
          </div>
        </div>
      );
    case 'dino':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Green Dino body */}
          <path d="M 20 80 C 20 50, 40 30, 65 30 C 80 30, 90 42, 85 58 C 82 68, 60 85, 45 85 C 30 85, 20 80, 20 80 Z" fill="#34D399" stroke="#059669" strokeWidth="2.5" />
          {/* Spikes */}
          <polygon points="60,30 65,18 70,30" fill="#F59E0B" />
          <polygon points="45,34 50,22 55,34" fill="#F59E0B" />
          <polygon points="32,45 35,32 40,43" fill="#F59E0B" />
          {/* Dino eye */}
          <circle cx="68" cy="45" r="4.5" fill="#1F2937" />
          <circle cx="69.5" cy="43.5" r="1.5" fill="white" />
          {/* Blush */}
          <circle cx="76" cy="52" r="4.5" fill="#F43F5E" opacity="0.6" />
          {/* Cute Smile */}
          <path d="M 64 54 Q 68 59 72 54" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'star_stamp':
      return (
        <div className={`flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
          <div className="w-[85%] h-[85%] rounded-full bg-yellow-400 text-slate-900 border-2 border-dashed border-amber-600 flex flex-col items-center justify-center p-1 shadow">
            <span className="text-2xl leading-none">✨</span>
            <span className="text-[8px] font-black mt-0.5 tracking-tight uppercase">SUPER STAR</span>
          </div>
        </div>
      );
    case 'check_box_done':
      return (
        <div className={`flex items-center justify-center font-bold select-none rotate-[-4deg] ${className}`} style={{ width: size, height: size }}>
          <span className="text-xl font-black bg-indigo-600 text-white border border-indigo-400 rounded-lg px-2.5 py-1.5 shadow-md whitespace-nowrap flex items-center gap-1.5">
            <span className="inline-block bg-white text-indigo-600 rounded px-1 text-xs">✓</span>
            DONE!
          </span>
        </div>
      );
    case 'coffee':
      return (
        <div className={`flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
          <div className="bg-[#FAFaf9] border-2 border-[#D97706] rounded-xl px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
            <span className="text-2xl">☕</span>
            <span className="text-[9px] font-black text-[#78350F] uppercase tracking-tighter leading-none">휴식시간</span>
          </div>
        </div>
      );
    case 'bulb':
      return (
        <div className={`flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
          <div className="bg-amber-50 border-2 border-yellow-400 rounded-full w-[85%] h-[85%] flex flex-col items-center justify-center shadow">
            <span className="text-2xl leading-none">💡</span>
            <span className="text-[8px] font-black text-amber-700 tracking-tighter">IDEA!</span>
          </div>
        </div>
      );
    case 'rainbow_sticker':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Rainbow Arcs */}
          <path d="M 15 65 A 35 35 0 0 1 85 65" stroke="#FF6B6B" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 23 65 A 27 27 0 0 1 77 65" stroke="#FFE200" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 31 65 A 19 19 0 0 1 69 65" stroke="#4CD964" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 39 65 A 11 11 0 0 1 61 65" stroke="#006CFF" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Clouds */}
          <path d="M 10 70 C 5 70, 2 64, 5 58 C 2 50, 10 45, 18 48 C 22 43, 30 45, 33 50 C 37 48, 41 53, 38 58 C 42 63, 38 70, 31 69 C 26 71, 14 71, 10 70 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          <path d="M 67 70 C 62 70, 59 64, 62 58 C 59 50, 67 45, 75 48 C 79 43, 87 45, 90 50 C 94 48, 98 53, 95 58 C 99 63, 95 70, 88 69 C 83 71, 71 71, 67 70 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
};
