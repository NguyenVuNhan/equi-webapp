import { bind } from '@react-rxjs/core';
import { dialAngle$ } from '@virtue-equi/equi-shared-features';
import { IAppliance } from '@virtue-equi/shared/interfaces';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs';

const APPLIANCE_ACTIVE_THRESHOLD = 5;
const APPLIANCE_DEFAULT_RADIOUS = 32;
const APPLIANCE_ACTIVE_RADIOUS = APPLIANCE_DEFAULT_RADIOUS * 2;

export const scheduleAppliance$ = new BehaviorSubject<number | null>(null);
export const setScheduleAppliance = (id: number | null) => {
  scheduleAppliance$.next(id);
};

export interface AppliancePosition {
  x: number;
  y: number;
  angle: number;
}
export interface ApplianceState {
  active: boolean;
  position: AppliancePosition;
  radious: number;
}

export const [useDummy] = bind(
  (id: number) =>
    dialAngle$.pipe(
      withLatestFrom(scheduleAppliance$),
      map((value) => `${id} - ${value}`)
    ),
  (id) => `${id}`
);
export const [useApplianceState, applianceState$] = bind(
  (appliance: IAppliance, initPosition: AppliancePosition) =>
    dialAngle$.pipe(
      withLatestFrom(scheduleAppliance$),
      filter(
        ([_, scheduleAppliance]) =>
          scheduleAppliance === null || scheduleAppliance === appliance.id
      ),
      map(([dialAngle, _]) => {
        const { angle, x, y } = initPosition;
        if (
          angle - APPLIANCE_ACTIVE_THRESHOLD <= dialAngle &&
          dialAngle <= angle + APPLIANCE_ACTIVE_THRESHOLD
        ) {
          const radious = APPLIANCE_ACTIVE_RADIOUS;
          return {
            active: true,
            position: {
              x: x - radious,
              y: y - radious,
              angle,
            },
            radious,
          };
        }
        return {
          active: false,
          position: getApplianceInitPosition(initPosition),
          radious: APPLIANCE_DEFAULT_RADIOUS,
        };
      }),
      distinctUntilChanged((prev, curr) => prev.active === curr.active)
    ),
  (_, initPosition) => ({
    active: false,
    position: getApplianceInitPosition(initPosition),
    radious: APPLIANCE_DEFAULT_RADIOUS,
  })
);

const getApplianceInitPosition = ({ x, y, angle }: AppliancePosition) => ({
  x: x - APPLIANCE_DEFAULT_RADIOUS,
  y: y - APPLIANCE_DEFAULT_RADIOUS,
  angle,
});
