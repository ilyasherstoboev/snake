import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ButtonArrow from '../../../src/components/buttons/ButtonArrow.vue';
import { IMAGES } from '../../../app/constants/template';

describe('ButtonArrow', () => {
  const wrapper = mount(ButtonArrow);

  it('рендер', () => {
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toContain(IMAGES.ARROW);
  });

  it('события', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
