export default {
  limit: {
    x: 30,
    y: 30,
  },
  speed: 80
};

export const OPTIONS_VALUE = {
  EAT: 'eat',
  ARROWS: 'Arrows',
  BORDER: 'border',
  BOT: 'bot',
};

export const OPTIONS = [
  {
    id: '0',
    label: 'Eat myself',
    value: OPTIONS_VALUE.EAT,
  },
  {
    id: '1',
    label: 'Arrows',
    value: OPTIONS_VALUE.ARROWS,
  },
  {
    id: '2',
    label: 'Borders',
    value: OPTIONS_VALUE.BORDER,
  },
  {
    id: '3',
    label: 'Bot',
    value: OPTIONS_VALUE.BOT,
  },
];
