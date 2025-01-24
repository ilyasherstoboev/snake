<script setup lang="ts">
import ModalsEat from '@/modals/ModalsEat.vue';
import ModalsOver from '@/modals/ModalsOver.vue';
import ModalsOptions from '@/modals/ModalsOptions.vue';
import ModalsEnd from '@/modals/ModalsEnd.vue';

import { inject } from 'vue';
import { type Ref } from 'vue';

interface IActiveModal {
  activeModal: Ref<string>
  changeActiveModal: (val: string) => void
}

type TModalKey = 'over' | 'ate' | 'options' | 'end';

const activeModalInject = inject<IActiveModal>('activeModal');

if (!activeModalInject) {
  throw new Error('Injection "options" not found');
}

const {
  activeModal,
  changeActiveModal,
} = activeModalInject;

const getContent = () => {
  return activeModal ? modals[activeModal.value as TModalKey] : modals.over;
};

const modals = {
  over: ModalsOver,
  ate: ModalsEat,
  options: ModalsOptions,
  end: ModalsEnd,
};

const closeModal = () => {
  changeActiveModal('');
};
</script>

<template>
  <component v-if="activeModal" :is="getContent()" @close="closeModal" />
</template>
