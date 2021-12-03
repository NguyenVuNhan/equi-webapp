import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { debounceTime, merge, scan } from 'rxjs';

export const [buttonClicked$, onButtonClicked] = createSignal();
export const [buttonHolded$, onButtonHolded] = createSignal();
export const [dialRotate$, setDialRotate] = createSignal<boolean>();
export const [dialAngleChange$, setDialAngleChange] = createSignal<number>();
export const [useDialAngle, dialAngle$] = bind(
  merge(dialRotate$, dialAngleChange$).pipe(
    debounceTime(10),
    scan((acc, value) => {
      if (typeof value === 'boolean') {
        return acc + (value ? 1 : -1) * 10;
      }
      return value;
    }, 0)
  ),
  0
);
