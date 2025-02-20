import { it, expect, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalsEnd from '../../src/modals/ModalsEnd.vue';
import TemplateModals from '../../src/templates/TemplateModals.vue';

const mockModal = {
  closeModal: vi.fn(),
  closeTab: vi.fn(),
};

vi.mock('../../app/composables/useModal', () => ({
  default: () => mockModal,
}));

describe('ModalsEnd', () => {
  const initWrapper = (shallow: boolean = false) => {
    return mount(ModalsEnd, {
      shallow,
      global: {
        stubs: {
          teleport: true,
        },
      },
    });
  };

  const initShallowWrapper = () => {
    return initWrapper(true);
  };

  it('Рендер модалки', () => {
    const wrapper = initWrapper();

    expect(wrapper.find('.modal__title').text()).toContain('Congratulation!');
    expect(wrapper.text()).toContain('do you want to continue?');
  });

  it('Проверка событий', async () => {
    const wrapper = initShallowWrapper();

    wrapper.findComponent(TemplateModals).trigger('close');
    expect(mockModal.closeModal).toHaveBeenCalledOnce();

    wrapper.findComponent(TemplateModals).trigger('yes');
    expect(mockModal.closeModal).toHaveBeenCalledTimes(2);

    wrapper.findComponent(TemplateModals).trigger('no');
    expect(mockModal.closeTab).toHaveBeenCalledOnce();
  });
});
