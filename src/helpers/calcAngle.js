export const calcAngle = (opposite, adjacent) => {
  return (Math.atan(Math.abs(opposite) / Math.abs(adjacent)) * 180) / Math.PI;
};
