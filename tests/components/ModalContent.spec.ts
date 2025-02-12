import { describe, it, expect } from 'vitest';
import ModalContent from '../../src/components/ModalContent.vue';
import { mount } from '@vue/test-utils';
import { PROPS } from '../../app/constants/template';

describe('ModalConten', () => {
  it('рендер', () => {
    const wrapper = mount(ModalContent);

    expect(wrapper.text()).toContain(PROPS.modalContent.title);
    expect(wrapper.text()).toContain(PROPS.modalContent.description);
  });

  it('проверка пропсов', () => {
    const wrapper = mount(ModalContent, {
      props: {
        title: 'title',
        description: 'description',
      },
    });

    expect(wrapper.text()).toContain('title');
    expect(wrapper.text()).toContain('description');
  });
});
