<script setup lang="ts">
import { inject } from 'vue';
import { type Ref } from 'vue';

import { MODALS } from '../../app/constants/template.ts';

interface IActiveModal {
  activeModal: Ref<string>
  changeActiveModal: (val: string) => void
}

type TModalKey = 'OVER' | 'ATE' | 'OPTIONS' | 'END';

const activeModalInject = inject<IActiveModal>('activeModal');

if (!activeModalInject) {
  throw new Error('Injection "options" not found');
}

const {
  activeModal,
  changeActiveModal,
} = activeModalInject;

const getContent = () => {
  return activeModal ? MODALS[activeModal.value as TModalKey] : MODALS.OVER;
};

const closeModal = () => {
  changeActiveModal('');
};
</script>

<template>
  <component v-if="activeModal" :is="getContent()" @close="closeModal" />
</template>
