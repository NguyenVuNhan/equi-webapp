export const dateToAngle = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return ((date.getHours() * 60 + date.getMinutes()) * 360) / 1440;
};
