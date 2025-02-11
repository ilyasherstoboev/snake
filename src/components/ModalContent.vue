<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: () => 'game over',
  description: () => 'do you want to continue?',
});
</script>

<template>
  <div class="modal__content">
    <h1 class="modal__title">{{ props.title }}</h1>
    <h3 class="modal__description">{{ props.description }}</h3>
  </div>
</template>
