import useSharedState from './useSharedState';
import useGameplay from './useGameplay';
import { onMounted } from 'vue';

import { KEY_DIRECTION, OPPOSITE_DIRECTION_MAP, ARROW_KEYS, KEYS } from '../../constants/snake.ts';

import { type TArrowEvent } from '../../interfaces/snake.ts';

export default function () {
  const { activeModal, currentMove, newGame } = useSharedState();
  const { moveSnake, startGame, setRandomPoint } = useGameplay();

  const handleKeydown = async (event: KeyboardEvent | Record<string, TArrowEvent>) => {
    const newDirection = KEY_DIRECTION[event.key as keyof typeof KEY_DIRECTION];

    if (activeModal.value || !newDirection || newDirection == currentMove.value) {
      return;
    }

    if (currentMove.value !== OPPOSITE_DIRECTION_MAP[newDirection]) {
      currentMove.value = newDirection;
      clearInterval(newGame.value);
      moveSnake();
      await startGame();
    }
  };

  const handlers = {
    [KEYS.UP]: () => handleKeydown({ key: ARROW_KEYS.ARROW_UP }),
    [KEYS.LEFT]: () => handleKeydown({ key: ARROW_KEYS.ARROW_LEFT }),
    [KEYS.DOWN]: () => handleKeydown({ key: ARROW_KEYS.ARROW_DOWN }),
    [KEYS.RIGHT]: () => handleKeydown({ key: ARROW_KEYS.ARROW_RIGHT }),
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
