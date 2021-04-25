import { useEffect, useRef } from "react";

export const useInterval = (callback, tick) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (tick <= 0) return;
    const id = setInterval(
      () => callbackRef.current && callbackRef.current(),
      tick
    );
    return () => clearInterval(id);
  }, [tick]);
};

export default useInterval;
