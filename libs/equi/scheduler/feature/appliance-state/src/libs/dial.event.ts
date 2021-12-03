import { bind } from '@react-rxjs/core';
import {
  buttonClicked$,
  buttonHolded$,
  dialAngle$,
} from '@virtue-equi/equi-shared-features';
import { combineLatest, map, merge } from 'rxjs';

export const [useIsScheduling, isScheduling$] = bind(
  merge(
    buttonClicked$.pipe(map(() => false)),
    buttonHolded$.pipe(map(() => true))
  ),
  false
);

export const [useDialTimeTextAngle] = bind(
  combineLatest([dialAngle$, isScheduling$]).pipe(
    map(([dialAngle, isScheduling]) => (isScheduling ? 0 : dialAngle))
  ),
  0
);
