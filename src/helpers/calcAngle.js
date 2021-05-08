export const calcAngle = (opposite, adjacent) => {
  return (Math.atan(Math.abs(opposite) / Math.abs(adjacent)) * 180) / Math.PI;
};

export const angleToTime = (angle, active = false) => {
  if (active) {
    const t = (angle * 24 * 60) / 360;
    const hour = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const min = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return hour + ":" + min;
  }
  var now = new Date("04 Dec 1995 01:12:00 GMT");
  return (
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0")
  );
};
