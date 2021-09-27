import { BaseResponse } from '@virtue-equi/equi/shared/utils/types';

export interface EnphaseBattery {
  percent: number;
  status: number;
}

export const getBatteryStatus = async (): Promise<
  BaseResponse<EnphaseBattery> | false
> => {
  const data = await fetch('/batery/percentage');
  if (data.ok) {
    return data.json();
  }
  return false;
};
