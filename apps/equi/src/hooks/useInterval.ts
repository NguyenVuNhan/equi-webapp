import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number) {
  const intervalRef = useRef<number>();
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(
        () => callbackRef.current && callbackRef.current(),
        delay
      );

      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}

export default useInterval;
