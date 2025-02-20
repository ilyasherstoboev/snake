export default {
  get(key: string) {
    try {
      if (!key) {
        throw new Error('Не корректный ключ');
      }
      const res = localStorage.getItem(key);
      return res ? JSON.parse(res) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  set(key: string, payload: string[]) {
    try {
      if (payload) {
        localStorage.setItem(key, JSON.stringify(payload));
        return;
      }
      throw new Error('Что-то пошло не так');
    } catch (e) {
      console.error(e);
    }
  },
};
