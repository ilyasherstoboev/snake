<script setup lang="ts">
import TemplateSnake from '@/templates/TamplateSnake.vue';
import SnakeMain from '@/components/SnakeMain.vue';
import SnakeArrows from '@/components/SnakeArrows.vue';
import ModalsMain from '@/modals/ModalsMain.vue';

import useSnake from '../app/composables/snake/useSnake.ts';

const { positions, handlers, showOptions, point, currentMove, endGame, options } = useSnake();
</script>

<template>
  <ModalsMain />
  <TemplateSnake @options="showOptions" @end="endGame" :active-options="!currentMove">
    <template #content>
      <SnakeMain :positions="positions" :point="point" />
    </template>
    <template #arrows>
      <SnakeArrows v-on="handlers" v-if="options?.includes('Arrows')" />
    </template>
  </TemplateSnake>
</template>
