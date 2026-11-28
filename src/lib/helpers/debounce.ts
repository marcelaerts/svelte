let timeout: ReturnType<typeof setTimeout>;

export const debounce = (callback: () => void): void => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    callback();
  }, 750);
};
