<script setup lang="ts">
const props = defineProps({
  id: {
    type: [String],
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const model = defineModel();
</script>

<template>
  <label class="button-checkbox" :for="props.id">
    <input
      :id="props.id"
      class="button-checkbox__input"
      type="checkbox"
      v-model="model"
      :value="props.value"
    />
  </label>
</template>

<style scoped lang="scss">
.button-checkbox {
  position: relative;
  cursor: pointer;
  width: 70px;
  height: 30px;
  border: 2px solid black;

  &:before,
  &:after {
    top: 50%;
    position: absolute;
    transform: translate(0, -50%);
  }
  &:before {
    content: 'ON';
    left: 3px;
  }
  &:after {
    content: 'OFF';
    right: 3px;
  }
  &__input {
    margin: 0;
    cursor: pointer;
    appearance: none;
    background: $red;
    height: 100%;
    width: 100%;

    &:checked {
      background: $button;
    }

    &:checked:before {
      animation: slideIn 0.1s ease-out forwards;
    }
    &:before {
      border: 2px solid black;
      content: '';
      height: 26px;
      width: 30px;
      background: #ecec68;
      position: absolute;
      top: -2px;
      left: -2px;
      z-index: 1;
      animation: slideOut 0.1s ease-out forwards;
    }
  }
}

@keyframes slideIn {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(36px);
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(36px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
