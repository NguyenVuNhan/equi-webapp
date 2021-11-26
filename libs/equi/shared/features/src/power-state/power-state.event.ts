import { bind } from '@react-rxjs/core';
import {
  EnphasePowerStatus,
  getPowerStatus,
} from '@virtue-equi/equi-shared-data-access';
import { concatMap, from, scan, timer } from 'rxjs';

const UPDATE_POWER_STATE_INTERVAL = 5000;
const initBatteryState: EnphasePowerStatus = {
  production: 100,
  consumption: 50,
  battery: { percent: 40, status: 'idle' },
};
export const [usePowerStatus, powerStatus$] = bind<EnphasePowerStatus>(
  timer(UPDATE_POWER_STATE_INTERVAL).pipe(
    concatMap(() =>
      from(getPowerStatus()).pipe(
        scan((acc, value) => {
          if (value === false) {
            return acc;
          }
          return value;
        }, initBatteryState)
      )
    )
  ),
  initBatteryState
);
