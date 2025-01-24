import config from '../../constants/config';
import type { ICoordinate, IFirstRow, IMove } from '../../interfaces/snake.ts';
import { DEFAULT_POSITION, DIRECTION } from '../../constants/snake';
import { ref } from 'vue';

import { TemplatesService } from '../../services/templates.ts';

import useSharedState from './useSharedState.ts';
import useOptions from './useOptions.ts';
import useModal from '../useModal.ts';

export default function () {
  const { generateKey } = TemplatesService;
  const { newGame, positions, currentMove, point } = useSharedState();
  const { optionHasBot, optionHasEat, optionHasBorder } = useOptions();
  const { changeActiveModal } = useModal();

  const delayMS = ref(1);
  const delay = (ms = delayMS.value) => new Promise((res) => setTimeout(res, ms));

  /**
   * Создание интервала
   */
  const startGame = async () => {
    if (optionHasBot.value) {
      await move(positions[0]);
      return;
    }
    newGame.value = window.setInterval(moveSnake, config.speed);
  };

  /**
   * Движение дальше
   */
  const moveSnake = () => {
    if (!currentMove.value || optionHasBot.value ) {
      return;
    }

    /**
     * @const {number} actualMove - Текущее направление движения змейки.
     * координаты направления по оси 1-limit
     */
    const actualMove = snakeDirect[currentMove.value]();

    if (!checkLimit(actualMove)) {
      clearData();
      changeActiveModal('over');
      return;
    }

    let actualCoordinates: ICoordinate = {
      x: positions[0].x,
      y: positions[0].y,
    };

    const test = DIRECTION[currentMove.value];
    actualCoordinates[test] = actualMove;
    if (!optionHasEat.value && isEatMyself(actualCoordinates)) {
      clearData();
      changeActiveModal('ate');
      return;
    }

    if (optionHasBorder.value) {
      actualCoordinates = moveBorder(actualCoordinates);
    }

    eatPoint(actualCoordinates);
  };

  /**
   * Перекидывание на другую сторону границы
   * @param actualCoordinates
   */
  const moveBorder = ({ x, y }: ICoordinate) => {
    const { x: limitX, y: limitY } = config.limit;

    return {
      x: x < 1 ? limitX : x > limitX ? 1 : x,
      y: y < 1 ? limitY : y > limitY ? 1 : y,
    };
  };

  /**
   * Движение по координатам
   * @param actualCoordinates
   */
  const eatPoint = (actualCoordinates: ICoordinate) => {
    if (point.x === actualCoordinates.x && point.y === actualCoordinates.y) {
      positions.unshift({
        id: generateKey(),
        x: point.x,
        y: point.y,
      });
      setRandomPoint();
    } else {
      positions.unshift({
        ...actualCoordinates,
        id: generateKey(),
      });
      positions.pop();
    }
  };

  /**
   * Проверка съел ли себя
   * @param x
   * @param y
   */
  const isEatMyself = ({ x, y }: ICoordinate) => {
    return positions.some(
      (item) => x === item.x && y === item.y && item !== positions[positions.length - 1],
    );
  };

  /**
   * Полчение рандомной точки
   */
  const setRandomPoint = () => {
    let randomX: number, randomY: number;
    do {
      randomX = TemplatesService.randomLimit('x');
      randomY = TemplatesService.randomLimit('y');

      if (positions.length > 30 * 30 - 1) {
        changeActiveModal('end');
        clearData();
        break;
      }
    } while (positions.some((item) => item.x === randomX && item.y === randomY));
    point.x = randomX;
    point.y = randomY;
  };

  /**
   * Проверка не выходит ли за лимит
   * @param actualMove
   */
  const checkLimit = (actualMove: number) => {
    if (optionHasBorder.value) return true;

    return actualMove > 0 && actualMove < config.limit.x + 1 && actualMove < config.limit.y + 1;
  };

  /**
   * Движение бота
   * @param coordinate
   */
  const move = async (coordinate = { ...positions[0] }) => {
    const steps: IMove[] = ['DOWN', 'UP'];

    while (coordinate.x < config.limit.x) {
      await step(steps[0], coordinate);
      await turn(coordinate, () => (coordinate.x += 1));
      await step(steps[1], coordinate);

      if (coordinate.x < config.limit.x) {
        await turn(coordinate, () => (coordinate.x += 1));
      }

      if (!currentMove.value) {
        clearData();
        return;
      }
    }

    await turn(coordinate, () => (coordinate.y -= 1));
    await turn(coordinate, () => (coordinate.x -= 1));
    await step('LEFT', coordinate);

    if (!currentMove.value) {
      clearData();
      return;
    }
    if (coordinate.y > 0) {
      await move(coordinate);
    }
  };

  /**
   * Поворот бота
   * @param coordinate
   * @param func
   */
  const turn = async (coordinate: ICoordinate, func = () => {}) => {
    func();
    eatPoint(coordinate);
    await delay();
  };

  /**
   * Следующий шаг бота
   * @param direction
   * @param coordinate
   */
  const step = async (direction: IMove, coordinate: ICoordinate) => {
    if (!currentMove.value) {
      clearData();
      return;
    }
    const firstRow: IFirstRow = {
      UP: {
        condition: () => coordinate.y > 2,
        action: () => (coordinate.y -= 1),
      },
      LEFT: {
        condition: () => coordinate.x > 1,
        action: () => (coordinate.x -= 1),
      },
      DOWN: {
        condition: () => coordinate.y < config.limit.y,
        action: () => (coordinate.y += 1),
      },
    };
    const { condition, action } = firstRow[direction];

    if (condition()) {
      action();
      await turn(coordinate);
      await step(direction, coordinate);
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

  interface IDirect {
    [key: string]: () => number
  }

  /**
   * Шаг направление змеи
   */
  const snakeDirect: IDirect = {
    UP: () => positions[0].y - 1,
    LEFT: () => positions[0].x - 1,
    DOWN: () => positions[0].y + 1,
    RIGHT: () => positions[0].x + 1,
  };

  return {
    setRandomPoint,
    startGame,
    moveSnake,
    endGame: clearData,
  };
}
