import { TapeType } from '../types';
import React from 'react';

export interface TapeOption {
  id: TapeType;
  label: string;
}

export const tapeList: TapeOption[] = [
  { id: 'solid_blue', label: '푸른 파도 고래' },
  { id: 'solid_yellow', label: '화사한 꿀벌 허니' },
  { id: 'solid_green', label: '싱그러운 네잎클로버' },
  { id: 'solid_pink', label: '달콤 딸기 우유' },
  { id: 'rainbow_tape', label: '무지개 구름 레일' },
  { id: 'stripes', label: '새콤 오렌지 썬샤인' },
  { id: 'diagonal_mint', label: '시원한 미니선인장' },
  { id: 'checkerboard', label: '빈티지 레트로 플라워' },
  { id: 'gingham_rose', label: '피크닉 빨간 스트로베리' },
  { id: 'tartan_indigo', label: '우주 비행 UFO' },
  { id: 'polka_dot', label: '귀여운 꼬마 오리' },
  { id: 'hearts_pattern', label: '로맨틱 미니하트' },
  { id: 'stars_night', label: '스텔라 미드나잇' },
  { id: 'cloud_dream', label: '보랏빛 솜구름' },
  { id: 'daisy_garden', label: '노랑 데이지들' },
  { id: 'cherry_garden', label: '달콤 체리 가든' },
  { id: 'retro_grid', label: '행복한 봄날 튤립' },
  { id: 'paw_prints', label: '초코 꼬마발자국' },
];

const svgs = {
  solid_blue: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' fill='#E0F2FE'/><path d='M 0 32 Q 16 22, 32 32 T 64 32' fill='none' stroke='#93C5FD' stroke-width='2' opacity='0.7'/><path d='M 0 52 Q 16 42, 32 52 T 64 52' fill='none' stroke='#93C5FD' stroke-width='1.5' opacity='0.5'/><g transform='translate(12, 14)'><path d='M 5 15 C 2 12, 2 8, 8 9 C 14 10, 18 2, 24 6 C 28 9, 28 14, 22 15 Z' fill='#0284C7'/><path d='M 24 6 C 26 2, 30 2, 31 5 C 29 7, 26 7, 24 6 Z' fill='#0369A1'/><circle cx='8' cy='11' r='1.2' fill='#FFFFFF'/><path d='M 12 15 Q 14 18, 16 15' stroke='#FFFFFF' stroke-width='1' fill='none'/></g><circle cx='38' cy='12' r='2' fill='#FFFFFF' opacity='0.9'/><circle cx='44' cy='8' r='1.2' fill='#FFFFFF' opacity='0.9'/></svg>`,

  solid_yellow: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' fill='#FEF08A'/><path d='M 0 0 L 24 12 L 48 0 M 0 24 L 24 36 L 48 24 M 24 12 L 24 48' stroke='#FDE047' stroke-width='2' fill='none' opacity='0.9'/><g transform='translate(12, 10)'><ellipse cx='10' cy='10' rx='7' ry='5' fill='#EAB308'/><rect x='6' y='6' width='2' height='8' fill='#000'/><rect x='10' y='5' width='2' height='10' fill='#000'/><ellipse cx='8' cy='5' rx='3' ry='2' fill='#E2E8F0' transform='rotate(-30 8 5)'/><ellipse cx='12' cy='5' rx='3' ry='2' fill='#E2E8F0' transform='rotate(30 12 5)'/></g></svg>`,

  solid_green: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' fill='#DCFCE7'/><g transform='translate(8, 8)' fill='#22C55E'><path d='M12 12 C10 6, 4 6, 6 12 C4 18, 10 18, 12 12' /><path d='M12 12 C14 6, 20 6, 18 12 C20 18, 14 18, 12 12' /><path d='M12 12 C6 10, 6 4, 12 6 C18 4, 18 10, 12 12' /><path d='M12 12 C6 14, 6 20, 12 18 C18 20, 18 14, 12 12' /><path d='M12 12 Q10 24, 7 26' stroke='#15803D' stroke-width='1.5' fill='none'/></g><g transform='translate(40, 36) scale(0.7)' fill='#4ADE80'><path d='M12 12 C10 6, 4 6, 6 12 C4 18, 10 18, 12 12' /><path d='M12 12 C14 6, 20 6, 18 12 C20 18, 14 18, 12 12' /><path d='M12 12 C6 10, 6 4, 12 6 C18 4, 18 10, 12 12' /><path d='M12 12 C6 14, 6 20, 12 18 C18 20, 18 14, 12 12' /><path d='M12 12 Q10 24, 7 26' stroke='#166534' stroke-width='1.5' fill='none'/></g></svg>`,

  solid_pink: `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><rect width='56' height='56' fill='#FFE4E6'/><g transform='translate(16, 12)'><path d='M 12 4 Q 6 -2, 2 6 Q -1 12, 4 18 L 12 26 L 20 18 Q 25 12, 22 6 Q 18 -2, 12 4 Z' fill='#EF4444'/><circle cx='8' cy='12' r='0.8' fill='#FEF08A'/><circle cx='16' cy='12' r='0.8' fill='#FEF08A'/><circle cx='12' cy='16' r='0.8' fill='#FEF08A'/><circle cx='10' cy='8' r='0.8' fill='#FEF08A'/><circle cx='14' cy='8' r='0.8' fill='#FEF08A'/><path d='M 12 4 Q 14 -2, 13 -4' stroke='#15803D' stroke-width='1.8' fill='none'/></g></svg>`,

  stripes: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' fill='#FFEDD5'/><path d='M-16,16 L16,-16 M0,32 L32,0 M16,48 L48,16 M32,64 L64,32 M48,80 L80,48' stroke='#FD8D14' stroke-width='6' opacity='0.25' stroke-linecap='round'/><g transform='translate(22, 22)'><circle cx='10' cy='10' r='8' fill='#FB923C'/><path d='M 10 10 L 10 2' stroke='#FFF' stroke-width='1.2'/><path d='M 10 10 L 17 6' stroke='#FFF' stroke-width='1.2'/><path d='M 10 10 L 17 14' stroke='#FFF' stroke-width='1.2'/><path d='M 10 10 L 5 15' stroke='#FFF' stroke-width='1.2'/><path d='M 10 10 L 3 8' stroke='#FFF' stroke-width='1.2'/><circle cx='10' cy='10' r='2' fill='#FFF'/></g></svg>`,

  diagonal_mint: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='#F0FDF4'/><path d='M-15,15 L15,-15 M0,30 L30,0 M15,45 L45,15 M30,60 L60,30 M45,75 L75,45' stroke='#A7F3D0' stroke-width='3' opacity='0.7'/><g transform='translate(18, 16)'><rect x='8' y='14' width='8' height='10' rx='2' fill='#B45309'/><path d='M 12 4 C 8 4, 7 8, 7 14 L 17 14 C 17 8, 16 4, 12 4 Z' fill='#10B981'/><line x1='9' y1='6' x2='10' y2='12' stroke='#047857' stroke-width='1'/><line x1='15' y1='6' x2='14' y2='12' stroke='#047857' stroke-width='1'/><line x1='12' y1='5' x2='12' y2='13' stroke='#047857' stroke-width='1'/></g></svg>`,

  checkerboard: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' fill='#FFF7ED'/><rect x='0' y='0' width='24' height='24' fill='#FED7AA' opacity='0.4'/><rect x='24' y='24' width='24' height='24' fill='#FED7AA' opacity='0.4'/><g transform='translate(12, 12) scale(0.6)'><circle cx='20' cy='20' r='6' fill='#F97316'/><circle cx='10' cy='20' r='5' fill='#FFF' opacity='0.9'/><circle cx='30' cy='20' r='5' fill='#FFF' opacity='0.9'/><circle cx='20' cy='10' r='5' fill='#FFF' opacity='0.9'/><circle cx='20' cy='30' r='5' fill='#FFF' opacity='0.9'/><circle cx='20' cy='20' r='3.5' fill='#FBBF24'/></g></svg>`,

  gingham_rose: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' fill='#FFF1F2'/><rect x='0' y='0' width='64' height='32' fill='#FECDD3' opacity='0.4'/><rect x='0' y='0' width='32' height='64' fill='#FECDD3' opacity='0.4'/><g transform='translate(36, 12) scale(0.85)'><path d='M 12 18 Q 8 6, 18 4' stroke='#16A34A' stroke-width='2' fill='none'/><circle cx='8' cy='22' r='4.5' fill='#E11D48'/><circle cx='18' cy='20' r='4.5' fill='#E11D48'/><circle cx='6' cy='20' r='1.2' fill='#FFF' opacity='0.8'/><circle cx='16' cy='18' r='1.2' fill='#FFF' opacity='0.8'/></g></svg>`,

  tartan_indigo: `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' fill='#0B132B'/><path d='M-20,20 L20,-20 M0,40 L40,0 M20,60 L60,20 M40,80 L80,40 M60,100 L100,60' stroke='#1C2541' stroke-width='4'/><g transform='translate(20, 20) scale(0.9)'><path d='M8,8 Q3,12 8,16 Q18,6 18,12 L22,4 Z' fill='#E2E8F0'/><path d='M 24 12 L 28 20 L 16 18 Z' fill='#38BDF8'/><circle cx='22' cy='13' r='1' fill='#FFF'/></g><circle cx='60' cy='55' r='1.5' fill='#E2E8F0'/><circle cx='55' cy='62' r='0.8' fill='#38BDF8'/><path d='M 58 56 L 62 56' stroke='#E2E8F0' stroke-width='0.5'/><path d='M 60 54 L 60 58' stroke='#E2E8F0' stroke-width='0.5'/></svg>`,

  polka_dot: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' fill='#E0F2FE'/><path d='M0 32 C16 40, 16 24, 32 32 C48 40, 48 24, 64 32' fill='none' stroke='#A5F3FC' stroke-width='2' opacity='0.7'/><g transform='translate(16, 20) scale(0.9)'><path d='M 10 14 C 10 7, 16 7, 16 14 C 16 21, 6 21, 6 14' fill='#FBBF24'/><path d='M 12 14 Q 10 14, 9 13 C 8 11, 10 9, 13 10 Z' fill='#F59E0B'/><ellipse cx='10' cy='13' rx='4.5' ry='3.5' fill='#FBBF24'/><circle cx='10' cy='12' r='0.8' fill='#000'/><path d='M 12 13 L 15 11' stroke='#F97316' stroke-width='2'/></g></svg>`,

  retro_grid: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='#FFF5F5'/><path d='M 0,10 L 60,10 M 0,20 L 60,20 M 0,30 L 60,30 M 0,40 L 60,40 M 0,50 L 60,50 M 10,0 L 10,60 M 20,0 L 20,60 M 30,0 L 30,60 M 40,0 L 40,60 M 50,0 L 50,60' stroke='#FEE2E2' stroke-width='1'/><g transform='translate(20, 18) scale(0.85)'><path d='M 10 12 Q 10 24, 12 28' stroke='#22C55E' stroke-width='1.5' fill='none'/><path d='M 10 12 C 5 12, 4 4, 10 4 C 16 4, 15 12, 10 12 Z M 10 12 C 15 12, 16 20, 10 20 C 4 20, 5 12, 10 12 Z' fill='#F43F5E' transform='rotate(-20 10 12)'/></g></svg>`
};

export function getTapeStyle(type: TapeType): React.CSSProperties {
  switch (type) {
    case 'solid_blue':
      return {
        backgroundColor: '#E0F2FE',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.solid_blue)}")`,
        backgroundSize: '64px 64px',
      };
    case 'solid_yellow':
      return {
        backgroundColor: '#FEF08A',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.solid_yellow)}")`,
        backgroundSize: '48px 48px',
      };
    case 'solid_green':
      return {
        backgroundColor: '#DCFCE7',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.solid_green)}")`,
        backgroundSize: '64px 64px',
      };
    case 'solid_pink':
      return {
        backgroundColor: '#FFE4E6',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.solid_pink)}")`,
        backgroundSize: '56px 56px',
      };
    case 'rainbow_tape':
      return {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(90deg, #F87171, #FBBF24, #34D399, #60A5FA, #A78BFA)',
        backgroundSize: '100% 100%',
      };
    case 'stripes':
      return {
        backgroundColor: '#FFEDD5',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.stripes)}")`,
        backgroundSize: '64px 64px',
      };
    case 'diagonal_mint':
      return {
        backgroundColor: '#F0FDF4',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.diagonal_mint)}")`,
        backgroundSize: '60px 60px',
      };
    case 'checkerboard':
      return {
        backgroundColor: '#FFF7ED',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.checkerboard)}")`,
        backgroundSize: '48px 48px',
      };
    case 'gingham_rose':
      return {
        backgroundColor: '#FFF1F2',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.gingham_rose)}")`,
        backgroundSize: '64px 64px',
      };
    case 'tartan_indigo':
      return {
        backgroundColor: '#0B132B',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.tartan_indigo)}")`,
        backgroundSize: '80px 80px',
      };
    case 'polka_dot':
      return {
        backgroundColor: '#E0F2FE',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.polka_dot)}")`,
        backgroundSize: '64px 64px',
      };
    case 'retro_grid':
      return {
        backgroundColor: '#FFF5F5',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgs.retro_grid)}")`,
        backgroundSize: '60px 60px',
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
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDQ4IDM2Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iMzYiIGZpbGw9IiNFRUYyRkYiLz48ZyBmaWxsPSIjV0ZGRkZGIiBvcGFjaXR5PSIwLjk1Ij48cGF0aCBkPSJNMTIgMjRoMTZhNiA2IDAgMCAwIDYtNiA2IDYgMCAwIDAtNi02IDcgNyAwIDAgMC0xMyAwIDUgNSAwIDAgMC0zIDEyeiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTgiIHI9IjAuOCIgZmlsbD0iIzZCMjFBAi8+PGNpcmNsZSBjeD0iMjIiIGN5PSIxOCIgcj0iMC44IiBmaWxsPSIjNkIyMUE4Ii8+PHBhdGggZD0iTTE4IDE5LjUgcTEgMS4yIDIgMCIgc3Ryb2tlPSIjNkIyMUE4IiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvZz48cGF0aCBkPSJNMzggMTIgbDEgMi41IGwyLjUgMSBsLTIuNSAxIGwtMSAyLjUgbC0xLTIuNSBsLTIuNS0xIGwyLjUtMSB6IiBmaWxsPSIjRkRFMDQ3Ii8+PGcgZmlsbD0iI1dGRkZGRiIgb3BhY2l0eT0iMC42IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNCwgMjQpIHNjYWxlKDAuNikiPjxwYXRoIGQ9Ik0xMiAyNGgxNmE2IDYgMCAwIDAgYTYtNiA2IDYgMCAwIDAtNi02IDcgNyAwIDAgMC0xMyAwIDUgNSAwIDAgMC0zIDEyeiIvPjwvc3ZnPg==")`,
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
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxRTFCNEIiLz48cGF0aCBkPSJNMjggMTAgQTggOCAwIDAgMSAyMCAyMiBBOCA4IDAgMSAwIDI4IDEwIHoiIGZpbGw9IiNGQ0QzNEQiIG9wYWNpdHk9IjAuOSIvPjxnIHRyYW5zbG9ybT0idHJhbnNhbGUoMTIsIDE2KSI+PHBhdGggZD0iTTggMCBMMTAgNSBMMTUgNiBMMTEgMTAgTDEyIDE1IEw4IDEyIEw4IDE1IEw5IDEwIEwxIDYgTDYgNSIgZmlsbD0iI0ZERTA0NyIvPjwvZz48Y2lyY2xlIGN4PSI2IiBjeT0iOCIgcj0iMSIgZmlsbD0iI1dGRkZGRiContentIvPjxjaXJjbGUgY3g9IjM0IiBjeT0iMjgiIHI9IjEuMiIgZmlsbD0iI1dGRkZGRiIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMzQiIHI9IjAuOCIgZmlsbD0iI1dGRkZGRiIvPjwvc3ZnPg==")`,
        backgroundSize: '40px 40px',
      };

    case 'paw_prints':
      return {
        backgroundColor: '#FFFBEB',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij48cmVjdCB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9IiNGRkZCRUIiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LCA4KSIgZmlsbD0iIzc4MzUwRiI+PGVsbGlwc2UgY3g9IjEwIiBjeT0iMTQiIHJ4PSI0LjUiIHJ5PSIzLjUiLz48Y2lyY2xlIGN4PSI1IiBjeT0iOCIgcj0iMS44Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0i5LjUiIGY9IjEuOCIvPjxjaXJjbGUgY3g9IjEyLjUiIGN5PSI2IiByPSIxLjgiLz48Y2lyY2xlIGN4PSIxNS41IiBjeT0iOS41IiByPSIxLjgiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQsIDI0KSBzY2FsZSgwLjY1KSIgZmlsbD0iIzkyNDAwRSIgb3BhY2l0eT0iMC44NSI+PGVsbGlwc2UgY3g9IjEwIiBjeT0iMTQiIHJ4PSI0LjUiIHJ5PSIzLjUiLz48Y2lyY2xlIGN4PSI1IiBjeT0iOCIgcj0iMS44Ii8+PGNpcmNsZSBjeD0iOC41IiBjeT0iNS41IiByPSIxLjgiLz48Y2lyY2xlIGN4PSIxMiLjUiIGN5PSI2IiByPSIxLjgiLz48Y2lyY2xlIGN4PSIxNS41IiBjeT0iOS41IiByPSIxLjgiLz48/Zz48L3N2Zz4=")`,
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
