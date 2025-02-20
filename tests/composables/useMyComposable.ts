// composables/useMyComposable.js
export function useMyComposable() {
  function privateFunction() {
    console.log('Private function called');
  }

  function publicFunction() {
    privateFunction(); // вызов неэкспортируемой функции
  }

  return { publicFunction };
}
