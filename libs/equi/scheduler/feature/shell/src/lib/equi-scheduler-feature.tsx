import { Subscribe } from '@react-rxjs/core';
import { setDialAngleChange } from '@virtue-equi/equi-shared-features';
import {
  applianceSchedule$,
  onScheduleAppliance,
  setActiveAppliance,
  setScheduleAppliance,
  useActiveAppliance,
  useIsScheduling,
} from '@virtue-equi/equi/scheduler/feature/appliance-state';
import {
  Appliance,
  AppliancePowerConsumption,
  ApplianceSchedule,
  BatteryLevel,
  DialCursor,
  DialSchedule,
  DialTimeText,
  PowerConsumption,
  PowerProduction,
} from '@virtue-equi/equi/scheduler/ui';
import { memo, useLayoutEffect } from 'react';
// TODO: replace with real data
import { scheduled_item_data } from '@virtue-equi/equi/scheduler/utils';
import SchedulerPolar from './scheduler-polar';

/* eslint-disable-next-line */
export interface SchedulerProps {}

const Appliances = memo(() => (
  <Subscribe source$={onScheduleAppliance}>
    {scheduled_item_data.map((item, id) => (
      <Appliance key={id} appliance={item} />
    ))}
  </Subscribe>
));

export function Scheduler(props: SchedulerProps) {
  const appliance = useActiveAppliance();
  const isScheduling = useIsScheduling();

  useLayoutEffect(() => {
    setDialAngleChange(0);
    return () => {
      setScheduleAppliance(null);
      setActiveAppliance(null);
    };
  }, []);

  return (
    <g>
      {!isScheduling && <DialCursor />}
      <g
        style={{
          filter: isScheduling ? 'blur(3px)' : undefined,
        }}
      >
        <SchedulerPolar />
        <Appliances />

        <path
          mask="url(#mask0)"
          d="M540 540 505 0 0 0 0 540 Z"
          fill="url(#linearColors1)"
        />

        <linearGradient id="linearColors1" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="black" stopOpacity="0"></stop>
          <stop offset="50%" stopColor="black" stopOpacity="0"></stop>
          <stop offset="60%" stopColor="black" stopOpacity="0.4"></stop>
          <stop offset="100%" stopColor="black" stopOpacity="0.85"></stop>
        </linearGradient>

        {appliance ? (
          <>
            <AppliancePowerConsumption
              powerConsumption={appliance.power_consumption}
            />
            <ApplianceSchedule y={220} timeStart={appliance.time_start} />
          </>
        ) : (
          <>
            <BatteryLevel y={80} />
            <PowerConsumption y={160} />
            <PowerProduction y={240} />
          </>
        )}
      </g>

      <DialTimeText />
      {isScheduling && (
        <Subscribe source$={applianceSchedule$}>
          <DialSchedule />
        </Subscribe>
      )}
    </g>
  );
}

export default Scheduler;
