export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...rest) {
    if (!lastRan) {
      func(...rest);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...rest);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
