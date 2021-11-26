import { useBatteryStatus } from '@virtue-equi/equi-shared-features';
import { BatteryBubble, BatteryWave } from '@virtue-equi/equi/standby/ui';
import './standby.css';

export function Standby() {
  const { percent, status } = useBatteryStatus();

  return (
    <g>
      <BatteryWave battery={percent} />
      <BatteryBubble isConsuming={status !== 'charging'} />
    </g>
  );
}

export default Standby;
