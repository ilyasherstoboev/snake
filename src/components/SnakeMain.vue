<script setup lang="ts">
import type { IPoint, IPosition } from '../../app/interfaces/snake.ts'

  interface IProps {
    positions: IPosition[],
    point: {
      x: number,
      y: number,
    }
  }

  const props = defineProps<IProps>();

  const getStyleSnake = (item: IPoint) => {
    return {
      gridColumnStart: item.x,
      gridRowStart: item.y,
    };
  };
</script>

<template>
  <div class="snake-main">
    <div
      v-for="item in props.positions"
      :key="item.id"
      class="snake-main__snake"
      :style="getStyleSnake(item)"
    />
    <div
      class="snake-main__point"
      :style="getStyleSnake(props.point)"
    />
  </div>
</template>

<style scoped lang="scss">
.snake-main {
  box-sizing: content-box;
  border: 2px solid $border;
  background: $main;
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  grid-template-rows: repeat(30, 1fr);

  &__snake {
    width: 20px;
    height: 20px;
    background: red;
  }

  &__point {
    width: 20px;
    height: 20px;
    background: $button;
  }
}
</style>
