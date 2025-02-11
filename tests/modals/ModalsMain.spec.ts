import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ModalsMain from '../../src/modals/ModalsMain.vue';
import { PROVIDE_KEYS } from '../../app/constants/template';
import { MODAL_NAME } from '../../app/interfaces/template';
import ModalsOver from '../../src/modals/ModalsOver.vue';

describe('ModalsMain', () => {
  it.each(Object.keys(MODAL_NAME))(`рендер модалки %s`, (modal) => {
    const wrapperModal = mount(ModalsMain, {
      shallow: true,
      global: {
        stubs: {
          teleport: true,
        },
        provide: {
          [PROVIDE_KEYS.ACTIVE_MODAL]: {
            activeModal: modal,
          },
        },
      },
    });

    expect(wrapperModal.findComponent(ModalsOver).exists()).toBe(true);
  });

  it('Проверка модалки если v-if = false', () => {
    const wrapper = mount(ModalsMain, {
      shallow: true,
      global: {
        stubs: {
          teleport: true,
        },
        provide: {
          [PROVIDE_KEYS.ACTIVE_MODAL]: {
            activeModal: '',
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<!--v-if-->');
  });

  it('События модалки', async () => {
    const changeActiveModal = vi.fn();
    const wrapper = mount(ModalsMain, {
      shallow: true,
      global: {
        stubs: {
          teleport: true,
        },
        provide: {
          [PROVIDE_KEYS.ACTIVE_MODAL]: {
            activeModal: MODAL_NAME.OVER,
            changeActiveModal,
          },
        },
      },
    });

    await wrapper.findComponent(ModalsOver).trigger('close');

    await flushPromises();

    expect(wrapper.emitted()).toHaveProperty('close');
    expect(changeActiveModal).toBeCalledWith('');
  });
});
