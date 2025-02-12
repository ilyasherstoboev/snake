import { mount } from '@vue/test-utils';
import { expect, it, describe } from 'vitest';
import TemplateSnake from '../../src/templates/TemplateSnake.vue';
import SnakeNavigator from '../../src/components/SnakeNavigator.vue';

describe('SnakeNavigator', () => {
  it('ренедер слотов', () => {
    const wrapper = mount(TemplateSnake, {
      props: {
        activeOptions: false,
      },
      slots: {
        content: '<p>контент</p>',
        arrows: '<p>стрелки</p>',
      },
    });

    expect(wrapper.text()).toContain('контент');
    expect(wrapper.text()).toContain('стрелки');
  });

  it('Проверка options кнопки', async () => {
    const wrapper = mount(TemplateSnake, {
      props: {
        activeOptions: true,
      },
    });
    const options = wrapper.findAllComponents(SnakeNavigator)[0];
    await options.trigger('click');

    expect(options.text()).toContain('Options');
    expect(wrapper.emitted()).toHaveProperty('options');
    expect(options.attributes()).not.toHaveProperty('disabled');
  });

  it('Проверка end кнопки', async () => {
    const wrapper = mount(TemplateSnake, {
      props: {
        activeOptions: false,
      },
    });
    const end = wrapper.findAllComponents(SnakeNavigator)[1];
    await end.trigger('click');

    expect(end.text()).toContain('End game');
    expect(wrapper.emitted()).toHaveProperty('end');
    expect(end.attributes()).not.toHaveProperty('disabled');
  });
});
