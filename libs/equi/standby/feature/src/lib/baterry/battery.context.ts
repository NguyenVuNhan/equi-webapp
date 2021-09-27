import { BatteryStatus } from '@virtue-equi/equi/standby/data-access';
import { createContext } from 'react';

export interface IBatteryContext {
  status: BatteryStatus;
  percent: number;
}

const initial: IBatteryContext = {
  status: 'charging',
  percent: 40,
};

export const BatteryContext = createContext<IBatteryContext>(initial);
