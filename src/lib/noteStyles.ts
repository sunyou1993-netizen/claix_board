import React from 'react';

export interface NoteStyle {
  background: string;
  borderColor: string;
  textColor: string;
  badgeLineColor: string;
  fontFamily?: string;
  boxShadow?: string;
}

export function getNoteStyle(idOrColor: string): NoteStyle {
  switch (idOrColor) {
    // Normal Solid Color Memos
    case 'memo_card_yellow':
    case '#FEF08A':
      return {
        background: '#FEF08A',
        borderColor: '#FEF08A',
        textColor: '#451a03',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
    case 'memo_card_pink':
    case '#FBCFE8':
      return {
        background: '#FBCFE8',
        borderColor: '#FBCFE8',
        textColor: '#50072b',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
    case 'memo_card_blue':
    case '#BFDBFE':
      return {
        background: '#BFDBFE',
        borderColor: '#BFDBFE',
        textColor: '#172554',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
    case 'memo_card_green':
    case '#BBF7D0':
      return {
        background: '#BBF7D0',
        borderColor: '#BBF7D0',
        textColor: '#022c22',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
    case 'memo_lavender':
    case '#E9D5FF':
      return {
        background: '#E9D5FF',
        borderColor: '#E9D5FF',
        textColor: '#3b0764',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
    case 'memo_peach':
    case '#FFEDD5':
      return {
        background: '#FFEDD5',
        borderColor: '#FFEDD5',
        textColor: '#431407',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
    case 'memo_slate':
    case '#475569':
      return {
        background: '#475569',
        borderColor: '#334155',
        textColor: '#f8fafc',
        badgeLineColor: 'rgba(255,255,255,0.12)',
      };

    // Beautiful New Patterned Notes
    case 'memo_rainbow':
      return {
        background: 'linear-gradient(135deg, #fef08a 0%, #fbcfe8 50%, #c084fc 100%)',
        borderColor: '#e879f9',
        textColor: '#2e1065',
        badgeLineColor: 'rgba(255,255,255,0.4)',
      };

    case 'memo_gingham':
      return {
        background: '#fce7f3 linear-gradient(90deg, rgba(244,63,94,0.15) 50%, transparent 50%), linear-gradient(rgba(244,63,94,0.15) 50%, transparent 50%)',
        borderColor: '#fda4af',
        textColor: '#4c0519',
        badgeLineColor: 'rgba(244,63,94,0.2)',
        boxShadow: '0 8px 24px -10px rgba(244,63,94,0.3)',
      };

    case 'memo_daisy':
      return {
        background: '#FEF9C3 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIzIiBmaWxsPSIjRjU5RTBCIi8+PGVsbGlwc2UgY3g9IjE1IiBjeT0iOSIgcng9IjEuNSIgcnk9IjMiIGZpbGw9IiNGRkZGRkYiLz48ZWxsaXBzZSBjeD0iMTUiIGN5PSIyMSIgcng9IjEuNSIgcnk9IjMiIGZpbGw9IiNGRkZGRkYiLz48ZWxsaXBzZSBjeD0iOSIgY3k9IjE1IiByeD0iMyIgcnk9IjEuNSIgZmlsbD0iI0ZGRkZGRiIvPjxlbGxpcHNlIGN4PSIyMSIgY3k9IjE1IiByeD0iMyIgcnk9IjEuNSIgZmlsbD0iI1dGRkZGRiIvPjwvc3ZnPg==")',
        borderColor: '#fef08a',
        textColor: '#78350f',
        badgeLineColor: 'rgba(245,158,11,0.2)',
        boxShadow: '0 8px 24px -10px rgba(245,158,11,0.2)',
      };

    case 'memo_stars':
      return {
        background: '#1e1b4b url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iMC44IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSIyMiIgcj0iMC44IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTE1IDUgTDExIDggTDEyIDEyIEw4IDEwIEw0IDEyIEw1IDggTDEgNSBMNSA0IEw0IDAgTDggMiBMMTIgMCBMMTEgNCBaIiBmaWxsPSIjRkRFMDQ3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNSwgNSkgc2NhbGUoMC40KSIvPjwvc3ZnPg==")',
        borderColor: '#312e81',
        textColor: '#fef08a',
        badgeLineColor: 'rgba(255,255,255,0.15)',
        fontFamily: 'monospace',
      };

    case 'memo_kraft':
      return {
        background: '#ebd5b3 linear-gradient(rgba(120,53,15,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,53,15,0.08) 1px, transparent 1px)',
        borderColor: '#d9b48f',
        textColor: '#451a03',
        badgeLineColor: 'rgba(120,53,15,0.15)',
        fontFamily: 'monospace',
      };

    case 'memo_grid_blue':
      return {
        background: '#f0f9ff linear-gradient(rgba(14,165,233,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.1) 1px, transparent 1px)',
        borderColor: '#bae6fd',
        textColor: '#0369a1',
        badgeLineColor: 'rgba(14,165,233,0.15)',
        fontFamily: 'monospace',
      };

    case 'memo_polka':
      return {
        background: '#fee2e2 radial-gradient(#ef4444 15%, transparent 15%)',
        borderColor: '#fca5a5',
        textColor: '#7f1d1d',
        badgeLineColor: 'rgba(239,68,68,0.2)',
        fontFamily: 'sans-serif',
      };

    default:
      // Fallback to basic color stylings if it's a dynamic hex color code
      if (idOrColor.startsWith('#')) {
        return {
          background: idOrColor,
          borderColor: idOrColor,
          textColor: '#1e293b',
          badgeLineColor: 'rgba(0,0,0,0.06)',
        };
      }
      return {
        background: '#FEF08A',
        borderColor: '#FDE047',
        textColor: '#451a03',
        badgeLineColor: 'rgba(0,0,0,0.06)',
      };
  }
}
