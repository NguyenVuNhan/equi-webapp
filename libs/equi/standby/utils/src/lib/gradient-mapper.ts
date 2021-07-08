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
