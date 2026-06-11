/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Share2, X } from 'lucide-react';

interface HeaderProps {
  onShare: () => void;
  onClose: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onShare,
  onClose,
  title = '판서',
}) => {
  return (
    <div className="w-full h-[120px] flex items-center justify-between px-6 bg-transparent select-none" id="btn-header-container">
      {/* App Title */}
      <div className="flex items-center gap-4">
        <span className="text-[52px] font-semibold text-slate-900 tracking-tight leading-none" id="app-title">
          {title}
        </span>
      </div>

      {/* Right Action buttons */}
      <div className="flex items-center gap-4">
        {/* Share Button (Accent Deep Charcoal Color instead of Blue) */}
        <button
          onClick={onShare}
          className="flex items-center gap-2.5 px-5 py-3 bg-slate-700 hover:bg-slate-800 active:scale-95 text-white font-semibold text-[36px] rounded-[20px] shadow-md shadow-slate-500/10 hover:shadow-lg transition-all leading-none"
          id="btn-share"
        >
          <Share2 className="w-9 h-9 stroke-[2.5]" />
          <span>공유</span>
        </button>

        {/* Close Button / Reset state */}
        <button
          onClick={onClose}
          className="px-7 py-3 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 font-semibold text-[36px] rounded-[20px] border border-slate-200/80 shadow-sm transition-all leading-none"
          id="btn-reset"
        >
          <span>닫기</span>
        </button>
      </div>
    </div>
  );
};
