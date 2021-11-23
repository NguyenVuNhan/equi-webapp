import { useEffect, useRef } from 'react';

export const useTimeout = (
  callback: () => void,
  delay: number,
  reset = false
) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null && reset) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
    return () => {
      return;
    };
  }, [delay, reset]);
};
