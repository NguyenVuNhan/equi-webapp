import React, { useEffect, useState } from "react";

const tick = 50;
const BOUNCE = 0.1;
const resolveSteps = 5;
const BALL_COUNT = 20;
const GRAVITY = 1.5 / resolveSteps;
const W = 1080;
const H = 1080;

const smallNumber = 0.1;

const $setOf = (count, fn = (i) => i) => {
  var a = [],
    i = 0;
  while (i < count) {
    a.push(fn(i++));
  }
  return a;
};

class Ball {
  constructor({ x, y, vx, vy, radius }) {
    this.x = x;
    this.y = y;
    this.px = x - vx;
    this.py = y - vy;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.mass = radius;
  }

  move() {
    this.vx = this.x - this.px;
    this.vy = this.y - this.py;
    this.vy += GRAVITY;
    this.px = this.x;
    this.py = this.y;
    this.x += this.vx;
    this.y += this.vy;
    this.checkWall();
  }

  checkWall() {
    const ball = this;
    const top = ball.radius;
    const left = ball.radius;
    const bottom = H - ball.radius;
    const right = W - ball.radius;
    const rr = ball.getR();
    const outerDistance = 540 - this.radius;
    if (rr > outerDistance) {
      const dx = ball.x - 540;
      const dy = 540 - ball.y;
      const xCoefficient = dx >= 0 ? 1 : -1;
      const yCoefficient = dy >= 0 ? 1 : -1;
      const xBoundary = 540 + (outerDistance / rr) * dx;
      const yBoundary = 540 + yCoefficient * (outerDistance / rr) * dy;
      const xAway = (this.x - xBoundary) * BOUNCE;
      const yAway = (this.y - yBoundary) * BOUNCE;
      ball.x = xBoundary - xAway * xCoefficient;
      ball.y = yBoundary - yAway * yCoefficient;
      ball.vx = Math.abs(ball.vx) * BOUNCE * xCoefficient;
      ball.vy += Math.abs(ball.vy) * BOUNCE * yCoefficient;
      ball.px = ball.x - ball.vx;
      ball.py = ball.y - ball.vy;
    } else if (false) {
      if (ball.x > right) {
        const away = (ball.x - right) * BOUNCE;
        ball.x = right - away;
        ball.vx = -Math.abs(ball.vx) * BOUNCE;
        ball.px = ball.x - ball.vx;
      } else if (ball.x < left) {
        const away = (ball.x - left) * BOUNCE;
        ball.x = left + away;
        ball.vx = Math.abs(ball.vx) * BOUNCE;
        ball.px = ball.x - ball.vx;
      }
      if (ball.y > bottom) {
        const away = (ball.y - bottom) * BOUNCE;
        ball.y = bottom - away;
        ball.vy = -Math.abs(ball.vy) * BOUNCE;
        ball.py = ball.y - ball.vy;
      } else if (ball.y < top) {
        const away = (ball.y - top) * BOUNCE;
        ball.y = top + away;
        ball.vy = Math.abs(ball.vy) * BOUNCE;
        ball.py = ball.y - ball.vy;
      }
    }

    // If the changes are too small then no change needed
    if (this.vx < smallNumber) this.vx = 0;
    if (this.vy < smallNumber) this.vy = 0;
  }

  getR() {
    const dx = this.x - 540;
    const dy = 540 - this.y;
    return (dx ** 2 + dy ** 2) ** 0.5;
  }

  collisions(balls) {
    var b,
      dx,
      dy,
      nx,
      ny,
      cpx,
      cpy,
      p,
      d,
      i = 0;
    var { x, y, vx, vy, px, py, radius: r, mass: m } = this;
    while (i < balls.length) {
      b = balls[i++];
      if (this !== b) {
        const rr = r + b.radius;
        if (x + rr > b.x && x < b.x + rr && y + rr > b.y && y < b.y + rr) {
          dx = x - b.x;
          dy = y - b.y;
          d = (dx * dx + dy * dy) ** 0.5;
          if (d < rr) {
            nx = (b.x - x) / d;
            ny = (b.y - y) / d;
            p =
              (2 * (vx * nx + vy * ny - b.vx * nx - b.vy * ny)) / (m + b.mass);
            cpx = (x * b.radius + b.x * r) / rr;
            cpy = (y * b.radius + b.y * r) / rr;
            x = cpx + (r * (x - b.x)) / d;
            y = cpy + (r * (y - b.y)) / d;
            b.x = cpx + (b.radius * (b.x - x)) / d;
            b.y = cpy + (b.radius * (b.y - y)) / d;
            px = x - (vx -= p * b.mass * nx);
            py = y - (vy -= p * b.mass * ny);
            b.px = b.x - (b.vx += p * m * nx);
            b.py = b.y - (b.vy += p * m * ny);
            if (b.radius === 220) {
              b.x = 540;
              b.y = 540;
              b.px = 540;
              b.py = 540;
            }
          }
        }
      }
    }
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.vx = vx;
    this.vy = vy;
    this.checkWall();
  }
}

const Appliances = () => {
  const [balls, setBalls] = useState([
    ...$setOf(BALL_COUNT, () => {
      const BALL_RADIUS = Math.floor(Math.random() * (120 - 19)) + 20;
      return new Ball({
        x: Math.random() * (W - BALL_RADIUS * 2) + BALL_RADIUS,
        y: Math.random() * (H - BALL_RADIUS * 2) + BALL_RADIUS,
        vx: Math.random(),
        vy: Math.random(),
        radius: BALL_RADIUS,
      });
    }),
    new Ball({ x: 540, y: 540, vx: 0, vy: 0, radius: 220 }),
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      var i = 0,
        j = resolveSteps;

      while (i < balls.length) {
        const b = balls[i++];
        if (b.radius !== 220) b.move();
      }

      while (j--) {
        i = 0;
        while (i < balls.length) {
          const b = balls[i++];
          if (b.radius !== 220) b.collisions(balls);
        }
      }

      setBalls([...balls]);
    }, tick);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g>
      {balls.map((ball, i) => {
        // const dx = ball.x - 540;
        // const dy = 540 - ball.y;
        // const r = (dx ** 2 + dy ** 2) ** 0.5;
        // const a = Math.atan(dy / dx);
        // const x = 540 + Math.sin((a * Math.PI) / 180) * r;
        // const y = 540 - Math.cos((a * Math.PI) / 180) * r;
        const x = ball.x;
        const y = ball.y;
        if (balls.radius === 220) return null;
        return <circle key={i} cx={x} cy={y} r={ball.radius} fill="blue" />;
      })}
    </g>
  );
};

export default Appliances;
