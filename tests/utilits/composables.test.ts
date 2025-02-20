import { describe, it, expect } from 'vitest';
import { moveBorder } from '../../app/utilits/composables';
import config from '../../app/constants/config';

describe('composables', () => {
  it('moveBorder', () => {
    const { x: limitX, y: limitY } = config.limit;

    const point = { x: 15, y: 15 };
    const pointLimitX = { x: limitX + 1, y: 15 };
    const pointLimitY = { x: 15, y: limitY + 1 };

    expect(moveBorder(point)).toEqual(point);
    expect(moveBorder(pointLimitX)).toEqual({ x: 1, y: 15 });
    expect(moveBorder(pointLimitY)).toEqual({ x: 15, y: 1 });
  });
});
