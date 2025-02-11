import { it, expect, describe, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalsEat from '../../src/modals/ModalsEat.vue';
import TemplateModals from '../../src/templates/TemplateModals.vue';

const modalMocks = {
  closeModal: vi.fn(),
  closeTab: vi.fn(),
};

vi.mock('../../app/composables/useModal', () => ({
  default: () => modalMocks,
}));

const wrapper = mount(ModalsEat, {
  global: {
    stubs: {
      teleport: true,
    },
  },
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Modal eat', () => {
  it('Рендер модалки eat', () => {
    expect(wrapper.text()).toContain('game over');
    expect(wrapper.text()).toContain('do you want to continue?');
  });

  it('События кнопок', () => {
    wrapper.findComponent(TemplateModals).vm.$emit('close');
    expect(modalMocks.closeModal).toHaveBeenCalledTimes(1);

    wrapper.findComponent(TemplateModals).vm.$emit('yes');
    expect(modalMocks.closeModal).toHaveBeenCalledTimes(2);

    wrapper.findComponent(TemplateModals).vm.$emit('no');
    expect(modalMocks.closeTab).toHaveBeenCalledTimes(1);
  });
});
