import { IAppliance } from '@virtue-equi/shared/interfaces';

const device_type = [
  'Audio',
  'Big Fridge',
  'Coffee Machine',
  'Completed',
  'Dishwasher',
  'Dryer Machine',
  'Extractor Hood',
  'Floor Heating',
  'Induction Top',
  'Oven',
  'Small Fridge',
  'Tee Kettle',
  'Television',
  'Wall Outlet',
  'Washing Machine',
];

export const appliances: IAppliance[] = Array(10)
  .fill(0)
  .map(
    (_, index) =>
      ({
        id: index,
        power_consumption: Math.floor(Math.random() * 1023),
        time_start: new Date(),
        time_end: new Date(),
        device_type:
          device_type[Math.floor(Math.random() * device_type.length)],
        size: Math.random() * 60 + 60,
      } as IAppliance)
  );
