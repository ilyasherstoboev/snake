import { TemplatesService } from '../services/templates.ts';
import type { ICoordinate, IDirection, IMove, ISnake } from '../interfaces/snake.ts';

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

export const KEY_DIRECTION: { [key: string]: IMove } = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
};

export const DIRECTION: IDirection = {
  UP: 'y',
  DOWN: 'y',
  LEFT: 'x',
  RIGHT: 'x',
};
