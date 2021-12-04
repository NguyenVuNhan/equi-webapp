import { IAppliance } from '@virtue-equi/shared/interfaces';

export const scheduled_item_data: IAppliance[] = [
  {
    id: 1,
    device_type: 'DishWasher',
    time_start: new Date('2020-09-23T07:10:53'),
    time_end: new Date('2020-09-23T07:20:53'),
    power_consumption: 2100,
    size: 1,
  },
  {
    id: 2,
    device_type: 'WashingMachine',
    time_start: new Date('2020-09-23T19:10:53'),
    time_end: new Date('2020-09-23T20:40:53'),
    power_consumption: 3000,
    size: 1,
  },
];

export const general_energy_data = {
  current: {
    total_solar_production: 605,
    total_consumption: 0,
    battery_level: 12,
  },
};
