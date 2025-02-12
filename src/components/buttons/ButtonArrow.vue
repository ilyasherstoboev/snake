<script lang='ts' setup>
import { IMAGES } from '../../../app/constants/template.ts';
</script>

<template>
  <button class="button-arrow">
    <img class="button-arrow__image" :src="IMAGES.ARROW" alt="стрелка">
  </button>
</template>

<style scoped lang="scss">
.button-arrow {
  width: 50px;
  height: 50px;
  border: 2px solid black;
  padding: 10px;
  cursor: pointer;
  background: $button;
  &:hover {
    background: $buttonHover;
  }
  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
