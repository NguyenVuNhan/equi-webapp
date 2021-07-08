import { IAppliance } from '@virtue-equi/shared/interfaces';

export interface IApplianceBubble {
  x: number;
  y: number;
  r: number;
  type: string;
}

const isCollision = (curr: IApplianceBubble, balls: IApplianceBubble[]) => {
  let i = 0;
  while (i < balls.length) {
    const ball = balls[i++];
    if (ball !== curr) {
      const dx = ball.x - curr.x;
      const dy = ball.y - curr.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const rr = ball.r + curr.r;
      if (d < rr) {
        return true;
      }
    }
  }
  return false;
};

export const arrangeAppliances = (appliances: IAppliance[]) => {
  const ball = appliances.reduce((acc, curr) => {
    for (let a = 0; a <= 360; a++) {
      for (let d = 540 - curr.size; d >= 210 + curr.size; d--) {
        const angle = (Math.asin((curr.size + 35) / d) * 180) / Math.PI;
        if (a < angle) a = angle;
        else if (a > 360 - angle) continue;

        const x = Math.sin((a * Math.PI) / 180) * d;
        const y = Math.cos((a * Math.PI) / 180) * d;
        if (!isCollision({ x, y, r: curr.size, type: curr.device_type }, acc)) {
          return [...acc, { x, y, r: curr.size, type: curr.device_type }];
        }
      }
    }
    return acc;
  }, [] as IApplianceBubble[]);

  return ball;
};
