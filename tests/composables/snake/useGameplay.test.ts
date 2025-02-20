import { describe, it, expect, vi, afterEach } from 'vitest';
import useGameplay from '../../../app/composables/snake/useGameplay';
import useSharedState from '../../../app/composables/snake/useSharedState';
import useOptions from '../../../app/composables/snake/useOptions';
import { DEFAULT_POSITION, KEYS } from '../../../app/constants/snake';
import { OPTIONS_VALUE } from '../../../app/constants/config';

describe('useGameplay', () => {
  const { endGame, startGame, setRandomPoint } = useGameplay();
  const { isBotEnabled } = useOptions();
  const { newGame, positions, currentMove, point, options } = useSharedState();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('StarGame без бота', async () => {
    await startGame();

    expect(newGame.value).not.toBe(0);
    newGame.value = 0;
  });

  it('StarGame c ботом', async () => {
    options.value = [OPTIONS_VALUE.BOT];

    await startGame();

    expect(isBotEnabled).toBeTruthy();
    expect(newGame.value).toBe(0);
  });

  it('setRandomPoint', async () => {
    const startPoint = { ...point };

    await setRandomPoint();

    expect(point).not.toEqual(startPoint);
  });

  it('clearData', () => {
    vi.useFakeTimers();
    const spyClearInterval = vi.spyOn(global, 'clearInterval');

    positions.push(DEFAULT_POSITION);
    currentMove.value = KEYS.UP;
    endGame();

    expect(positions).toHaveLength(1);
    expect(currentMove.value).toBe('');
    expect(spyClearInterval).toHaveBeenCalled();
  });
});
