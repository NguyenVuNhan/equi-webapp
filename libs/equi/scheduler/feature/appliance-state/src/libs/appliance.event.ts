import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { buttonClicked$, dialAngle$ } from '@virtue-equi/equi-shared-features';
import { isScheduling$ } from './dial.event';
import { IAppliance } from '@virtue-equi/shared/interfaces';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  merge,
  tap,
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

export const [onActiveAppliance$, setActiveAppliance] =
  createSignal<IAppliance | null>();
export const [useActiveAppliance, activeAppliance$] = bind(
  onActiveAppliance$,
  null
);

export const onScheduleAppliance = buttonClicked$.pipe(
  withLatestFrom(activeAppliance$, scheduleAppliance$),
  tap(([_, appliance, scheduleAppliance]) => {
    if (appliance) {
      setScheduleAppliance(scheduleAppliance !== null ? null : appliance.id);
    }
  })
);

export const applianceUpdate$ = combineLatest([
  dialAngle$,
  scheduleAppliance$,
]).pipe(
  withLatestFrom(isScheduling$),
  filter(([, isScheduling]) => !isScheduling),
  map(([value]) => value)
);

export const [useApplianceState, applianceState$] = bind(
  (appliance: IAppliance, initPosition: AppliancePosition) =>
    merge(
      // Stream for toggle active state
      applianceUpdate$.pipe(
        filter(([_, scheduleAppliance]) => scheduleAppliance === null),
        map(([dialAngle]) => {
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
        distinctUntilChanged((prev, curr) => prev.active === curr.active),
        tap(({ active }) => setActiveAppliance(active ? appliance : null))
      ),
      // Stream for scheduling
      applianceUpdate$.pipe(
        filter(([_, scheduleAppliance]) => scheduleAppliance === appliance.id),
        map(([dialAngle]) => {
          // TODO: Update the appliance with new data
          // This will work and update the reference to the init position
          // thanks to the advantage of using same object referent (similar to pointer)
          initPosition = {
            angle: dialAngle,
            x: 540 + Math.sin((dialAngle * Math.PI) / 180) * 360,
            y: 540 - Math.cos((dialAngle * Math.PI) / 180) * 360,
          };
          return {
            active: false,
            position: getApplianceInitPosition(initPosition),
            radious: APPLIANCE_DEFAULT_RADIOUS,
          };
        })
      )
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
