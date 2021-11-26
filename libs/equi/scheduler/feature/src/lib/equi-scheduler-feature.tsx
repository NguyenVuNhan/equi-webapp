import { setDialAngleChange } from '@virtue-equi/equi-shared-features';
import {
  Appliance,
  AppliancePowerConsumption,
  ApplianceSchedule,
  BatteryLevel,
  DialCursor,
  DialTimeText,
  PowerConsumption,
  PowerProduction,
} from '@virtue-equi/equi/scheduler/ui';
import { IAppliance } from '@virtue-equi/shared/interfaces';
import { useEffect, useState } from 'react';
import { scheduled_item_data } from './dataMock'; // TODO: replace with real data
import SchedulerPolar from './scheduler-polar';

/* eslint-disable-next-line */
export interface SchedulerProps {}

export function Scheduler(props: SchedulerProps) {
  const [appliance, setAppliance] = useState<IAppliance>();

  // On initialize, reset the dial position
  useEffect(() => {
    setDialAngleChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g>
      <DialCursor />
      <DialTimeText />
      <SchedulerPolar />
      {scheduled_item_data.map((item, id) => (
        <Appliance
          key={id}
          appliance={item}
          onActive={setAppliance}
          onLeave={setAppliance}
        />
      ))}

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
  );
}

export default Scheduler;
