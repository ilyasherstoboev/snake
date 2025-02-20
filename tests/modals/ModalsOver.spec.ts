import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ModalsOver from '../../src/modals/ModalsOver.vue';
import TemplateModals from '@/templates/TemplateModals.vue';

const spyClose = vi.spyOn(window, 'close');
const mockModal = {
  closeModal: vi.fn(),
  closeTab: spyClose,
};

vi.mock('../../app/composables/useModal', () => ({
  default: () => mockModal,
}));

describe('ModalsOver', () => {
  it('Рендер модалки over', () => {
    const wrapper = mount(ModalsOver, {
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    expect(wrapper.text()).toContain('game over');
    expect(wrapper.text()).toContain('do you want to continue?');
  });

  it('События модалки over', async () => {
    const wrapper = mount(ModalsOver, {
      shallow: true,
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    await wrapper.findComponent(TemplateModals).trigger('close');
    expect(mockModal.closeModal).toBeCalledTimes(1);

    await wrapper.findComponent(TemplateModals).trigger('yes');
    expect(mockModal.closeModal).toBeCalledTimes(2);

    await wrapper.findComponent(TemplateModals).trigger('no');
    expect(mockModal.closeTab).toHaveBeenCalledOnce();
    expect(spyClose).toHaveBeenCalledOnce();
  });
});
