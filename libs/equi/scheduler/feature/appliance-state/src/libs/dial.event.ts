import { bind } from '@react-rxjs/core';
import { selfDependant } from '@react-rxjs/utils';
import {
  buttonClicked$,
  buttonHolded$,
  dialAngle$,
  setDialAngleChange,
} from '@virtue-equi/equi-shared-features';
import { onAddScheduleAppliance } from '@virtue-equi/equi/scheduler/feature/appliance-state';
import { angleToTime } from '@virtue-equi/equi/scheduler/utils';
import { DeviceType } from '@virtue-equi/equi/shared/utils/helper';
import {
  combineLatest,
  filter,
  map,
  merge,
  scan,
  tap,
  withLatestFrom,
} from 'rxjs';

const DIAL_RIGHT_BOUNDARY = 8;
const DIAL_LEFT_BOUNDARY = 352;

const [dialSchedule$, connectDialSchedule] =
  selfDependant<{ angle: number; activeId: number }>();

export const [useIsScheduling, isScheduling$] = bind(
  merge(
    buttonClicked$.pipe(
      withLatestFrom(dialSchedule$),
      tap(([, { activeId, angle }]) => {
        if (activeId !== 4) {
          const [strHour, strMinute] = angleToTime(angle).split(':');
          const hour = parseInt(strHour);
          const minute = parseInt(strMinute);
          const time_start = new Date();
          const time_end = new Date();
          time_start.setHours(hour, minute);
          time_end.setHours(hour, minute + 30);

          onAddScheduleAppliance({
            device_type: appliances[activeId] as DeviceType,
            time_start,
            time_end,
            power_consumption: 500,
            size: 1,
          });
        }
        setDialAngleChange(angle);
      }),
      map(() => false)
    ),
    buttonHolded$.pipe(map(() => true))
  ),
  false
);

export const [useDialAppear, dialAppear$] = bind(
  dialAngle$.pipe(
    map((dialAngle) =>
      dialAngle < DIAL_RIGHT_BOUNDARY || dialAngle > DIAL_LEFT_BOUNDARY
        ? false
        : true
    )
  ),
  false
);

export const [useDialTimeTextAngle, dialTimeTextAngle$] = bind(
  dialAngle$.pipe(
    withLatestFrom(dialAppear$),
    withLatestFrom(isScheduling$),
    filter(([, isScheduling]) => !isScheduling),
    map(([value]) => value),
    map(([dialAngle, dialAppear]) => (!dialAppear ? 0 : dialAngle))
  ),
  0
);

export const [useDialSchedule] = bind(
  combineLatest([dialAngle$, isScheduling$]).pipe(
    withLatestFrom(dialAppear$),
    scan(
      (acc, [[dialAngle, isScheduling], dialAppear]) => {
        if (!isScheduling) {
          return { angle: -1, activeId: 0 };
        }
        const angle = !dialAppear ? 0 : dialAngle;
        acc.activeId = Math.floor(angle / 72);
        if (acc.angle === -1) {
          acc.angle = angle;
        }
        return { ...acc };
      },
      { angle: -1, activeId: 0 }
    ),
    connectDialSchedule()
  )
);

export const appliances = [
  'DishWasher',
  'DryerMachine',
  'WashingMachine',
  'Oven',
  'Cancle',
];

// export const applianceSchedule$ = buttonClicked$.pipe(
//   withLatestFrom(dialSchedule$),
//   map(([, value]) => value),
//   tap(({ activeId, angle }) => {
//     if (activeId !== 4) {
//       const [strHour, strMinute] = angleToTime(angle).split(':');
//       const hour = parseInt(strHour);
//       const minute = parseInt(strMinute);
//       const time_start = new Date();
//       const time_end = new Date();
//       time_start.setHours(hour, minute);
//       time_end.setHours(hour, minute + 30);

//       onAddScheduleAppliance({
//         device_type: appliances[activeId] as DeviceType,
//         time_start,
//         time_end,
//         power_consumption: 500,
//         size: 1,
//       });
//     }
//     setDialAngleChange(angle);
//     onStopScheduling();
//   }),
//   map(() => EMPTY)
// );
