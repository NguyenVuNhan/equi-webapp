export type BatteryStatus = 'idle' | 'charging' | 'discharging';

export interface EnphaseBattery {
  percent: number;
  status: BatteryStatus;
}
export interface EnphasePowerStatus {
  consumption: number;
  production: number;
  battery: EnphaseBattery;
}
export const getPowerStatus = async (): Promise<EnphasePowerStatus | false> => {
  const res = await fetch(
    `${process.env.NX_LIBRIUM_URL}/api/enphase/power-status`
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};

export interface EnphaseSeries {
  battery: number[];
  consumption: number[];
  production: number[];
}
export const getEnphaseSeries = async (): Promise<EnphaseSeries | false> => {
  const res = await fetch(`${process.env.NX_LIBRIUM_URL}/api/enphase/series`);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};
