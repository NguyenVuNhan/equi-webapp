import { useEffect, useRef } from "react";

function useInterval(callback: Function, delay: number) {
  const intervalRef = useRef<number>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(
        () => callbackRef.current(),
        delay
      );

      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}

export default useInterval;
