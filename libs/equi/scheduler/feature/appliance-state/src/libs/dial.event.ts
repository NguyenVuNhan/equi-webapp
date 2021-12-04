import {
  angleToTime,
  scheduled_item_data,
} from '@virtue-equi/equi/scheduler/utils';
import { bind } from '@react-rxjs/core';
import {
  buttonClicked$,
  buttonHolded$,
  dialAngle$,
} from '@virtue-equi/equi-shared-features';
import {
  combineLatest,
  EMPTY,
  filter,
  map,
  merge,
  scan,
  tap,
  withLatestFrom,
} from 'rxjs';
import { DeviceType } from '@virtue-equi/equi/shared/utils/helper';

const DIAL_RIGHT_BOUNDARY = 8;
const DIAL_LEFT_BOUNDARY = 352;

export const [useIsScheduling, isScheduling$] = bind(
  merge(
    buttonClicked$.pipe(map(() => false)),
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

const init = {
  angle: -1,
  activeId: 0,
};

export const [useDialSchedule, dialSchedule$] = bind(
  combineLatest([dialAngle$, isScheduling$]).pipe(
    withLatestFrom(dialAppear$),
    map(([[dialAngle, isScheduling], dialAppear]) =>
      !isScheduling || !dialAppear ? 0 : dialAngle
    ),
    scan((acc, curr) => {
      acc.activeId = Math.floor(curr / 72);
      if (acc.angle === -1) {
        acc.angle = curr;
      }
      return { ...acc };
    }, init)
  ),
  init
);

export const appliances = [
  'DishWasher',
  'DryerMachine',
  'WashingMachine',
  'Oven',
  'Cancle',
];

export const applianceSchedule$ = buttonClicked$.pipe(
  withLatestFrom(dialSchedule$),
  map(([, value]) => value),
  tap(({ activeId, angle }) => {
    const [strHour, strMinute] = angleToTime(angle).split(':');
    const hour = parseInt(strHour);
    const minute = parseInt(strMinute);
    const time_start = new Date();
    const time_end = new Date();
    time_start.setHours(hour, minute);
    time_end.setHours(hour, minute + 30);

    scheduled_item_data.push({
      id: scheduled_item_data.length,
      device_type: appliances[activeId] as DeviceType,
      time_start,
      time_end,
      power_consumption: 500,
      size: 1,
    });

    console.log(time_start);
  }),
  map(() => EMPTY)
);
