/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StampType } from '../types';

interface StampRendererProps {
  type: StampType;
  className?: string;
  size?: number | string;
  color?: string;
}

export const StampRenderer: React.FC<StampRendererProps> = ({
  type,
  className = '',
  size = '100%',
  color,
}) => {
  // Respect user theme and custom selected colors, with defaults reflecting mock draft
  switch (type) {
    case 'dotted_square':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            rx="12"
            stroke={color || '#9CAAEC'}
            strokeWidth="3.5"
            strokeDasharray="6 6"
          />
        </svg>
      );
    case 'circle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handdrawn circle styled to match mock perfectly */}
          <path
            d="M 50 12 C 72 11, 88 28, 88 50 C 88 73, 70 88, 48 88 C 24 88, 12 70, 12 50 C 12 28, 28 12, 53 12 C 60 12, 78 16, 82 22"
            stroke={color || '#006CFF'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'star_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 10 L 62 36 L 90 38 L 68 56 L 75 84 L 50 68 L 25 84 L 32 56 L 10 38 L 38 36 Z"
            stroke={color || '#7C3AED'}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'heart_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 30 C 40 10, 10 15, 10 45 C 10 70, 50 90, 50 90 C 50 90, 90 70, 90 45 C 90 15, 60 10, 50 30 Z"
            stroke={color || '#8B5CF6'}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'flower_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 38 C 50 20, 38 20, 38 38 C 20 38, 20 50, 38 50 C 38 68, 50 68, 50 50 C 68 50, 68 38, 50 38 Z"
            stroke={color || '#EC4899'}
            strokeWidth="4.5"
            strokeLinejoin="round"
            className="origin-center rotate-45"
          />
          <circle cx="50" cy="50" r="6" stroke={color || '#EC4899'} strokeWidth="4" />
        </svg>
      );
    case 'bubble':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 15 25 C 15 17, 23 10, 50 10 C 77 10, 85 17, 85 25 C 85 45, 75 55, 50 55 C 44 55, 38 58, 25 65 C 28 55, 15 48, 15 25 Z"
            stroke={color || '#6B7280'}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'check':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handdrawn bold red checkmark */}
          <path
            d="M 16 52 C 24 58, 32 72, 38 80 C 44 70, 62 42, 84 18"
            stroke={color || '#EF4444'}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'cross':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 20 L 80 80 M 80 20 L 20 80"
            stroke={color || '#2563EB'}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'smile':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" stroke={color || '#F59E0B'} strokeWidth="4" />
          <circle cx="35" cy="40" r="4.5" fill={color || '#F59E0B'} />
          <circle cx="65" cy="40" r="4.5" fill={color || '#F59E0B'} />
          <path
            d="M 30 60 C 35 72, 65 72, 70 60"
            stroke={color || '#F59E0B'}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'thumbs_up':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 50 L 20 85 C 20 87, 22 89, 25 89 L 35 89 L 35 50 Z M 35 50 C 38 43, 45 28, 50 12 C 55 12, 52 28, 52 38 L 78 38 C 84 38, 86 42, 85 50 L 78 80 C 76 85, 70 89, 65 89 L 35 89"
            stroke={color || '#10B981'}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 30 C 40 10, 10 15, 10 45 C 10 70, 50 90, 50 90 C 50 90, 90 70, 90 45 C 90 15, 60 10, 50 30 Z"
            fill={color || '#EF4444'}
            stroke="#DC2626"
            strokeWidth="2"
          />
          {/* Heart soft highlight gloss to give it premium look */}
          <path
            d="M 22 30 C 18 35, 18 45, 22 50"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );
    case 'star':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Golden yellow filled star matching the star stamp in bottom-left */}
          <g>
            <path
              d="M 50 10 L 62 36 L 90 38 L 68 56 L 75 84 L 50 68 L 25 84 L 32 56 L 10 38 L 38 36 Z"
              fill={color || '#FBBF24'}
              stroke="#D97706"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* The cute spark lines next to the stamp */}
            <path d="M 12 18 L 18 22" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <path d="M 88 18 L 82 22" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <path d="M 90 52 L 95 54" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'clover_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 50 C 35 35, 20 50, 35 65 C 50 80, 50 50, 50 50 C 50 50, 65 35, 80 50 C 95 65, 80 80, 65 65 C 50 50, 50 50, 50 50 C 50 50, 65 65, 50 80 C 35 95, 20 80, 35 65 C 50 50, 50 50, 50 50 C 50 50, 35 35, 50 20 C 65 5, 80 20, 65 35 Z M 50 65 Q 50 85 40 92"
            stroke={color || '#10B981'}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'crown_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 15 80 L 10 35 L 35 55 L 50 25 L 65 55 L 90 35 L 85 80 Z"
            stroke={color || '#D97706'}
            strokeWidth="4.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <line x1="15" y1="70" x2="85" y2="70" stroke={color || '#D97706'} strokeWidth="3" />
        </svg>
      );
    case 'cloud_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 25 65 C 15 65, 10 55, 15 45 C 10 30, 25 20, 40 25 C 48 15, 68 15, 75 25 C 90 22, 95 38, 88 50 C 95 60, 85 70, 75 67 C 65 72, 35 72, 25 65 Z"
            stroke={color || '#0ea5e9'}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'sun_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="22" stroke={color || '#f97316'} strokeWidth="4.5" />
          <path
            d="M 50 12 L 50 2 M 50 88 L 50 98 M 12 50 L 2 50 M 88 50 L 98 50 M 23 23 L 16 16 M 77 77 L 84 84 M 23 77 L 16 84 M 77 23 L 84 16"
            stroke={color || '#f97316'}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'moon_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 75 20 C 50 20, 25 40, 25 65 C 25 85, 45 90, 60 85 C 40 80, 42 50, 65 40 C 72 37, 78 32, 75 20 Z"
            stroke={color || '#6366f1'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'music_outline':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="25" cy="75" rx="12" ry="8" stroke={color || '#a855f7'} strokeWidth="4" />
          <ellipse cx="65" cy="65" rx="12" ry="8" stroke={color || '#a855f7'} strokeWidth="4" />
          <path
            d="M 37 75 L 37 25 L 77 15 L 77 65"
            stroke={color || '#a855f7'}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 37 25 L 77 15"
            stroke={color || '#a855f7'}
            strokeWidth="10"
            strokeLinecap="butt"
          />
        </svg>
      );
    case 'clover':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 50 C 35 35, 20 50, 35 65 C 50 80, 50 50, 50 50 C 50 50, 65 35, 80 50 C 95 65, 80 80, 65 65 C 50 50, 50 50, 50 50 C 50 50, 65 65, 50 80 C 35 95, 20 80, 35 65 C 50 50, 50 50, 50 50 C 50 50, 35 35, 50 20 C 65 5, 80 20, 65 35 Z"
            fill={color || '#10B981'}
            stroke="#047857"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 50 65 Q 50 85 36 93"
            stroke="#047857"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case 'crown':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 15 80 L 10 35 L 35 55 L 50 25 L 65 55 L 90 35 L 85 80 Z"
            fill={color || '#FBBF24'}
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="22" y="68" width="56" height="5" fill="#EF4444" rx="2" />
          <circle cx="10" cy="35" r="4" fill="#EF4444" />
          <circle cx="50" cy="25" r="4" fill="#3B82F6" />
          <circle cx="90" cy="35" r="4" fill="#10B981" />
        </svg>
      );
    case 'cloud':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 25 65 C 15 65, 10 55, 15 45 C 10 30, 25 20, 40 25 C 48 15, 68 15, 75 25 C 90 22, 95 38, 88 50 C 95 60, 85 70, 75 67 C 65 72, 35 72, 25 65 Z"
            fill={color || '#bae6fd'}
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 33 42 Q 35 44 38 42 M 62 42 Q 64 44 67 42"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 45 52 Q 50 56 55 52"
            stroke="#0284c7"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'apple':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 32 C 45 22, 18 22, 18 48 C 18 72, 45 88, 50 88 C 55 88, 82 72, 82 48 C 82 22, 55 22, 50 32 Z"
            fill={color || '#EF4444'}
            stroke="#B91C1C"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 50 32 Q 53 15 65 10"
            stroke="#78350F"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 56 18 Q 70 15 65 28 Z"
            fill="#10B981"
            stroke="#047857"
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'cat':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cute Cat Silhouette */}
          <path
            d="M 35 60 C 25 60, 20 72, 20 85 C 20 90, 80 90, 80 85 C 80 72, 75 60, 65 60 L 65 42 L 72 25 L 58 35 L 42 35 L 28 25 L 35 42 Z"
            fill={color || '#475569'}
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="45" r="2" fill="white" />
          <circle cx="58" cy="45" r="2" fill="white" />
          <polygon points="48,49 52,49 50,51" fill="#f43f5e" />
          <path d="M 45 54 Q 50 56 55 54" stroke="#1e293b" strokeWidth="1.5" fill="none" />
          {/* Swirly tail */}
          <path
            d="M 75 84 Q 90 84 88 68 Q 86 55 92 50"
            stroke={color || '#475569'}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case 'tree':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stump */}
          <rect x="44" y="60" width="12" height="28" fill="#78350F" stroke="#451a03" strokeWidth="2.5" rx="3" />
          {/* Pine leaves hierarchy */}
          <polygon points="50,12 20,42 80,42" fill={color || '#059669'} stroke="#047857" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="50,30 14,64 86,64" fill={color || '#059669'} stroke="#047857" strokeWidth="3" strokeLinejoin="round" />
          {/* Ornaments/apples */}
          <circle cx="38" cy="48" r="3.5" fill="#EF4444" />
          <circle cx="62" cy="54" r="3.5" fill="#FBBF24" />
          <circle cx="50" cy="36" r="3.5" fill="#EF4444" />
        </svg>
      );
    default:
      if (typeof type === 'string' && type.startsWith('emoji:')) {
        const symbol = type.substring(6);
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50"
              y="60"
              fontSize="68"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {symbol}
            </text>
          </svg>
        );
      }
      return null;
  }
};
