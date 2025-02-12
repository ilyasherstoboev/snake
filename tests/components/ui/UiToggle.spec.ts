import { describe, expect, it } from 'vitest';
import UiToggle from '../../../src/components/ui/UiToggle.vue';
import { mount } from '@vue/test-utils';

describe('UiToggle', () => {
  const wrapper = mount(UiToggle, {
    props: {
      label: 'label',
      id: '1',
      value: 'Arrows',
    },
  });

  it('Рендер', () => {
    expect(wrapper.text()).toContain('label');
    expect(wrapper.find('input').attributes('value')).toBe('Arrows');
  });

  it('события', () => {
    wrapper.find('input').trigger('change');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});
