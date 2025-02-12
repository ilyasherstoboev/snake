import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TemplateSnake from '../../src/templates/TemplateSnake.vue';

describe('TemplateSnake', () => {
  const initWrapper = (options: ComponentMountingOptions<typeof TemplateSnake> = {}) =>
    mount(TemplateSnake, options);

  it('Рендер компонента', () => {
    const wrapper = mount(TemplateSnake);

    expect(wrapper.text()).toContain('Options');
    expect(wrapper.text()).toContain('End game');
  });

  it('Рендер слотов', () => {
    const wrapper = initWrapper({
      slots: {
        content: '<div>slot content</div>',
        arrows: '<div>slot arrows</div>',
      },
    });

    expect(wrapper.text()).toContain('slot content');
    expect(wrapper.text()).toContain('slot arrows');
  });

  it('Проверка пропсов', () => {
    const wrapperOptionsFalse = initWrapper({
      shallow: true,
      props: {
        activeOptions: false,
      },
    });

    expect(wrapperOptionsFalse.find('[data-test="options"]').attributes('disabled')).toBe('true');
    expect(wrapperOptionsFalse.find('[data-test="end"]').attributes('disabled')).toBe('false');

    const wrapperOptionsTrue = initWrapper({
      shallow: true,
      props: {
        activeOptions: true,
      },
    });

    expect(wrapperOptionsTrue.find('[data-test="options"]').attributes('disabled')).toBe('false');
    expect(wrapperOptionsTrue.find('[data-test="end"]').attributes('disabled')).toBe('true');
  });

  it('Проверка событий', () => {
    const wrapperOptionsTrue = initWrapper({
      props: {
        activeOptions: false,
      },
    });

    wrapperOptionsTrue.find('[data-test="end"]').trigger('click');
    expect(wrapperOptionsTrue.emitted()).toHaveProperty('end');

    const wrapperOptionsFalse = initWrapper({
      props: {
        activeOptions: true,
      },
    });

    wrapperOptionsFalse.find('[data-test="options"]').trigger('click');
    expect(wrapperOptionsFalse.emitted()).toHaveProperty('options');
  });
});
