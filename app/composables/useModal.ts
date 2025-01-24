import { provide } from 'vue';
import useSharedState from './snake/useSharedState.ts';

export default function () {
  const { activeModal } = useSharedState();

  const changeActiveModal = (val: string): void => {
    activeModal.value = val;
  };

  const closeModal = () => {
    changeActiveModal('');
  };

  const closeTab = () => {
    close();
  };

  const showOptions = (): void => {
    changeActiveModal('options');
  };

  provide('activeModal', { activeModal, changeActiveModal });

  return {
    closeTab,
    closeModal,
    showOptions,
    changeActiveModal
  };
}
