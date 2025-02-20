import config from '../constants/config.ts';
import type { IPoint } from '../interfaces/snake.ts';

export const TemplatesService = {
  generateKey(): string {
    return Math.random().toString(36).substring(2, 9);
  },
  randomLimit(coordinates: 'x' | 'y') {
    return Math.floor(Math.random() * config.limit[coordinates]) + 1;
  },
  getStyleSnake(item: IPoint) {
    return {
      gridColumnStart: item.x,
      gridRowStart: item.y,
    };
  },
};
