<script setup lang="ts">
import ButtonToggle from '@/components/buttons/ButtonToggle.vue';
const model = defineModel();

const props = defineProps({
  label: String,
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="ui-toggle">
    <p class="ui-toggle__text">{{ props.label }}</p>
    <button-toggle :id="props.id" v-model="model" :value="props.value"/>
  </div>
</template>

<style scoped lang="scss">
.ui-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__text {
    text-transform: uppercase;
  }
}
</style>
