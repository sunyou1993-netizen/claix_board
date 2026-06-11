import { TapeType } from '../types';
import React from 'react';

export interface TapeOption {
  id: TapeType;
  label: string;
}

export const tapeList: TapeOption[] = [
  { id: 'solid_blue', label: '밀크 블루' },
  { id: 'solid_yellow', label: '레몬 옐로우' },
  { id: 'solid_green', label: '아보카도 소프트' },
  { id: 'solid_pink', label: '스트로베리 크림' },
  { id: 'rainbow_tape', label: '무지개 구름 레일' },
  { id: 'stripes', label: '사선 마린피치' },
  { id: 'diagonal_mint', label: '민트 세로사선' },
  { id: 'checkerboard', label: '체커보드 모노' },
  { id: 'gingham_rose', label: '체리 깅엄체크' },
  { id: 'tartan_indigo', label: '타탄 플레이드' },
  { id: 'polka_dot', label: '체리 레드폴카' },
  { id: 'hearts_pattern', label: '로맨틱 미니하트' },
  { id: 'stars_night', label: '스텔라 미드나잇' },
  { id: 'cloud_dream', label: '보랏빛 솜구름' },
  { id: 'daisy_garden', label: '노랑 데이지들' },
  { id: 'cherry_garden', label: '달콤 체리 가든' },
  { id: 'retro_grid', label: '레트로 모눈노트' },
  { id: 'paw_prints', label: '초코 꼬마발자국' },
];

export function getTapeStyle(type: TapeType): React.CSSProperties {
  switch (type) {
    case 'solid_blue':
      return {
        backgroundColor: '#006CFF',
        backgroundImage: 'none',
        backgroundSize: 'auto',
      };
    case 'solid_yellow':
      return {
        backgroundColor: '#FFE200',
        backgroundImage: 'none',
        backgroundSize: 'auto',
      };
    case 'solid_green':
      return {
        backgroundColor: '#5B8C5A',
        backgroundImage: 'none',
        backgroundSize: 'auto',
      };
    case 'solid_pink':
      return {
        backgroundColor: '#F472B6',
        backgroundImage: 'none',
        backgroundSize: 'auto',
      };
    case 'rainbow_tape':
      return {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(90deg, #F87171, #FBBF24, #34D399, #60A5FA, #A78BFA)',
        backgroundSize: '100% 100%',
      };
    case 'stripes':
      return {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(45deg, #FF6B6B 25%, #F0F3F4 25%, #F0F3F4 50%, #FF6B6B 50%, #FF6B6B 75%, #F0F3F4 75%, #F0F3F4 100%)',
        backgroundSize: '14px 14px',
      };
    case 'diagonal_mint':
      return {
        backgroundColor: '#A7F3D0',
        backgroundImage: 'linear-gradient(135deg, #10B981 25%, transparent 25%, transparent 50%, #10B981 50%, #10B981 75%, transparent 75%, transparent)',
        backgroundSize: '14px 14px',
      };
    case 'checkerboard':
      return {
        backgroundColor: '#E2E8F0',
        backgroundImage: 'linear-gradient(45deg, #475569 25%, transparent 25%, transparent 75%, #475569 75%, #475569 100%), linear-gradient(45deg, #475569 25%, transparent 25%, transparent 75%, #475569 75%, #475569 100%)',
        backgroundSize: '16px 16px',
        backgroundPosition: '0 0, 8px 8px',
      };
    case 'gingham_rose':
      return {
        backgroundColor: '#FCE7F3',
        backgroundImage: 'linear-gradient(90deg, rgba(244,63,94,0.35) 50%, transparent 50%), linear-gradient(rgba(244,63,94,0.35) 50%, transparent 50%)',
        backgroundSize: '16px 16px',
      };
    case 'tartan_indigo':
      return {
        backgroundColor: '#1E3A8A',
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.3) 4px, transparent 4px), linear-gradient(rgba(244,63,94,0.3) 4px, transparent 4px)',
        backgroundSize: '20px 20px, 20px 20px, 40px 40px, 40px 40px',
      };
    case 'polka_dot':
      return {
        backgroundColor: '#EF4444',
        backgroundImage: 'radial-gradient(#ffffff 20%, transparent 20%)',
        backgroundSize: '8px 8px',
      };
    case 'retro_grid':
      return {
        backgroundColor: '#F8FAFC',
        backgroundImage: 'linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      };

    // Vector SVG Custom Designs
    case 'hearts_pattern':
      return {
        backgroundColor: '#FFE4E6',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSczMicgaGVpZ2h0PSczMicgdmlld0JveD0nMCAwIDMyIDMyJz48cmVjdCB3aWR0aD0nMzInIGhlaWdodD0nMzInIGZpbGw9JyNGRkU0RTYnLz48cGF0aCBkPSdNMTYgMTEuNWMtMS4yLTEuOC0zLjUtMi4yLTQuOC0uOC0xLjUgMS41LTEuMSA0LjUgMS43IDcuMWwzLjEgMi45IDMuMS0yLjljMi44LTIuNiAzLjItNS42IDEuNy03LjEtMS4zLTEuNC0zLjYtMS00LjguOHonIGZpbGw9JyNGNDNGNUUnLz48cGF0aCBkPSdNMCAyNy41QzAgMjUuNyAxLjIgMjQuNSAyIDI0LjVzMiAxLjIgMiAzYzAgMi00IDQtNCAweicgZmlsbD0nI0ZEQTRBRicvPjxwYXRoIGQ9J00zMiAyNy41QzMyIDI1LjcgMzMuMiAyNC41IDM0IDI0LjVzMiAxLjIgMiAzYzAgMi00IDQtNCAweicgZmlsbD0nI0ZEQTRBRicvPjxjaXJjbGUgY3g9JzI2JyBjeT0nMTAnIHI9JzEuNScnIGZpbGw9JyNGQkJGMjQnLz48Y2lyY2xlIGN4PSc2JyBjeT0nMjInIHI9JzEuNScnIGZpbGw9JyNGQkJGMjQnLz48L3N2Zz4=")`,
        backgroundSize: '32px 32px',
      };

    case 'daisy_garden':
      return {
        backgroundColor: '#FEF9C3',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRUY5QzMiLz48cGF0aCBkPSJNMjAgMjAgTDIwIDM1IE0yMCAyOCBRMTUgMjYgMTUgMjQgTTIwIDMwIFFjNSAyOCAyNiAyNiIgc3Ryb2tlPSIjMzREMzk5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+PGVsbGlwc2UgY3g9IjIwIiBjeT0iMTMiIHJ4PSIzLjUiIHJ5PSI1IiBmaWxsPSIjVkZGRkZGIi8+PGVsbGlwc2UgY3g9IjIwIiBjeT0iMjciIHJ4PSIzLjUiIHJ5PSI1IiBmaWxsPSIjVkZGRkZGIi8+PGVsbGlwc2UgY3g9IjEzIiBjeT0iMjAiIHJ4PSI1IiByeT0iMy41IiBmaWxsPSIjVkZGRkZGIi8+PGVsbGlwc2UgY3g9IjI3IiBjeT0iMjAiIHJ4PSI1IiByeT0iMy41IiBmaWxsPSIjVkZGRkZGIi8+PGVsbGlwc2UgY3g9IjE1IiBjeT0iMTUiIHJ4PSI0IiByeT0iNCIgZmlsbD0iI1dGRkZGRiIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTUgMTUpIi8+PGVsbGlwc2UgY3g9IjI1IiBjeT0iMjUiIHJ4PSI0IiByeT0iNCIgZmlsbD0iI1dGRkZGRiIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMjUgMjUpIi8+PGVsbGlwc2UgY3g9IjE1IiBjeT0iMjUiIHJ4PSI0IiByeT0iNCIgZmlsbD0iI1dGRkZGRiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1IDI1KSIvPjxlbGxpcHNlIGN4PSIyNSIgY3k9IjE1IiByeD0iNCIgcnk9IjQiIGZpbGw9IiNXRkZGRkYiIHRyYW5zZm9ybT0icm90YXRlKC00NSAyNSAxNSkiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjRjU5RTBCIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiwgMzIpIHNjYWxlKDAuNikiPjxjaXJjbGUgY3g9IjAiIGN5PSItNiIgcj0iMyIgZmlsbD0iI1dGRkZGRiIvPjxjaXJjbGUgY3g9IjAiIGN5PSI2IiByPSIzIiBmaWxsPSIjV0ZGRkZGIi8+PGNpcmNsZSBjeD0iLTYiIGN5PSIwIiByPSIzIiBmaWxsPSIjV0ZGRkZGIi8+PGNpcmNsZSBjeD0iNiIgY3k9IjAiIHJ9PSIzIiBmaWxsPSIjV0ZGRkZGIi8+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHJ9PSIzIiBmaWxsPSIjRjU5RTBCIi8+PC9nPmcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQsIDgpIHNjYWxlKDAuNikiPjxjaXJjbGUgY3g9IjAiIGN5PSItNiIgcj0iMyIgZmlsbD0iI1dGRkZGRiIvPjxjaXJjbGUgY3g9IjAiIGN5PSI2IiByPSIzIiBmaWxsPSIjV0ZGRkZGIi8+PGNpcmNsZSBjeD0iLTYiIGN5PSIwIiByPSIzIiBmaWxsPSIjV0ZGRkZGIi8+PGNpcmNsZSBjeD0iNiIgY3k9IjAiIHJ9PSIzIiBmaWxsPSIjV0ZGRkZGIi8+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHJ9PSIzIiBmaWxsPSIjRjU5RTBCIi8+PC9nPjwvc3ZnPg==")`,
        backgroundSize: '40px 40px',
      };

    case 'cloud_dream':
      return {
        backgroundColor: '#EEF2FF',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDQ4IDM2Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iMzYiIGZpbGw9IiNFRUYyRkYiLz48ZyBmaWxsPSIjV0ZGRkZGIiBvcGFjaXR5PSIwLjk1Ij48cGF0aCBkPSJNMTIgMjRoMTZhNiA2IDAgMCAwIDYtNiA2IDYgMCAwIDAtNi02IDcgNyAwIDAgMC0xMyAwIDUgNSAwIDAgMC0zIDEyeiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTgiIHI9IjAuOCIgZmlsbD0iIzZCMjFBAi8+PGNpcmNsZSBjeD0iMjIiIGN5PSIxOCIgcj0iMC44IiBmaWxsPSIjNkIyMUE4Ii8+PHBhdGggZD0iTTE4IDE5LjUgcTEgMS4yIDIgMCIgc3Ryb2tlPSIjNkIyMUE4IiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvZz48cGF0aCBkPSJNMzggMTIgbDEgMi41IGwyLjUgMSBsLTIuNSAxIGwtMSAyLjUgbC0xLTIuNSBsLTIuNS0xIGwyLjUtMSB6IiBmaWxsPSIjRkRFMDQ3Ii8+PGcgZmlsbD0iI1dGRkZGRiIgb3BhY2l0eT0iMC46IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNCwgMjQpIHNjYWxlKDAuNikiPjxwYXRoIGQ9Ik0xMiAyNGgxNmE2IDYgMCAwIDAgYTYtNiA2IDYgMCAwIDAtNi02IDcgNyAwIDAgMC0xMyAwIDUgNSAwIDAgMC0zIDEyeiIvPjwvc3ZnPg==")`,
        backgroundSize: '48px 36px',
      };

    case 'cherry_garden':
      return {
        backgroundColor: '#FFF1F2',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48cmVjdCB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9IiNGRkYxRjIiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LCAyKSI+PHBhdGggZD0iTTE4IDEwIFFMTQgMTYgMTAgMjIgTTE4IDEwIFFJMjIgMTYgMjQgMjIiIHN0cm9rZT0iIzEwQjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xOCAxMCBRMjQgNyAyNCAxMSBaIiBmaWxsPSIjMTBCODgxIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIyMiIgcj0iNC41IiBmaWxsPSIjRTExRDQ4Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iMjAuNSIgcj0iMS4zIiBmaWxsPSIjV0ZGRkZGIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjIyIiByPSI0LjUiIGZpbGw9IiNFMTFEDDQ4Ii8+PGNpcmNsZSBjeD0iMjIuNSIgY3k9IjIwLjUiIHI9IjEuMyIgZmlsbD0iI1dGRkZGRiIgb3BhY2l0eT0iMC44Ii8+PC9nPmcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQsIDI2KSBzY2FsZSgwLjYpIj48cGF0aCBkPSJNOCA0IFF0IDggMiAxMiIgc3Ryb2tlPSIjMTBCODgxIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMiIgY3k9IjEyIiByPSIzLjUiIGZpbGw9IiNGNDNGNUUiLz48Y2lyY2xlIGN4PSIxIiBjeT0iMTEiIHI9IjEiIGZpbGw9IiNXRkZGRkYiIG9wYWNpdHk9IjAuOCIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LCA2KSBzY2FsZSgwLjUpIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI0IiBmaWxsPSIjRkJCRjI0IiBvcGFjaXR5PSIwLjgiLz48L2c+PC9zdmc+")`,
        backgroundSize: '36px 36px',
      };

    case 'stars_night':
      return {
        backgroundColor: '#1E1B4B',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxRTFCNEIiLz48cGF0aCBkPSJNMjggMTAgQTggOCAwIDAgMSAyMCAyMiBBOCA4IDAgMSAwIDI4IDEwIHoiIGZpbGw9IiNGQ0QzNEQiIG9wYWNpdHk9IjAuOSIvPjxnIHRyYW5zbG9ybT0idHJhbnNhbGUoMTIsIDE2KSI+PHBhdGggZD0iTTggMCBMMTAgNSBMMTUgNiBMMTEgMTAgTDEyIDE1IEw4IDEyIEw4IDE1IEw1IDEwIEwxIDYgTDYgNSIgZmlsbD0iI0ZERTA0NyIvPjwvZz48Y2lyY2xlIGN4PSI2IiBjeT0iOCIgcj0iMSIgZmlsbD0iI1dGRkZGRiIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMjgiIHI9IjEuMiIgZmlsbD0iI1dGRkZGRiIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMzQiIHI9IjAuOCIgZmlsbD0iI1dGRkZGRiIvPjwvc3ZnPg==")`,
        backgroundSize: '40px 40px',
      };

    case 'paw_prints':
      return {
        backgroundColor: '#FFFBEB',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48cmVjdCB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9IiNGRkZCRUIiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LCA4KSIgZmlsbD0iIzc4MzUwRiI+PGVsbGlwc2UgY3g9IjEwIiBjeT0iMTQiIHJ4PSI0LjUiIHJ5PSIzLjUiLz48Y2lyY2xlIGN4PSI1IiBjeT0iOCIgcj0iMS44Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iNS41IiByPSIxLjgiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iNiIgcj0iMS44Ii8+PGNpcmNsZSBjeD0iMTUuNSIgY3k9IjkuNSIgcj0iMS44Ii8+PC9nPmcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQsIDI0KSBzY2FsZSgwLjY1KSIgZmlsbD0iIzkyNDAwRSIgb3BhY2l0eT0iMC44NSI+PGVsbGlwc2UgY3g9IjEwIiBjeT0iMTQiIHJ4PSI0LjUiIHJ5PSIzLjUiLz48Y2lyY2xlIGN4PSI1IiBjeT0iOCIgcj0iMS44Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iNS41IiByPSIxLjgiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iNiIgcj0iMS44Ii8+PGNpcmNsZSBjeD0iMTUuNSIgY3k9IjkuNSIgcj0iMS44Ii8+PC9nPjwvc3ZnPg==")`,
        backgroundSize: '36px 36px',
      };

    default:
      return {
        backgroundColor: '#F59E0B',
        backgroundImage: 'none',
        backgroundSize: 'auto',
      };
  }
}
