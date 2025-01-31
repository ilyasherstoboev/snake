import ModalsEat from '../../src/modals/ModalsEat.vue';
import ModalsOver from '../../src/modals/ModalsOver.vue';
import ModalsOptions from '../../src/modals/ModalsOptions.vue';
import ModalsEnd from '../../src/modals/ModalsEnd.vue';
import type { Component } from 'vue';

import { MODAL_NAME } from '../interfaces/template.ts';

export const PROVIDE_KEYS = {
  OPTIONS: 'options',
  ACTIVE_MODAL: 'activeModal',
};

export const MODALS: Record<MODAL_NAME, Component> = {
  [MODAL_NAME.OVER]: ModalsOver,
  [MODAL_NAME.ATE]: ModalsEat,
  [MODAL_NAME.OPTIONS]: ModalsOptions,
  [MODAL_NAME.END]: ModalsEnd,
};
