import { describe, it, expect, vi } from 'vitest';
import useSharedState from '../../app/composables/snake/useSharedState';
import useModal from '../../app/composables/useModal';
import { MODAL_NAME } from '../../app/interfaces/template';

vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('useModal', () => {
  const { activeModal } = useSharedState();
  const { changeActiveModal, closeModal, closeTab, showOptions } = useModal();

  it('changeActiveModal', () => {
    changeActiveModal('test');

    expect(activeModal.value).toBe('test');

    changeActiveModal('');

    expect(activeModal.value).toBe('');
  });

  it('closeModal', () => {
    activeModal.value = 'test';

    closeModal();

    expect(activeModal.value).toBe('');
  });

  it('closeTab', () => {
    const spyCloseWindow = vi.spyOn(window, 'close');

    closeTab();

    expect(spyCloseWindow).toHaveBeenCalledOnce();
  });

  it('showOptions', () => {
    showOptions();

    expect(activeModal.value).toBe(MODAL_NAME.OPTIONS);
  });
});
