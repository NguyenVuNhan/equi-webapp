export const gradientMapper = (
  start_color: string,
  end_color: string,
  percent: number
) => {
  // strip the leading # if it's there
  start_color = start_color.replace(/^\s*#|\s*$/g, '');
  end_color = end_color.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (start_color.length === 3) {
    start_color = start_color.replace(/(.)/g, '$1$1');
  }

  if (end_color.length === 3) {
    end_color = end_color.replace(/(.)/g, '$1$1');
  }

  // get colors
  const start_red = parseInt(start_color.substr(0, 2), 16),
    start_green = parseInt(start_color.substr(2, 2), 16),
    start_blue = parseInt(start_color.substr(4, 2), 16);

  const end_red = parseInt(end_color.substr(0, 2), 16),
    end_green = parseInt(end_color.substr(2, 2), 16),
    end_blue = parseInt(end_color.substr(4, 2), 16);

  // calculate new color
  let diff_red: number | string = end_red - start_red;
  let diff_green: number | string = end_green - start_green;
  let diff_blue: number | string = end_blue - start_blue;

  diff_red = (diff_red * percent + start_red).toString(16).split('.')[0];
  diff_green = (diff_green * percent + start_green).toString(16).split('.')[0];
  diff_blue = (diff_blue * percent + start_blue).toString(16).split('.')[0];

  // ensure 2 digits by color
  if (diff_red.length === 1) diff_red = '0' + diff_red;
  if (diff_green.length === 1) diff_green = '0' + diff_green;
  if (diff_blue.length === 1) diff_blue = '0' + diff_blue;

  return '#' + diff_red + diff_green + diff_blue;
};

export const deviceTypeToIcon = (device: string) => {
  switch (device) {
    case 'Audio':
      return 'AudioIcon';
    case 'Big Fridge':
      return 'BigFridgeIcon';
    case 'Dishwasher':
      return 'DishWasherIcon';
    case 'Washing Machine':
      return 'WashingMachineIcon';
    case 'Coffee Machine':
      return 'CoffeeMachineIcon';
    case 'Completed':
      return 'CompletedIcon';
    case 'Dryer Machine':
      return 'DryerMachineIcon';
    case 'Extractor Hood':
      return 'ExtractorHoodIcon';
    case 'Floor Heating':
      return 'FloorHeatingIcon';
    case 'Induction Top':
      return 'InductionTopIcon';
    case 'Oven':
      return 'OvenIcon';
    case 'Small Fridge':
      return 'SmallFridgeIcon';
    case 'Tee Kettle':
      return 'TeeKettleIcon';
    case 'Television':
      return 'TelevisionIcon';
    case 'Wall Outlet':
      return 'WallOutletIcon';
    default:
      throw new Error('Unknown device type');
  }
};

export const dateToAngle = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ((date.getHours() * 60 + date.getMinutes()) * 360) / 1440;
};

export const angleToTime = (angle: number, active = false) => {
  if (active) {
    const t = (angle * 24 * 60) / 360;
    const hour = Math.floor(t / 60)
      .toString()
      .padStart(2, '0');
    const min = Math.floor(t % 60)
      .toString()
      .padStart(2, '0');
    return hour + ':' + min;
  }
  const now = new Date();
  return (
    now.getHours().toString().padStart(2, '0') +
    ':' +
    now.getMinutes().toString().padStart(2, '0')
  );
};

export const TimePrettier = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return time.toLocaleTimeString(navigator.language, options);
};
