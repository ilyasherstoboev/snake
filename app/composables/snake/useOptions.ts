import { computed, provide, type Ref } from 'vue';
import useSharedState from './useSharedState';
import type { ComputedRef } from 'vue';
import { OPTIONS_VALUE } from '../../constants/config.ts';
import { PROVIDE_KEYS } from '../../constants/template.ts';

export default function () {
  const { options }: { options: Ref<string[]>}  = useSharedState();
  provide(PROVIDE_KEYS.OPTIONS, { options });

  const optionHasEat: ComputedRef<boolean> = computed(() => {
    return options.value.includes(OPTIONS_VALUE.EAT);
  });

  const optionHasBorder: ComputedRef<boolean> = computed(() => {
    return options.value.includes(OPTIONS_VALUE.BORDER);
  });

  const optionHasBot: ComputedRef<boolean> = computed(() => {
    return options.value.includes(OPTIONS_VALUE.BOT);
  });

  return {
    optionHasEat,
    optionHasBorder,
    optionHasBot,
  };
}
