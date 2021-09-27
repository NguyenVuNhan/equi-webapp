export const angleToTime = (angle: number) => {
  const t = (angle * 24 * 60) / 360;
  const hour = Math.floor(t / 60)
    .toString()
    .padStart(2, '0');
  const min = Math.floor(t % 60)
    .toString()
    .padStart(2, '0');
  return hour + ':' + min;
};
