import { BatteryWave, BatteryBubble } from '@virtue-equi/equi/standby/ui';
import { useState } from 'react';

import './standby.css';

// TODO: Change this to real data
const batteryLevel = 60;
const powerProduction = 1000;
const powerConsumption = 500;

/* eslint-disable-next-line */
export interface StandbyProps {}

export function Standby(props: StandbyProps) {
  const [battery, setBattery] = useState(batteryLevel);

  return (
    <g>
      <BatteryWave battery={battery} />

      {/* Battery level controller */}
      <circle
        cx={40}
        cy={40}
        r={40}
        fill="green"
        onClick={() =>
          setBattery((battery) => (battery >= 100 ? battery : battery + 5))
        }
      />
      <circle
        cx={150}
        cy={40}
        r={40}
        fill="red"
        onClick={() =>
          setBattery((battery) => (battery < 0 ? battery : battery - 5))
        }
      />

      <BatteryBubble isConsuming={false} />
    </g>
  );
}

export default Standby;
