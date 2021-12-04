import { useEffect } from 'react';
import { Observable } from 'rxjs';

export const useSubscribe = <T>(o$: Observable<T>) => {
  useEffect(() => {
    const subscriber = o$.subscribe();
    return () => {
      subscriber.unsubscribe();
    };
  }, [o$]);
};
