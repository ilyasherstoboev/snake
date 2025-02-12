import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../src/App.vue';
import ModalsMain from '../src/modals/ModalsMain.vue';
import TemplateSnake from '../src/templates/TemplateSnake.vue';
import SnakeMain from '../src/components/SnakeMain.vue';
import SnakeArrows from '../src/components/SnakeArrows.vue';
import { reactive, ref } from 'vue';
import { DEFAULT_POINT, DEFAULT_POSITION, KEYS } from '../app/constants/snake';

const options = ref<string[]>([]);

describe('App', () => {
  beforeEach(() => {
    vi.mock('../app/composables/snake/useSnake', () => ({
      default: () => ({
        options,
        positions: reactive([{ ...DEFAULT_POSITION }]),
        point: reactive({ ...DEFAULT_POINT }),
        currentMove: ref(''),
        showOptions: vi.fn(),
        handlers: {
          [KEYS.UP]: vi.fn(),
          [KEYS.LEFT]: vi.fn(),
          [KEYS.DOWN]: vi.fn(),
          [KEYS.RIGHT]: vi.fn(),
        },
      }),
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const mountOptions = {
    global: {
      provide: {
        activeModal: {
          activeModal: '',
        },
      },
    },
  };
  const initWrapper = (shallow = false, initOptions = mountOptions) =>
    mount(App, {
      shallow,
      ...initOptions,
    });

  it('рендер компонента', () => {
    let wrapper = initWrapper();

    expect(wrapper.findComponent(ModalsMain).exists()).toBe(true);
    expect(wrapper.findComponent(TemplateSnake).exists()).toBe(true);
    expect(wrapper.findComponent(SnakeMain).exists()).toBe(true);
    expect(wrapper.findComponent(SnakeArrows).exists()).toBe(false);

    options.value = ['Arrows'];

    wrapper = initWrapper();

    expect(wrapper.findComponent(SnakeArrows).exists()).toBe(true);
    options.value = [];
  });

  it.todo('Разобраться почему работает end', async () => {
    const wrapper = initWrapper();

    wrapper.findComponent(TemplateSnake).trigger('end');

    expect(wrapper.emitted()).toHaveProperty('end');
  });
});
