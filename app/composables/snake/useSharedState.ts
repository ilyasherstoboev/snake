import { reactive, ref } from 'vue';
import LocalStorage from '../../services/localStorage';
import LOCAL_STORAGE from '../../constants/localStorage';
import { DEFAULT_POINT, DEFAULT_POSITION } from '../../constants/snake.ts';

import type { IMove, IPoint, IPosition } from '../../interfaces/snake.ts';

import type { Ref, Reactive } from 'vue';

const options: Ref<string[]> = ref(LocalStorage.get(LOCAL_STORAGE.options) || []);
const activeModal: Ref<string> = ref('');
const currentMove: Ref<IMove | ''> = ref('');
const point: Reactive<IPoint> = reactive({ ...DEFAULT_POINT });
const positions: Reactive<IPosition[]> = reactive([{ ...DEFAULT_POSITION }]);
const newGame: Ref<number> = ref(0);

export default function() {
  return {
    newGame,
    point,
    positions,
    currentMove,
    activeModal,
    options
  };
}
