import { TemplatesService } from '../services/templates.ts';
import type { ICoordinate, IDirection, IMove, ISnake, TArrowEvent } from '../interfaces/snake.ts'

const { generateKey } = TemplatesService;

export const DEFAULT_POSITION: ISnake = {
  id: generateKey(),
  x: 15,
  y: 15,
};

export const DEFAULT_POINT: ICoordinate = {
  x: 1,
  y: 1,
};

export const KEYS: Record<string, IMove> = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

export const ARROW_KEYS: Record<string, TArrowEvent> = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight'
};

export const KEY_DIRECTION: { [key: string]: IMove } = {
  [ARROW_KEYS.ARROW_UP]: KEYS.UP,
  [ARROW_KEYS.ARROW_DOWN]: KEYS.DOWN,
  [ARROW_KEYS.ARROW_LEFT]: KEYS.LEFT,
  [ARROW_KEYS.ARROW_RIGHT]: KEYS.RIGHT,
};

export const DIRECTION: IDirection = {
  UP: 'y',
  DOWN: 'y',
  LEFT: 'x',
  RIGHT: 'x',
};

export const OPPOSITE_DIRECTION_MAP = {
  UP: KEYS.DOWN,
  DOWN: KEYS.UP,
  LEFT: KEYS.RIGHT,
  RIGHT: KEYS.LEFT,
};
