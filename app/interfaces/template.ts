import type { Ref } from "vue";

export enum MODAL_NAME {
  OVER = 'OVER',
  ATE = 'ATE',
  OPTIONS = 'OPTIONS',
  END = 'END',
}

export interface IActiveModal {
  activeModal: Ref<string>;
  changeActiveModal: (val: string) => void;
}
