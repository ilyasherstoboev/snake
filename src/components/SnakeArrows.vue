<script setup lang="ts">
import ButtonArrow from '@/components/buttons/ButtonArrow.vue';

const emits = defineEmits(['UP', 'LEFT', 'RIGHT', 'DOWN']);
</script>

<template>
  <div class="snake-arrows">
    <button-arrow
      data-test="UP"
      class="snake-arrows__button snake-arrows__button_up"
      @click="emits('UP')"
    />
    <button-arrow
      data-test="LEFT"
      class="snake-arrows__button snake-arrows__button_left"
      @click="emits('LEFT')"
    />
    <button-arrow
      data-test="DOWN"
      class="snake-arrows__button snake-arrows__button_down"
      @click="emits('DOWN')"
    />
    <button-arrow
      data-test="RIGHT"
      class="snake-arrows__button snake-arrows__button_right"
      @click="emits('RIGHT')"
    />
  </div>
</template>

<style scoped lang="scss">
.snake-arrows {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: fit-content;
  height: fit-content;
  align-items: center;
  gap: 5px;

  &__button {
    &_up {
      margin: auto;
      grid-column: 1 / 4;
      transform: rotate(-90deg);
    }

    &_left {
      transform: rotate(180deg);
    }

    &_down {
      transform: rotate(90deg);
    }
  }
}
</style>
