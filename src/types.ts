/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ToolType = 'select' | 'pen' | 'highlighter' | 'eraser' | 'text' | 'note' | 'tape' | 'shape' | 'ruler';

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  opacity: number;
  type: 'pen' | 'highlighter' | 'calligraphy' | 'dashed' | 'crayon' | 'rainbow';
}

export type StampType = string;

export type StickerType =
  | 'good'
  | 'fighting'
  | 'well_done'
  | 'love'
  | 'wow'
  | 'happy'
  | 'congrats'
  | 'cute_bear'
  | 'memo_yellow'
  | 'memo_pink'
  | 'good_job'
  | 'perfect'
  | 'heart_star'
  | 'clover_luck'
  | 'dino'
  | 'star_stamp'
  | 'check_box_done'
  | 'coffee'
  | 'bulb'
  | 'rainbow_sticker';

export type BackgroundType = 'plain' | 'grid' | 'lined' | 'english' | 'blackboard' | 'music' | 'dots' | 'kraft' | 'manuscript' | 'graph';

export type TapeType =
  | 'stripes'
  | 'polka_dot'
  | 'solid_blue'
  | 'solid_yellow'
  | 'checkerboard'
  | 'stripes_yellow'
  | 'hearts'
  | 'stars'
  | 'sky_cloud'
  | 'cherry'
  | 'rainbow_tape'
  | 'galaxy'
  | 'retro_grid'
  | 'solid_green'
  | 'solid_pink'
  | 'paw_prints';

export interface CanvasElement {
  id: string;
  type: 'stamp' | 'sticker' | 'text' | 'note' | 'tape' | 'shape' | 'ruler';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  color?: string;
  value?: string;
  subType?: string; // e.g. 'circle' for stamp, or 'good' for sticker
  bgColor?: string; // for memo pads etc.
}

export interface PresetColor {
  hex: string;
  name: string;
}

export type BottomTabType = 'pen' | 'color' | 'stamp' | 'sticker' | 'background' | 'tape' | 'paper';

export type StampSubTabType = 'basic' | 'weather' | 'emotion' | 'check' | 'sticker';
