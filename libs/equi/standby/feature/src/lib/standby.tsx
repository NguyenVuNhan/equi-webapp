import { usePowerStatus } from '@virtue-equi/equi-shared-features';
import { BatteryBubble, BatteryWave } from '@virtue-equi/equi/standby/ui';
import './standby.css';

export function Standby() {
  const { battery } = usePowerStatus();

  return (
    <g>
      <BatteryWave battery={battery.percent} />
      <BatteryBubble isConsuming={battery.status !== 'charging'} />
    </g>
  );
}

export default Standby;
