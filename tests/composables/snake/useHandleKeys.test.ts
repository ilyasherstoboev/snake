import { describe, expect, it, vi } from 'vitest';
import useHandleKeys from '../../../app/composables/snake/useHandleKeys';
import { ARROW_KEYS, KEYS } from '../../../app/constants/snake';
import useSharedState from '../../../app/composables/snake/useSharedState';

const moveSnake = vi.fn();
const startGame = vi.fn();

vi.mock('../../../app/composables/snake/useGameplay', () => ({
  default: () => ({
    moveSnake,
    startGame,
  }),
}));

describe('useHandleKeys', () => {
  const { handleKeydown } = useHandleKeys();
  const handlersKeys = {
    [KEYS.UP]: ARROW_KEYS.ARROW_UP,
    [KEYS.LEFT]: ARROW_KEYS.ARROW_LEFT,
    [KEYS.DOWN]: ARROW_KEYS.ARROW_DOWN,
    [KEYS.RIGHT]: ARROW_KEYS.ARROW_RIGHT,
  };

  it.each(Object.keys(handlersKeys))('handleKeydown %s', async (key) => {
    const { currentMove } = useSharedState();

    await handleKeydown({ key: handlersKeys[key] });
    expect(currentMove.value).toBe(key);
  });
});
