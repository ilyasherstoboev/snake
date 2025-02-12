import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SnakeMain from '../../src/components/SnakeMain.vue';

describe('SnakeMain', () => {
  const pointCoord = {
    x: 17,
    y: 17,
  };

  it('рендер', () => {
    const positions = [
      {
        id: '1',
        x: 15,
        y: 15,
      },
    ];
    const wrapper = mount(SnakeMain, {
      props: {
        positions,
        point: pointCoord,
      },
    });

    const point = wrapper.find('.snake-main__point');
    const snake = wrapper.find('.snake-main__snake');

    expect(point.attributes('style')).toBe('grid-column-start: 17; grid-row-start: 17;');
    expect(snake.attributes('style')).toBe('grid-column-start: 15; grid-row-start: 15;');
  });

  it('проверка длинны змеи', () => {
    const positionsArr = [
      {
        id: '0',
        x: 15,
        y: 15,
      },
    ];

    Array.from({ length: 5 }).forEach(() => {
      positionsArr.push({
        id: `${positionsArr.length}`,
        x: positionsArr[positionsArr.length - 1].x - 1,
        y: 15,
      });
    });

    const wrapper = mount(SnakeMain, {
      props: {
        point: pointCoord,
        positions: positionsArr,
      },
    });

    expect(wrapper.findAll('.snake-main__snake').length).toBe(positionsArr.length);
  });
});
