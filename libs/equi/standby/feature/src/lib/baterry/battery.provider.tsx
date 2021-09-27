import {
  BatteryStatus,
  EnphaseBattery,
  getBatteryStatus,
} from '@virtue-equi/equi/standby/data-access';
import { useInterval } from '@virtue-equi/equi/shared/utils/hooks';
import { ReactNode, useState } from 'react';
import { BatteryContext } from './battery.context';

export interface BatteryProviderProps {
  children: ReactNode;
}

export function BatteryProvider(props: BatteryProviderProps) {
  const { children } = props;
  const [battery, setBattery] = useState<EnphaseBattery>({
    status: 'charging',
    percent: 40,
  });

  useInterval(() => {
    getBatteryStatus().then((value) => {
      value && setBattery(value);
    });
  }, 5000);

  return (
    <BatteryContext.Provider value={battery}>
      {children}
    </BatteryContext.Provider>
  );
}

export default BatteryProvider;
