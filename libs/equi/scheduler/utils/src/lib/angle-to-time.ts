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
