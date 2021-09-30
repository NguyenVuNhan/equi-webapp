import { useEffect, useRef } from 'react';

interface Config {
  startNow?: boolean;
}
export function useInterval(
  callback: () => void,
  delay: number,
  config: Config = { startNow: true }
) {
  const intervalRef = useRef<number>();
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      config.startNow && callbackRef.current && callbackRef.current();
      intervalRef.current = window.setInterval(
        () => callbackRef.current && callbackRef.current(),
        delay
      );

      return () => window.clearInterval(intervalRef.current);
    }

    return () => {
      return;
    };
  }, [config.startNow, delay]);

  return intervalRef;
}

export default useInterval;
