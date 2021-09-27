export type BatteryStatus = 'idle' | 'charging' | 'discharging';

export interface EnphaseBattery {
  percent: number;
  status: BatteryStatus;
}

export const getBatteryStatus = async (): Promise<EnphaseBattery | false> => {
  const res = await fetch('/batery/percentage');
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};
