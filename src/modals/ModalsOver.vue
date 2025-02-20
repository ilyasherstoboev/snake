<script setup lang="ts">
import TemplateModals from '@/templates/TemplateModals.vue';
import useModal from '../../app/composables/useModal.ts';
import ModalContent from '@/components/ModalContent.vue';

const { closeModal, closeTab } = useModal();
</script>

<template>
  <template-modals @close="closeModal" @no="closeTab" @yes="closeModal">
    <modal-content />
  </template-modals>
</template>
