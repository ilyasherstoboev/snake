import { describe, expect, it, vi, afterEach } from 'vitest';
import LocalStorage from '../../app/services/localStorage';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('localStorage', () => {
  const initMockGetLS = <T>(mockReturn: T) => {
    return vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockReturn));
  };

  it('get', () => {
    const mockReturn = ['options'];
    const spyGetLocalStorage = initMockGetLS(mockReturn);

    const result = LocalStorage.get('options');

    expect(spyGetLocalStorage).toHaveBeenCalledOnce();
    expect(spyGetLocalStorage).toHaveBeenCalledWith('options');
    expect(result).toEqual(mockReturn);

    vi.restoreAllMocks();

    const spyGetLocalStorageNull = initMockGetLS(null);
    const resultNull = LocalStorage.get('notExist');

    expect(spyGetLocalStorageNull).toHaveBeenCalledOnce();
    expect(resultNull).toBeNull();
  });

  it('set', () => {
    const spySet = vi.spyOn(Storage.prototype, 'setItem');

    LocalStorage.set('options', ['arrows']);

    expect(spySet).toHaveBeenCalledWith('options', JSON.stringify(['arrows']));

    vi.restoreAllMocks();
  });

  it('ожидаю ошибку', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const payload = null;

    // Первый вызов: LocalStorage.set
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LocalStorage.set('key', payload);

    // Второй вызов: LocalStorage.get
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    LocalStorage.get(null);

    // Проверяем общее количество вызовов
    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });
});
