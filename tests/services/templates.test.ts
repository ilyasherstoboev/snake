import { describe, expect, vi, it } from 'vitest';
import { TemplatesService } from '../../app/services/templates';

describe('Templates', () => {
  it('generateKey', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1);
    expect(TemplatesService.generateKey()).toBe('3llllll');
  });

  it('randomLimit', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.01);

    expect(TemplatesService.randomLimit('x')).toBe(1);

    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1);

    expect(TemplatesService.randomLimit('x')).toBe(4);

    vi.spyOn(Math, 'random').mockReturnValueOnce(1);

    expect(TemplatesService.randomLimit('x')).toBe(31);
  });

  it('getStyleSnake', () => {
    const point = {
      x: 15,
      y: 17,
    };

    expect(TemplatesService.getStyleSnake(point)).toEqual({
      gridColumnStart: point.x,
      gridRowStart: point.y,
    });
  });
});
