import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SnakeNavigator from '../../src/components/SnakeNavigator.vue';

interface IArrClass {
  modifier: string,
  classes: string[],
};

describe('snake navigator', () => {
  const label = 'Label';
  const mainClass = 'snake-navigator';
  const arrClass: IArrClass[] = [
    {
      modifier: '',
      classes: [mainClass],
    },
    {
      modifier: 'yellow',
      classes: [mainClass, `${mainClass}_yellow`],
    }
  ];

  it.each(arrClass)('snake navigator $modifier with label', ({ modifier, classes }) => {
    const wrapper = mount(SnakeNavigator, {
      slots: {
        default: label,
      },
      props: {
        modifier: modifier
      }
    });

    expect(wrapper.html()).toContain(label);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(classes));
  });
});
