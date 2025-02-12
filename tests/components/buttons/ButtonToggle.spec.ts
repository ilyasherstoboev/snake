import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ButtonToggle from '../../../src/components/buttons/ButtonToggle.vue';
import { ref } from 'vue';

describe('ButtonToggle', () => {
  const wrapper = mount(ButtonToggle, {
    props: {
      id: '1',
      value: 'Arrows',
      modelValue: ref([]),
    },
  });

  it('рендер', () => {
    expect(wrapper.find('input').attributes('id')).toBe('1');
    expect(wrapper.find('input').attributes('value')).toBe('Arrows');
  });

  it('изменяет model при клике', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.trigger('change');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});
