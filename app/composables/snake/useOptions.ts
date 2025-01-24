import { computed, provide, type Ref } from 'vue';
import useSharedState from './useSharedState';
import type { ComputedRef } from 'vue';

export default function () {
  const { options }: { options: Ref<string[]>}  = useSharedState();
  provide('options', { options });

  const optionHasEat: ComputedRef<boolean> = computed(() => {
    return options.value.includes('eat');
  });

  const optionHasBorder: ComputedRef<boolean> = computed(() => {
    return options.value.includes('border');
  });

  const optionHasBot: ComputedRef<boolean> = computed(() => {
    return options.value.includes('bot');
  });

  return {
    optionHasEat,
    optionHasBorder,
    optionHasBot,
  };
}
