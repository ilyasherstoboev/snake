<script setup lang="ts">
import SnakeNavigator from '@/components/SnakeNavigator.vue';

const emits = defineEmits(['options', 'end']);
const props = defineProps({
  activeOptions: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="snake">
    <div class="snake__navigation">
      <snake-navigator
        data-test="options"
        @click="emits('options')"
        :disabled="!props.activeOptions"
      >
        Options
      </snake-navigator>
      <snake-navigator
        data-test="end"
        @click="emits('end')"
        :disabled="props.activeOptions"
        modifier="yellow"
      >
        End game
      </snake-navigator>
    </div>
    <div class="snake__content">
      <slot name="content" />
      <slot name="arrows" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.snake {
  height: fit-content;
  width: fit-content;
  padding: 40px;
  background: $content;
  margin: auto;
  border-radius: 10px;
  border: 2px solid $border;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;

  &__navigation {
    display: flex;
    gap: 15px;
  }

  &__content {
    align-items: center;
    gap: 20px;
    display: flex;
  }
}
</style>
