<script setup lang="ts">
const props = defineProps({
  modifier: {
    type: String
  }
});
</script>

<template>
  <button class="snake-navigator" :class="`snake-navigator_${props.modifier}`">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.snake-navigator {
  font-size: 25px;
  background: $button;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: $buttonHover;
  }
  &_yellow {
    background: yellow;
    &:hover {
      background: #f6ff76;
    }
  }
  &:disabled {
    cursor: auto;
    background: #979797;
  }
}
</style>
