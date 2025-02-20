import { computed, provide, type Ref } from 'vue';
import useSharedState from './useSharedState';
import type { ComputedRef } from 'vue';
import { OPTIONS_VALUE } from '../../constants/config.ts';
import { PROVIDE_KEYS } from '../../constants/template.ts';

export default function () {
  const { options }: { options: Ref<string[]> } = useSharedState();
  provide(PROVIDE_KEYS.OPTIONS, { options });

  const isEatEnabled: ComputedRef<boolean> = computed(() => {
    return options.value.includes(OPTIONS_VALUE.EAT);
  });

  const isBorderEnabled: ComputedRef<boolean> = computed(() => {
    return options.value.includes(OPTIONS_VALUE.BORDER);
  });

  const isBotEnabled: ComputedRef<boolean> = computed(() => {
    return options.value.includes(OPTIONS_VALUE.BOT);
  });

  return {
    isEatEnabled,
    isBorderEnabled,
    isBotEnabled,
  };
}
