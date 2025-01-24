export default {
  get(key: string) {
    try {
      const res = localStorage.getItem(key);
      return res ? JSON.parse(res) : null;
    } catch (e) {
      return e;
    }
  },
  set(key: string, payload: string[]) {
    try {
      if (payload) {
        localStorage.setItem(key, JSON.stringify(payload));
        return;
      }
      throw new Error("Что-то пошло не так");
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
