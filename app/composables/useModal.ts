import { provide } from 'vue';
import useSharedState from './snake/useSharedState.ts';
import { MODAL_NAME } from '../interfaces/template.ts';
import { PROVIDE_KEYS } from '../constants/template.ts';

export default function () {
  const { activeModal } = useSharedState();

  const changeActiveModal = (val: string): void => {
    activeModal.value = val;
  };

  const closeModal = () => {
    changeActiveModal('');
  };

  const closeTab = () => {
    window.close();
  };

  const showOptions = (): void => {
    changeActiveModal(MODAL_NAME.OPTIONS);
  };

  provide(PROVIDE_KEYS.ACTIVE_MODAL, { activeModal, changeActiveModal });

  return {
    closeTab,
    closeModal,
    showOptions,
    changeActiveModal,
  };
}
