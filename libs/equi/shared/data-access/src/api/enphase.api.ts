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

export const getTotalProduction = async (): Promise<number | false> => {
  const res = await fetch('/api/enphase/production');
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};

export const getTotalConsumption = async (): Promise<number | false> => {
  const res = await fetch('/api/enphase/consumption');
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};
