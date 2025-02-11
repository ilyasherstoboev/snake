import { mount } from '@vue/test-utils';
import { it, expect, describe, vi } from 'vitest';
import ModalsOptions from '../../src/modals/ModalsOptions.vue';
import TemplateModals from '../../src/templates/TemplateModals.vue';
import { OPTIONS } from '../../app/constants/config';
import { ref } from 'vue';
import LocalStorage from '../../app/services/localStorage.ts';
import LOCAL_STORAGE from '../../app/constants/localStorage.ts';
import UiToggle from '@/components/ui/UiToggle.vue';

const closeModal = vi.fn();

vi.mock('../../app/composables/useModal', () => {
  return {
    default: () => ({
      closeModal,
    }),
  };
});

describe('ModalOptions', () => {
  const refValue = ['eat'];
  const initWrapper = (shallow = false) =>
    mount(ModalsOptions, {
      shallow,
      global: {
        provide: {
          options: {
            options: ref(refValue),
          },
        },
        stubs: {
          teleport: true,
        },
      },
    });

  const initShallowWrapper = () => initWrapper(true);

  it('Рендер модалки', () => {
    expect(initShallowWrapper().findComponent(TemplateModals).exists()).toBe(true);
  });

  it('События модалки', async () => {
    const wrapper = initWrapper();
    const spyLS = vi.spyOn(LocalStorage, 'set');

    await wrapper.find('[data-test="close"]').trigger('click');
    expect(closeModal).toBeCalledTimes(1);

    await wrapper.find('[data-test="save"]').trigger('click');
    expect(closeModal).toBeCalledTimes(2);

    expect(spyLS).toBeCalledTimes(1);
    expect(spyLS).toBeCalledWith(LOCAL_STORAGE.options, refValue);
  });

  it.each(OPTIONS)('Рендер UiToggle значения $label', ({ label }) => {
    expect(initWrapper().text()).toContain(label);
  });
});
