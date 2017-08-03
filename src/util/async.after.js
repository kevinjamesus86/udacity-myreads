/**
 * Run a function after some time has passed
 * @param {number} ms - Number of miliseconds to wait before executing `fn`
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
      cancel() {
        clearTimeout(timeoutId);
      },
      toString() {
        return timeoutId;
      },
    }
  );
};
