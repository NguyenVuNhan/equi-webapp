import { DeviceType } from '@virtue-equi/equi/shared/utils/helper';

export interface IAppliance {
  id: number;
  power_consumption: number;
  time_start: Date;
  time_end: Date;
  device_type: DeviceType;
  size: number;
}
