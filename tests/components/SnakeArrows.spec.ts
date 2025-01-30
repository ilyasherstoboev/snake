import { it } from 'vitest';
import { mount } from '@vue/test-utils';
import SnakeArrows from '../../src/components/SnakeArrows.vue';

it.only('should ', () => {
  const wrapper = mount(SnakeArrows);
  console.log(wrapper.html());
});

