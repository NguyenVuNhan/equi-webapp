const devices = {
  Audio: 'AudioIcon.svg',
  BigFridge: 'BigFridgeIcon.svg',
  DishWasher: 'DishWasherIcon.svg',
  WashingMachine: 'WashingMachineIcon.svg',
  CoffeeMachine: 'CoffeeMachineIcon.svg',
  Completed: 'CompletedIcon.svg',
  DryerMachine: 'DryerMachineIcon.svg',
  ExtractorHood: 'ExtractorHoodIcon.svg',
  FloorHeating: 'FloorHeatingIcon.svg',
  InductionTop: 'InductionTopIcon.svg',
  Oven: 'OvenIcon.svg',
  SmallFridge: 'SmallFridgeIcon.svg',
  TeeKettle: 'TeeKettleIcon.svg',
  Television: 'TelevisionIcon.svg',
  WallOutlet: 'WallOutletIcon.svg',
  AddDishWasher: 'AddDishWasher.svg',
  AddDryerMachine: 'AddDryerMachine.svg',
  AddWashingMachine: 'AddWashingMachine.svg',
  AddOven: 'AddOven.svg',
  AddCancle: 'AddCancle.svg',
  BlurDishWasher: 'BlurDishWasher.svg',
  BlurDryerMachine: 'BlurDryerMachine.svg',
  BlurWashingMachine: 'BlurWashingMachine.svg',
  BlurOven: 'BlurOven.svg',
  BlurCancle: 'BlurCancle.svg',
};

export type DeviceType = keyof typeof devices;

export const getDeviceIcon = (device: DeviceType) => {
  const prefix = process.env.NX_EQUI_BASENAME;
  return (prefix ? `/${prefix}` : '') + '/assets/' + devices[device];
};
