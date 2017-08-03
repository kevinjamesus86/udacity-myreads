const cancelProp = Symbol('async.cancel');

export const cancel = o =>
  o && typeof o[cancelProp] === 'function' && o[cancelProp]();

/**
 * Run a function after some time has passed
 * @param {number} ms - Number of miliseconds to wait before executing `f`
 * @param {function} f - Function to run after `ms` milliseconds have elapsed
 */
export const after = (ms, ...rest) => {
  let timeoutId;
  return Object.assign(
    new Promise((resolve, reject) => {
      timeoutId = setTimeout(
        f => {
          try {
            resolve(f());
          } catch (error) {
            reject(error);
          }
        },
        ms,
        ...rest
      );
    }),
    {
      [cancelProp]() {
        clearTimeout(timeoutId);
      },
    }
  );
};
