import type { Reactive } from 'vue';
import config from '../constants/config';
import type { ICoordinate, IEatPoint, IPoint, IPosition } from '../interfaces/snake';
import { TemplatesService } from '../services/templates';
import { KEYS } from '../constants/snake';

const { generateKey } = TemplatesService;

/**
 * Перекидывание на другую сторону границы
 * @param newHeadPosition
 */
export const moveBorder = ({ x, y }: ICoordinate) => {
  const { x: limitX, y: limitY } = config.limit;

  return {
    x: x < 1 ? limitX : x > limitX ? 1 : x,
    y: y < 1 ? limitY : y > limitY ? 1 : y,
  };
};

export const checkIsEatMyself = (positions: Reactive<IPosition[]>, { x, y }: ICoordinate) => {
  return positions.some(
    (item) => x === item.x && y === item.y && item !== positions[positions.length - 1],
  );
};


export const delay = (ms = 1) => new Promise((res) => setTimeout(res, ms));

/**
 * Движение по координатам
 * @param newHeadPosition
 */
export const eatPoint = ({ positions, newHeadPosition, point }: IEatPoint) => {
  if (isPointEaten(newHeadPosition, point)) {
    growSnake(positions, point);
  } else {
    nextStep(positions, newHeadPosition);
  }
};

const isPointEaten = (newHeadPosition: ICoordinate, point: Reactive<IPoint>) => {
  return point.x === newHeadPosition.x && point.y === newHeadPosition.y;
};

const growSnake = (positions: Reactive<IPosition[]>, point: Reactive<IPoint>) => {
  positions.unshift({
    id: generateKey(),
    x: point.x,
    y: point.y,
  });
};

const nextStep = (positions: Reactive<IPosition[]>, newHeadPosition: ICoordinate) => {
  positions.unshift({
    ...newHeadPosition,
    id: generateKey(),
  });
  positions.pop();
};

export const initSnakeDirect = (positions: IPoint[]) => {
  return {
    [KEYS.UP]: () => positions[0].y - 1,
    [KEYS.LEFT]: () => positions[0].x - 1,
    [KEYS.DOWN]: () => positions[0].y + 1,
    [KEYS.RIGHT]: () => positions[0].x + 1,
  };
};

export const initTurns = (coordinate: IPoint) => {
  return {
    [KEYS.UP]: {
      condition: () => coordinate.y > 2,
      action: () => (coordinate.y -= 1),
    },
    [KEYS.LEFT]: {
      condition: () => coordinate.x > 1,
      action: () => (coordinate.x -= 1),
    },
    [KEYS.DOWN]: {
      condition: () => coordinate.y < config.limit.y,
      action: () => (coordinate.y += 1),
    },
  };
};
