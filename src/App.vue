<script setup lang="ts">
import TemplateSnake from '@/templates/TemplateSnake.vue';
import SnakeMain from '@/components/SnakeMain.vue';
import SnakeArrows from '@/components/SnakeArrows.vue';
import ModalsMain from '@/modals/ModalsMain.vue';

import useSnake from '../app/composables/snake/useSnake.ts';

const { positions, handlers, showOptions, point, currentMove, endGame, options } = useSnake();
</script>

<template>
  <modals-main />
  <template-snake @options="showOptions" @end="endGame" :active-options="!currentMove">
    <template #content>
      <snake-main :positions="positions" :point="point" />
    </template>
    <template #arrows>
      <snake-arrows v-on="handlers" v-if="options?.includes('Arrows')" />
    </template>
  </template-snake>
</template>
