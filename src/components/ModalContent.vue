<script setup lang="ts">
import { PROPS } from '../../app/constants/template';

interface Props {
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: () => PROPS.modalContent.title,
  description: () => PROPS.modalContent.description,
});
</script>

<template>
  <div class="modal__content">
    <h1 class="modal__title">{{ props.title }}</h1>
    <h3 class="modal__description">{{ props.description }}</h3>
  </div>
</template>
