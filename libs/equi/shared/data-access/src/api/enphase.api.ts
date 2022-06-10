export type BatteryStatus = 'idle' | 'charging' | 'discharging';

const getData = async <T>(url: string): Promise<T | false> => {
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return false;
};

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
  return getData<EnphasePowerStatus>(
    `${process.env.NX_LIBRIUM_URL}/api/enphase/power-status`
  );
};

export interface EnphaseSeries {
  battery: number[];
  consumption: number[];
  production: number[];
}
export const getEnphaseSeries = async (): Promise<EnphaseSeries | false> => {
  return getData<EnphaseSeries>(
    `${process.env.NX_LIBRIUM_URL}/api/enphase/series`
  );
};

export type TAppliance = string;
export interface IScheduledAppliance {
  appliance: TAppliance;
  time: `${number}:${number}`;
}
export const getScheduledAppliance = async (): Promise<
  IScheduledAppliance[] | false
> => {
  if (process.env.NX_GET_SCHEDULER_URL) {
    console.log('fetching');
    const res = await fetch(process.env.NX_GET_SCHEDULER_URL);
    await fetch('http://64.225.81.130:8080/default/virtue/solarprediction');
    console.log('res:', res.body);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }

    return getData<IScheduledAppliance[]>(process.env.NX_GET_SCHEDULER_URL);
  }
  return false;
};
