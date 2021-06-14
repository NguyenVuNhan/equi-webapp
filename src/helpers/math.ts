export const calcAngle = (opposite: number, adjacent: number) => {
  return (Math.atan(Math.abs(opposite) / Math.abs(adjacent)) * 180) / Math.PI;
};
