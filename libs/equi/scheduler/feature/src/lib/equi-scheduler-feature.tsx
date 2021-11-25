import { setDialAngleChange } from '@virtue-equi/equi-shared-features';
import {
  Appliance,
  AppliancePowerConsumption,
  ApplianceSchedule,
  BatteryLevel,
  DialCursor,
  DialTimeText,
  Polar,
  PowerConsumption,
  PowerProduction,
} from '@virtue-equi/equi/scheduler/ui';
import { IAppliance } from '@virtue-equi/shared/interfaces';
import { useEffect, useState } from 'react';
import {
  batteryLevel,
  energyConsumption,
  energyProduction,
  general_energy_data,
  scheduled_item_data,
} from './dataMock'; // TODO: replace with real data

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

      <Polar name="energy_production" stroke="#75C7CC" data={energyProduction}>
        <stop offset="0.391621" stopColor="#75C7CC" />
        <stop offset="1" stopColor="#75C7CC" stopOpacity="0" />
      </Polar>
      <Polar
        name="energy_consumption"
        stroke="#F4E696"
        data={energyConsumption}
      >
        <stop offset="0.395478" stopColor="#F4E696" />
        <stop offset="0.732477" stopColor="#F4E696" stopOpacity="0" />
      </Polar>
      <Polar
        name="battery_level"
        data={batteryLevel}
        strokeDasharray="7"
        stroke="#B3D898"
      />
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
          <BatteryLevel
            y={80}
            batteryLevel={general_energy_data.current.battery_level}
          />
          <PowerConsumption
            y={160}
            totalConsumption={general_energy_data.current.total_consumption}
          />
          <PowerProduction
            y={240}
            totalProduction={general_energy_data.current.total_solar_production}
          />
        </>
      )}
    </g>
  );
}

export default Scheduler;
