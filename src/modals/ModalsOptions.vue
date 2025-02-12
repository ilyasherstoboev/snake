<script setup lang="ts">
import UiToggle from '@/components/ui/UiToggle.vue';
import { inject, type Ref } from 'vue';
import TemplateModals from '@/templates/TemplateModals.vue';
import useModal from '../../app/composables/useModal.ts';
import LocalStorage from '../../app/services/localStorage.ts';
import LOCAL_STORAGE from '../../app/constants/localStorage.ts';
import { OPTIONS } from '../../app/constants/config.ts';

const { closeModal } = useModal();

const optionsInjection = inject<{ options: Ref<string[]> }>('options');

if (!optionsInjection) {
  throw new Error('Injection "options" not found');
}

const { options }: { options: Ref<string[]> } = optionsInjection;
const saveOptions = () => {
  LocalStorage.set(LOCAL_STORAGE.options, options.value);
  closeModal();
};
</script>

<template>
  <template-modals @close="closeModal" class="modal">
    <div class="modal__content">
      <h1 class="modal__title">Options</h1>
      <ui-toggle
        v-for="option in OPTIONS"
        v-model="options"
        :key="option.id"
        :label="option.label"
        :id="option.id"
        :value="option.value"
      />
    </div>
    <template #navigation>
      <div class="modal__navigation">
        <button data-test="close" class="modal__button modal__button_close" @click="closeModal">
          close
        </button>
        <button data-test="save" class="modal__button modal__button_continue" @click="saveOptions">
          save
        </button>
      </div>
    </template>
  </template-modals>
</template>

<style scoped lang="scss">
.modal {
  &__title {
    margin-bottom: 15px;
  }

  &__content {
    margin-bottom: 25px;
  }

  &__button,
  &__close {
    background: $red;
    border: 2px solid black;
    border-radius: 10%;
    text-transform: uppercase;
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    padding: 5px 15px;
    cursor: pointer;

    &_continue {
      background: $button;
    }
  }
}
</style>
