import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TemplateModals from '../../src/templates/TemplateModals.vue';

describe('TemplateModals', () => {
  const wrapperOptions: ComponentMountingOptions<typeof TemplateModals> = {
    global: {
      stubs: {
        teleport: true,
      },
    },
  };
  const initWrapper = (options = wrapperOptions) => mount(TemplateModals, options);

  it('рендер компонента', () => {
    const wrapper = initWrapper();

    expect(wrapper.find('.modal__button_close').exists()).toBe(true);
    expect(wrapper.find('.modal__button_continue').exists()).toBe(true);
    expect(wrapper.find('.modal__close').exists()).toBe(true);
    expect(wrapper.find('.modal__cross').attributes('src')).toBe(
      'https://static.thenounproject.com/png/644039-200.png',
    );
  });

  it('рендер слотов', () => {
    const wrapper = initWrapper({
      ...wrapperOptions,
      slots: {
        header: '<div>header slot</div>',
        default: '<div>default slot</div>',
        navigation: '<div>navigation slot</div>',
      },
    });

    expect(wrapper.text()).toContain('header slot');
    expect(wrapper.text()).toContain('default slot');
    expect(wrapper.text()).toContain('navigation slot');
  });

  it('события', () => {
    const wrapper = initWrapper();

    wrapper.find('.modal__close').trigger('click');
    wrapper.find('.modal__button_close').trigger('click');
    wrapper.find('.modal__button_continue').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted()).toHaveProperty('no');
    expect(wrapper.emitted()).toHaveProperty('yes');
  });
});
