<script setup lang="ts">
import TemplateModals from '@/templates/TemplateModals.vue';
import useModal from '../../app/composables/useModal.ts';
const { closeModal, closeTab } = useModal();
</script>

<template>
  <template-modals @close="closeModal" @no="closeTab" @yes="closeModal">
    <div class="modal__content">
      <h1 class="modal__title">Congratulation!</h1>
      <h3 class="modal__description">do you want to continue?</h3>
    </div>
  </template-modals>
</template>
