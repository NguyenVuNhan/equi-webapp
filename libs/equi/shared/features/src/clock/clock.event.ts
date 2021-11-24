import { bind } from '@react-rxjs/core';
import { interval, map } from 'rxjs';

export const digitFormat = (time: number): string => {
  return time.toString().padStart(2, '0');
};

export function getCurrentTime() {
  const now = new Date();
  return {
    hour: digitFormat(now.getHours()),
    minute: digitFormat(now.getMinutes()),
  };
}

export type ClockType = {
  hour: string;
  minute: string;
};
export const [useClock, clock$] = bind<ClockType>(
  interval(1000).pipe(map(getCurrentTime)),
  getCurrentTime()
);
