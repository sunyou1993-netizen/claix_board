import React, { useRef, useEffect, useState } from 'react';

// Color Converter Utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace(/^#/, '');
  let bigint = parseInt(cleanHex, 16);
  if (cleanHex.length === 3) {
    const r = (bigint >> 8) & 0xf;
    const g = (bigint >> 4) & 0xf;
    const b = bigint & 0xf;
    return {
      r: (r << 4) | r,
      g: (g << 4) | g,
      b: (b << 4) | b,
    };
  }
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = max === 0 ? 0 : (max - min) / max;
  const v = max;

  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, v };
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h / 60) % 6;
  const f = h / 60 - Math.floor(h / 60);
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

interface ColorWheelProps {
  penColor: string;
  setPenColor: (color: string) => void;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({ penColor, setPenColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wheelContainerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Parse current hex color to RGB and HSV
  const rgb = hexToRgb(penColor);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

  const [isDraggingWheel, setIsDraggingWheel] = useState(false);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const WHEEL_RADIUS = 135; // 50% larger
  const CANVAS_SIZE = 270; // 50% larger

  // Render the base HSV wheel onto Canvas once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = CANVAS_SIZE;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = WHEEL_RADIUS;

    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const index = (y * size + x) * 4;
        const smoothing = 1.5;

        if (dist <= radius - smoothing) {
          let angle = Math.atan2(dy, dx);
          if (angle < 0) angle += 2 * Math.PI;

          const hue = (angle / (2 * Math.PI)) * 360;
          const saturation = dist / radius;

          // Compute full brightness RGB for the wheel gradient background
          const { r, g, b } = hsvToRgb(hue, saturation, 1.0);

          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = 255;
        } else if (dist <= radius) {
          let angle = Math.atan2(dy, dx);
          if (angle < 0) angle += 2 * Math.PI;

          const hue = (angle / (2 * Math.PI)) * 360;
          const saturation = dist / radius;

          const { r, g, b } = hsvToRgb(hue, saturation, 1.0);

          // Highly precise anti-aliasing near the edge disc
          const alpha = Math.max(0, Math.min(255, Math.round(((radius - dist) / smoothing) * 255)));

          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = alpha;
        } else {
          // Transparent outside wheel disc
          data[index] = 0;
          data[index + 1] = 0;
          data[index + 2] = 0;
          data[index + 3] = 0;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, []);

  // Compute absolute layout positions for the crosshair handle
  const angleRad = (hsv.h * Math.PI) / 180;
  const dist = hsv.s * WHEEL_RADIUS;
  const cx = CANVAS_SIZE / 2;
  const cy = CANVAS_SIZE / 2;
  const handleX = cx + Math.cos(angleRad) * dist;
  const handleY = cy + Math.sin(angleRad) * dist;

  // Wheel interaction logic: Convert X,Y offset to Hue & Saturation
  const handleWheelInteraction = (clientX: number, clientY: number) => {
    const container = wheelContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dx = x - cx;
    const dy = y - cy;
    const offsetDist = Math.sqrt(dx * dx + dy * dy);

    // Calculate Hue (0 to 360)
    let angleRef = Math.atan2(dy, dx);
    if (angleRef < 0) angleRef += 2 * Math.PI;
    const hue = (angleRef / (2 * Math.PI)) * 360;

    // Calculate Saturation (0 to 1)
    const saturation = Math.min(1.0, offsetDist / WHEEL_RADIUS);

    // Convert new HSV back to RGB & Hex, keeping the existing Value (brightness)
    const { r, g, b } = hsvToRgb(hue, saturation, hsv.v);
    setPenColor(rgbToHex(r, g, b));
  };

  // Slider interaction logic: Convert vertical coordinate to Value (brightness, 0.0 to 1.0)
  const handleSliderInteraction = (clientY: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const relativeY = clientY - rect.top;

    // 0.0 at bottom (black), 1.0 at top (full color)
    const rawVal = 1.0 - (relativeY / rect.height);
    const value = Math.max(0.0, Math.min(1.0, rawVal));

    const { r, g, b } = hsvToRgb(hsv.h, hsv.s, value);
    setPenColor(rgbToHex(r, g, b));
  };

  // Mouse & Touch events handlers for smooth scrubbing
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingWheel) {
        handleWheelInteraction(e.clientX, e.clientY);
      }
      if (isDraggingSlider) {
        handleSliderInteraction(e.clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDraggingWheel(false);
      setIsDraggingSlider(false);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (isDraggingWheel) {
        handleWheelInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
      if (isDraggingSlider) {
        handleSliderInteraction(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDraggingWheel, isDraggingSlider, hsv]);

  // CSS linear gradient for the slider track from full base color (V=1) to Black (V=0)
  const baseColorAtMaxBrightness = rgbToHex(
    hsvToRgb(hsv.h, hsv.s, 1.0).r,
    hsvToRgb(hsv.h, hsv.s, 1.0).g,
    hsvToRgb(hsv.h, hsv.s, 1.0).b
  );

  return (
    <div className="flex flex-col gap-3 h-full select-none" id="korean-color-wheel-widget">
      {/* Upper Area: Picker Disc + Slider Bar */}
      <div className="flex items-center gap-6 justify-center">
        {/* Continuous Hue-Saturation Wheel Container */}
        <div
          ref={wheelContainerRef}
          className="relative cursor-pointer active:scale-[1.01] transition-transform"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
          onMouseDown={(e) => {
            setIsDraggingWheel(true);
            handleWheelInteraction(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            setIsDraggingWheel(true);
            if (e.touches.length > 0) {
              handleWheelInteraction(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
        >
          <canvas ref={canvasRef} className="block w-full h-full rounded-full" />
          {/* Target Crosshair Handle */}
          <div
            className="absolute rounded-full pointer-events-none flex items-center justify-center shadow-md border-2 border-slate-700 bg-white/20 hover:scale-110 active:scale-90 transition-all font-sans leading-none"
            style={{
              left: `${handleX}px`,
              top: `${handleY}px`,
              transform: 'translate(-50%, -50%)',
              width: '24px',
              height: '24px',
            }}
          >
            {/* Elegant Inner Plus Grid Target */}
            <div className="w-2 h-2 rounded-full bg-slate-900" />
          </div>
        </div>

        {/* Vertical Brightness/Value Slider with exact UI details */}
        <div
          ref={sliderRef}
          className="relative w-10 h-[270px] rounded-full cursor-pointer shadow-inner border border-slate-200/60"
          style={{
            background: `linear-gradient(to bottom, ${baseColorAtMaxBrightness} 0%, #000000 100%)`,
          }}
          onMouseDown={(e) => {
            setIsDraggingSlider(true);
            handleSliderInteraction(e.clientY);
          }}
          onTouchStart={(e) => {
            setIsDraggingSlider(true);
            if (e.touches.length > 0) {
              handleSliderInteraction(e.touches[0].clientY);
            }
          }}
        >
          {/* Circular slider knob pointer */}
          <div
            className="absolute rounded-full border-2 border-white shadow-lg bg-slate-900 pointer-events-none"
            style={{
              left: '50%',
              top: `${(1.0 - hsv.v) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
            }}
          />
        </div>
      </div>

      {/* Row with Circular Preview and R,G,B inputs as requested */}
      <div className="flex items-center gap-6 justify-center mt-3">
        {/* Dynamic Color preview sphere */}
        <div
          className="w-16 h-16 rounded-full shadow-md border-2 border-white ring-2 ring-slate-200/80 shrink-0 transition-all duration-150"
          style={{ backgroundColor: penColor }}
        />

        {/* R, G, B Info Blocks */}
        <div className="flex gap-3">
          {/* RED BLOCK */}
          <div className="flex flex-col items-center">
            <div className="w-[105px] h-[54px] bg-slate-100/90 rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm leading-none font-sans">
              <span className="text-[24px] font-black text-slate-800 tracking-tight leading-none">
                {rgb.r}
              </span>
            </div>
            <span className="text-[16px] font-black text-slate-400 mt-1 leading-none">R</span>
          </div>

          {/* GREEN BLOCK */}
          <div className="flex flex-col items-center">
            <div className="w-[105px] h-[54px] bg-slate-100/90 rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm leading-none font-sans">
              <span className="text-[24px] font-black text-slate-[#006CFF] tracking-tight leading-none">
                {rgb.g}
              </span>
            </div>
            <span className="text-[16px] font-black text-slate-400 mt-1 leading-none">G</span>
          </div>

          {/* BLUE BLOCK */}
          <div className="flex flex-col items-center">
            <div className="w-[105px] h-[54px] bg-slate-100/90 rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm leading-none font-sans">
              <span className="text-[24px] font-black text-slate-[#006CFF] tracking-tight leading-none">
                {rgb.b}
              </span>
            </div>
            <span className="text-[16px] font-black text-slate-400 mt-1 leading-none">B</span>
          </div>
        </div>
      </div>
    </div>
  );
};
