export const dateToAngle = (date: Date | string) => {
  const currDate = new Date();
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const currentTime = currDate.getHours() * 60 + currDate.getMinutes();
  const dateTime = date.getHours() * 60 + date.getMinutes();
  const absHour = Math.abs(currDate.getHours() - date.getHours());
  const absMinutes = Math.abs(currDate.getMinutes() - date.getMinutes());
  const absAngle = (absHour * 60 + absMinutes) * 0.25;

  return currentTime > dateTime ? 360 - absAngle : absAngle;
};
