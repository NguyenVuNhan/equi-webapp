export const angleToTime = (angle: number) => {
  const currentTime = new Date();
  const t = (angle * 24 * 60) / 360;
  const hour = (Math.floor((t + currentTime.getHours()) / 60) % 24)
    .toString()
    .padStart(2, '0');
  const min = Math.floor((t + currentTime.getMinutes()) % 60)
    .toString()
    .padStart(2, '0');
  return hour + ':' + min;
};
