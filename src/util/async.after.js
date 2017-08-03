export const after = (ms, ...rest) => {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  const timeoutId = setTimeout(
    f => {
      try {
        const r = f();
        resolve(r);
      } catch (error) {
        reject(error);
      }
    },
    ms,
    ...rest
  );
  return Object.assign(promise, {
    cancel() {
      clearTimeout(timeoutId);
    },
    toString() {
      return timeoutId;
    },
  });
};
