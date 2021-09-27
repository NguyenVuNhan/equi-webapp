export type BatteryStatus = 'idle' | 'charging' | 'discharging';

export interface EnphaseBattery {
  percent: number;
  status: BatteryStatus;
}

export const getBatteryStatus = async (): Promise<EnphaseBattery | false> => {
  const res = await fetch('/api/enphase/battery');
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};
