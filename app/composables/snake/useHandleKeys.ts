import useSharedState from './useSharedState';
import useGameplay from './useGameplay';
import { onMounted } from 'vue';

import { KEY_DIRECTION, OPPOSITE_DIRECTION_MAP, ARROW_KEYS, KEYS } from '../../constants/snake.ts';

import { type TArrowEvent } from '../../interfaces/snake.ts';

export default function () {
  const { activeModal, currentMove, newGame } = useSharedState();
  const { moveSnake, startGame, setRandomPoint } = useGameplay();

  /**
   * привязка к клавишам
   * @param event
   */
  const handleKeydown = async (event: KeyboardEvent | Record<string, TArrowEvent>) => {
    if (activeModal.value) {
      return;
    }
    const newDirection = KEY_DIRECTION[event.key as keyof typeof KEY_DIRECTION];

    if (newDirection && newDirection !== currentMove.value) {
      if (currentMove.value !== OPPOSITE_DIRECTION_MAP[newDirection]) {
        currentMove.value = newDirection;
        clearInterval(newGame.value);
        moveSnake();
        await startGame();
      }
    }
  };

  /**
   * Изменение направления движения
   */
  const handlers = {
    [KEYS.UP]: () => handleKeydown({ key: ARROW_KEYS.ARROW_UP }),
    [KEYS.LEFT]: () => handleKeydown({ key: ARROW_KEYS.ArrowLeft }),
    [KEYS.DOWN]: () => handleKeydown({ key: ARROW_KEYS.ARROW_DOWN }),
    [KEYS.RIGHT]: () => handleKeydown({ key: ARROW_KEYS.ArrowRight }),
  };

  onMounted(() => {
    setRandomPoint();
    window.addEventListener('keydown', handleKeydown);
  });

  return {
    handleKeydown,
    handlers,
  };
}
