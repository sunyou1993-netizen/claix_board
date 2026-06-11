/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
      <div className="w-[340px] bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-slate-100 animate-in fade-in scale-in duration-150">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 block">판서 초기화</span>
            <span className="text-xs font-bold text-slate-500 mt-1.5 block leading-relaxed px-2">
              정말로 지금까지 작성한 필기 내용과 도장들을 모두 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-slate-700 font-bold text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 text-white font-extrabold text-sm bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            삭제 완료
          </button>
        </div>
      </div>
    </div>
  );
};
