import useSharedState from './useSharedState';
import useGameplay from './useGameplay';
import { onMounted } from 'vue';
import { KEY_DIRECTION } from '../../constants/snake.ts';

export default function () {
  const { activeModal, currentMove, newGame } = useSharedState();
  const { moveSnake, startGame, setRandomPoint } = useGameplay();

  /**
   * привязка к клавишам
   * @param event
   */
  const handleKeydown = async (event: KeyboardEvent | { key: TArrowEvent}) => {
    if (activeModal.value) {
      return;
    }
    const newDirection = KEY_DIRECTION[event.key as keyof typeof KEY_DIRECTION];

    if (newDirection && newDirection !== currentMove.value) {
      const oppositeDirectionMap = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (currentMove.value !== oppositeDirectionMap[newDirection]) {
        currentMove.value = newDirection;
        clearInterval(newGame.value);
        moveSnake();
        await startGame();
      }
    }
  };

  type TArrowEvent = 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight'

  /**
   * Изменение направления движения
   */
  const handlers = {
    UP: () => handleKeydown({ key: 'ArrowUp' }),
    LEFT: () => handleKeydown({ key: 'ArrowLeft' }),
    DOWN: () => handleKeydown({ key: 'ArrowDown' }),
    RIGHT: () => handleKeydown({ key: 'ArrowRight' }),
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
