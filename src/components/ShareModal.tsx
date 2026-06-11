/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, Copy, Download, QrCode } from 'lucide-react';
import { Stroke, CanvasElement, BackgroundType } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  strokes: Stroke[];
  elements: CanvasElement[];
  background: BackgroundType;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  strokes,
  elements,
  background,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  if (!isOpen) return null;

  // Real core implementation of whiteboard drawing & absolute elements consolidation onto exportable binary PNG!
  const handleExportPNG = () => {
    const virtualWidth = 1000;
    const virtualHeight = 1100;

    // Create a temporary canvas on-the-fly
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1000;
    exportCanvas.height = 1100;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Fill base background matching current workspace setup
    if (background === 'blackboard') {
      ctx.fillStyle = '#134E4A';
      ctx.fillRect(0, 0, virtualWidth, virtualHeight);

      // Blackboard dusty finish
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.02;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * virtualWidth, Math.random() * virtualHeight, 20 + Math.random() * 60, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    } else {
      ctx.fillStyle = '#FDFBF7';
      ctx.fillRect(0, 0, virtualWidth, virtualHeight);
    }

    // Draw background guide grids & rules
    if (background === 'grid') {
      ctx.strokeStyle = 'rgba(156,170,236,0.18)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = step; x < virtualWidth; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, virtualHeight);
        ctx.stroke();
      }
      for (let y = step; y < virtualHeight; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(virtualWidth, y);
        ctx.stroke();
      }
    } else if (background === 'lined') {
      ctx.strokeStyle = 'rgba(96,165,250,0.25)';
      ctx.lineWidth = 1;
      const spacing = 50;
      for (let y = 100; y < virtualHeight; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(virtualWidth - 40, y);
        ctx.stroke();
      }
    }

    // 2. Render normal canvas handwriting stroke trails
    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.globalAlpha = stroke.opacity;
      ctx.lineCap = stroke.type === 'highlighter' ? 'square' : 'round';
      ctx.lineJoin = 'round';

      const points = stroke.points;
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
    });

    // 3. Render absolutely positioned stencils, text, and stickies!
    elements.forEach((el) => {
      ctx.save();
      // Apply translation, rotation and scaling parameters matching active transformations
      ctx.translate(el.x, el.y);
      ctx.rotate((el.rotation * Math.PI) / 180);
      ctx.scale(el.scale, el.scale);

      const halfW = el.width / 2;
      const halfH = el.height / 2;

      if (el.type === 'note') {
        // Draw physical memo box shape
        ctx.fillStyle = el.bgColor || '#FEF08A';
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, el.width, el.height, 12);
        ctx.fill();
        ctx.stroke();

        // Note pin
        ctx.fillStyle = '#EAB308';
        ctx.beginPath();
        ctx.arc(0, -halfH + 12, 4, 0, Math.PI * 2);
        ctx.fill();

        // Text inside memo
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // Word wrapped text output in canvas (simplified)
        const textVal = el.value || '';
        const lines = textVal.split('\n');
        let textY = -halfH + 28;
        lines.forEach((l) => {
          ctx.fillText(l, -halfW + 12, textY);
          textY += 16;
        });
      }

      if (el.type === 'text') {
        ctx.fillStyle = el.color || '#006CFF';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.value || '', 0, 0);
      }

      // Draw stamps manually as beautiful custom graphic pathways
      if (el.type === 'stamp') {
        ctx.strokeStyle = el.color || '#006CFF';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        if (el.subType === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, 24, 0, Math.PI * 2);
          ctx.stroke();
        } else if (el.subType === 'check') {
          ctx.strokeStyle = el.color || '#EF4444';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(-16, 2);
          ctx.lineTo(-4, 14);
          ctx.lineTo(16, -14);
          ctx.stroke();
        } else if (el.subType === 'star') {
          ctx.fillStyle = el.color || '#FBBF24';
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 2;
          ctx.beginPath();
          // Five pointed star path coordinates
          ctx.moveTo(0, -22);
          ctx.lineTo(6, -7);
          ctx.lineTo(22, -6);
          ctx.lineTo(10, 5);
          ctx.lineTo(15, 21);
          ctx.lineTo(0, 11);
          ctx.lineTo(-15, 21);
          ctx.lineTo(-10, 5);
          ctx.lineTo(-22, -6);
          ctx.lineTo(-6, -7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          // Fallback box for other basic outline elements
          ctx.strokeStyle = el.color || '#7C3AED';
          ctx.beginPath();
          ctx.roundRect(-20, -20, 40, 40, 6);
          ctx.stroke();
        }
      }

      if (el.type === 'sticker') {
        // Draw sticker container shapes
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, el.width, el.height, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#006CFF';
        ctx.font = 'black 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.subType?.toUpperCase() || 'STICKER', 0, 0);
      }

      ctx.restore();
    });

    // Create immediate file trigger download link
    const downloadLink = document.createElement('a');
    downloadLink.download = `판서_보드_내보내기_${new Date().getTime()}.png`;
    downloadLink.href = exportCanvas.toDataURL('image/png');
    downloadLink.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
      <div className="w-[360px] bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-black text-slate-900">판서 화면 저장 및 공유</span>
          <button
            onClick={onClose}
            className="p-1 px-1.5 hover:bg-slate-100 active:scale-95 rounded-lg text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-col gap-3">
          {/* Main Action Blue Button: PNG Export */}
          <button
            onClick={handleExportPNG}
            className="w-full py-4.5 bg-[#006CFF] hover:bg-[#005AE0] active:scale-98 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-md shadow-blue-500/10 cursor-pointer transition-all"
          >
            <Download className="w-5 h-5 stroke-[2.5]" />
            이미지 파일(PNG)로 다운로드
          </button>

          {/* Core option - copy address */}
          <button
            onClick={handleCopyLink}
            className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 active:scale-98 text-slate-700 border border-slate-200/80 font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 cursor-pointer transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600 stroke-[3]" />
                <span className="text-green-600">링크 주소 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>스튜디오 링크 공유 복사</span>
              </>
            )}
          </button>

          {/* QR Code toggle option */}
          <button
            onClick={() => setQrOpen(!qrOpen)}
            className="w-full py-3.5 bg-white hover:bg-slate-50 active:scale-98 text-slate-700 border border-slate-200 font-extrabold text-xs rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <QrCode className="w-4 h-4 text-slate-600" />
              <span>기기 연동 간편 QR 코드</span>
            </div>
            {qrOpen && (
              <div className="mt-4 p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center gap-2 animate-in slide-in-from-top-3">
                {/* Simulated QR Code box */}
                <div className="w-32 h-32 bg-white flex items-center justify-center border-2 border-[#006CFF] rounded-xl p-2 relative">
                  <div className="w-full h-full bg-[radial-gradient(#000_18%,transparent_18%)] bg-[size:8px_8px] opacity-75" />
                  <div className="top-2 left-2 w-4 h-4 bg-black absolute" />
                  <div className="top-2 right-2 w-4 h-4 bg-black absolute" />
                  <div className="bottom-2 left-2 w-4 h-4 bg-black absolute" />
                  <div className="w-6 h-6 bg-[#006CFF] rounded-full absolute" />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 font-bold">
                  카메라로 QR을 비춰 연결하세요.
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Notice text */}
        <span className="text-[10px] text-slate-400 font-bold leading-relaxed text-center block">
          💡 PNG 파일은 화이트보드 캔버스에 수록된 손글씨 낙서와 도장, 메모를 결합하여 하나의 고화질 투명/기본 그림 파일로 만들어줍니다.
        </span>
      </div>
    </div>
  );
};
