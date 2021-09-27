import { BatteryBubble, BatteryWave } from '@virtue-equi/equi/standby/ui';
import { useContext, useState } from 'react';
import { BatteryContext } from './baterry/battery.context';
import BatteryProvider from './baterry/battery.provider';
import './standby.css';

// TODO: Change this to real data const batteryLevel = 60;

export function Standby() {
  const { percent } = useContext(BatteryContext);

  return (
    <g>
      <BatteryWave battery={percent} />
      <BatteryBubble isConsuming={false} />
    </g>
  );
}

export function StandbyWrapper() {
  return (
    <BatteryProvider>
      <Standby />
    </BatteryProvider>
  );
}

export default StandbyWrapper;
