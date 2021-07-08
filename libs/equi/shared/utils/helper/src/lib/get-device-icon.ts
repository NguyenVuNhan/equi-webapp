const devices: { [key: string]: string } = {
  Audio: 'AudioIcon.svg',
  'Big Fridge': 'BigFridgeIcon.svg',
  Dishwasher: 'DishWasherIcon.svg',
  'Washing Machine': 'WashingMachineIcon.svg',
  'Coffee Machine': 'CoffeeMachineIcon.svg',
  Completed: 'CompletedIcon.svg',
  'Dryer Machine': 'DryerMachineIcon.svg',
  'Extractor Hood': 'ExtractorHoodIcon.svg',
  'Floor Heating': 'FloorHeatingIcon.svg',
  'Induction Top': 'InductionTopIcon.svg',
  Oven: 'OvenIcon.svg',
  'Small Fridge': 'SmallFridgeIcon.svg',
  'Tee Kettle': 'TeeKettleIcon.svg',
  Television: 'TelevisionIcon.svg',
  'Wall Outlet': 'WallOutletIcon.svg',
};

export const getDeviceIcon = (device: string) => {
  return '/assets/' + devices[device];
};
