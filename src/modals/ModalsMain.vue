<script setup lang="ts">
import { computed, inject } from 'vue';

import { MODALS, PROVIDE_KEYS } from '../../app/constants/template.ts';
import { MODAL_NAME, type IActiveModal } from '../../app/interfaces/template.ts';

const activeModalInject = inject<IActiveModal>(PROVIDE_KEYS.ACTIVE_MODAL);

if (!activeModalInject) {
  throw new Error('Injection "activeModal" not found');
}

const { activeModal, changeActiveModal } = activeModalInject;

const getContent = computed(() => {
  return activeModal.value ? MODALS[activeModal.value as MODAL_NAME] : MODALS.OVER;
});

const closeModal = () => {
  changeActiveModal('');
};
</script>

<template>
  <component v-if="activeModal" :is="getContent" @close="closeModal" />
</template>
