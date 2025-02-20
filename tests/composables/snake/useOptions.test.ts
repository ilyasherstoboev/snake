import { describe, it, expect, afterEach } from 'vitest';
import useOptions from '../../../app/composables/snake/useOptions';
import useSharedState from '../../../app/composables/snake/useSharedState';
import { OPTIONS_VALUE } from '../../../app/constants/config';

describe('useOptions', () => {
  const { isEatEnabled, isBorderEnabled, isBotEnabled } = useOptions();
  const { options } = useSharedState();

  const optionsList = [
    {
      key: OPTIONS_VALUE.EAT,
      option: isEatEnabled,
    },
    {
      key: OPTIONS_VALUE.BORDER,
      option: isBorderEnabled,
    },
    {
      key: OPTIONS_VALUE.BOT,
      option: isBotEnabled,
    },
  ];

  afterEach(() => {
    options.value = [];
  });

  it.each(optionsList)('проверка настройки $key', ({ key, option }) => {
    expect(option.value).toBe(false);

    options.value = [key];

    expect(option.value).toBe(true);
  });
});
