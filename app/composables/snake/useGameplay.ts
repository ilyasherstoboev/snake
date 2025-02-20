import config from '../../constants/config';
import { DEFAULT_POSITION, DIRECTION, KEYS } from '../../constants/snake';

import type { ICoordinate, IFirstRow, IMove } from '../../interfaces/snake.ts';
import { MODAL_NAME } from '../../interfaces/template.ts';

import { TemplatesService } from '../../services/templates.ts';

import {
  delay,
  eatPoint,
  initSnakeDirect,
  initTurns,
  checkIsEatMyself,
  moveBorder,
} from '../../utilits/composables.ts';

import useSharedState from './useSharedState.ts';
import useOptions from './useOptions.ts';
import useModal from '../useModal.ts';

export default function () {
  const { newGame, positions, currentMove, point } = useSharedState();
  const { isBotEnabled, isEatEnabled, isBorderEnabled } = useOptions();
  const { changeActiveModal } = useModal();
  const snakeDirect = initSnakeDirect(positions);
  const [limitX, limitY] = [config.limit.x, config.limit.y];

  const eatAndCreatePoint = (newHeadPosition: ICoordinate) => {
    const beforeEatLength = positions.length;

    eatPoint({ positions, newHeadPosition, point });

    if (beforeEatLength < positions.length) {
      setRandomPoint();
    }
  };

  const startBotOrInterval = async () => {
    if (isBotEnabled.value) {
      await moveBot(positions[0]);
      return;
    }
    newGame.value = window.setInterval(moveSnake, config.speed);
  };

  /**
   * Движение дальше
   */
  const moveSnake = () => {
    if (!currentMove.value || isBotEnabled.value) {
      return;
    }

    const nextStep = snakeDirect[currentMove.value]();
    const didectionKey = DIRECTION[currentMove.value];
    let newHeadPosition: ICoordinate = {
      x: positions[0].x,
      y: positions[0].y,
      [didectionKey]: nextStep,
    };
    const isEatMyself = !isEatEnabled.value && checkIsEatMyself(positions, newHeadPosition);
    const modalName = !checkLimit(nextStep) ? MODAL_NAME.OVER : isEatMyself ? MODAL_NAME.ATE : '';

    if (modalName) {
      endGameAndShowModal(modalName);
      return;
    }

    if (isBorderEnabled.value) {
      newHeadPosition = moveBorder(newHeadPosition);
    }

    eatAndCreatePoint(newHeadPosition);
  };

  const endGameAndShowModal = (modal: MODAL_NAME) => {
    clearData();
    changeActiveModal(modal);
  };

  const setRandomPoint = () => {
    let randomPointX: number, randomPointY: number;

    do {
      [randomPointX, randomPointY] = [
        TemplatesService.randomLimit('x'),
        TemplatesService.randomLimit('y'),
      ];

      if (positions.length >= limitX * limitY) {
        endGameAndShowModal(MODAL_NAME.END);
        return;
      }
    } while (positions.some((item) => item.x === randomPointX && item.y === randomPointY));

    [point.x, point.y] = [randomPointX, randomPointY];
  };

  const checkLimit = (nextStep: number) => {
    if (isBorderEnabled.value) return true;

    return nextStep > 0 && nextStep < limitX + 1 && nextStep < limitY + 1;
  };

  const repeatMoves = async (steps: IMove[], botPosition: ICoordinate) => {
    while (botPosition.x < limitX) {
      await nextStepBot(steps[0], botPosition);
      await turnBot(botPosition, () => (botPosition.x += 1));
      await nextStepBot(steps[1], botPosition);

      if (botPosition.x < limitX) {
        await turnBot(botPosition, () => (botPosition.x += 1));
      }

      if (!currentMove.value) {
        clearData();
      }
    }
  };

  const moveBot = async (coordinate = { ...positions[0] }) => {
    const steps: IMove[] = [KEYS.DOWN, KEYS.UP];

    await repeatMoves(steps, coordinate);
    await turnBot(coordinate, () => (coordinate.y -= 1));
    await turnBot(coordinate, () => (coordinate.x -= 1));
    await nextStepBot(KEYS.LEFT, coordinate);

    if (!currentMove.value) {
      clearData();
      return;
    }
    if (coordinate.y > 0) {
      await moveBot(coordinate);
    }
  };

  const turnBot = async (coordinate: ICoordinate, changeTurn = () => {}) => {
    changeTurn();
    eatAndCreatePoint(coordinate);
    await delay();
  };

  const nextStepBot = async (direction: IMove, coordinate: ICoordinate) => {
    if (!currentMove.value) {
      clearData();
      return;
    }

    const firstRow: IFirstRow = initTurns(coordinate);
    const { condition, action } = firstRow[direction];

    if (condition()) {
      action();
      await turnBot(coordinate);
      await nextStepBot(direction, coordinate);
    }
  };

  /**
   * Очистка данных
   */
  const clearData = () => {
    clearInterval(newGame.value);
    currentMove.value = '';
    positions.splice(0, positions.length, { ...DEFAULT_POSITION });
  };

  return {
    setRandomPoint,
    startGame: startBotOrInterval,
    moveSnake,
    endGame: clearData,
  };
}
