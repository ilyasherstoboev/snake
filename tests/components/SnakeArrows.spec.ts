import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SnakeArrows from '../../src/components/SnakeArrows.vue';
import ButtonArrow from '../../src/components/buttons/ButtonArrow.vue';

describe('SnakeArrows', () => {
  it('рендер', () => {
    expect(mount(SnakeArrows).findAllComponents(ButtonArrow)).toHaveLength(4);
  });

  it('события', () => {
    const wrapper = mount(SnakeArrows);
    const buttons = wrapper.findAllComponents(ButtonArrow);

    buttons.forEach((item) => {
      item.trigger('click');
      expect(wrapper.emitted()).toHaveProperty(item.attributes('data-test') || '');
    });
  });
});
