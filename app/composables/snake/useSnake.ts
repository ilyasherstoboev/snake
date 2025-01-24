import useSharedState from './useSharedState';
import useGameplay from './useGameplay.ts';
import useModal from '../useModal.ts';
import useHandleKeys from './useHandleKeys.ts';

export default function () {
  const { positions, point, options, currentMove } = useSharedState();
  const { endGame } = useGameplay();
  const { showOptions } = useModal();
  const { handlers } = useHandleKeys();

  return {
    options,
    endGame,
    currentMove,
    handlers,
    positions,
    point,
    showOptions,
  };
}
