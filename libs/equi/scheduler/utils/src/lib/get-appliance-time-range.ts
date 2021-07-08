import { timePrettier } from './time-prettier';
import { IAppliance } from '@virtue-equi/shared/interfaces';

export const getApplianceTimeRange = (appliance: IAppliance) => {
  const from = timePrettier(appliance.time_start);
  const to = timePrettier(appliance.time_end);

  return from + ' → ' + to;
};
