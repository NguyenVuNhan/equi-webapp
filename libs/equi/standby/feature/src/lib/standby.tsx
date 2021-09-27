import { BatteryBubble, BatteryWave } from '@virtue-equi/equi/standby/ui';
import { useContext, useState } from 'react';
import { BatteryContext } from './baterry/battery.context';
import BatteryProvider from './baterry/battery.provider';
import './standby.css';

export function Standby() {
  const { percent, status } = useContext(BatteryContext);

  return (
    <g>
      <BatteryWave battery={percent} />
      <BatteryBubble isConsuming={status !== 'charging'} />
    </g>
  );
}

export default Standby;
