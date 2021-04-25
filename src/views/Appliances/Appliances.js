import React, { useEffect, useState } from "react";
import { calcAngle } from "../../helpers";

const tick = 300;
const BOUNCE = 0.5;
const resolveSteps = 5;
const BALL_COUNT = 1;
const GRAVITY = 1.5 / resolveSteps;

const $setOf = (count, fn = (i) => i) => {
  var a = [],
    i = 0;
  while (i < count) {
    a.push(fn(i++));
  }
  return a;
};

const toXY = (d, a) => {
  const x = 540 + Math.sin((a * Math.PI) / 180) * d;
  const y = 540 - Math.cos((a * Math.PI) / 180) * d;
  return [x, y];
};

const toVXY = (va, vd, a, d, x, y) => {
  const dx = x - 540;
  const dy = 540 - y;
  // Get vxy from va
  let vx = dx >= 0 ? va : -va;
  let vy = dy >= 0 ? va : -va;
  // Get vxy from vd
  if (d === 0) return [vx, vy];
  const tvx = Math.asin((a * Math.PI) / 180) * Math.abs(d) ** 2 * d;
  const tvy = Math.acos((a * Math.PI) / 180) * Math.abs(d) ** 2 * d;
  vx = dx >= 0 ? tvx : -tvx;
  vy = dy >= 0 ? -tvy : tvy;
  return [vx, vy];
};

const toDA = (x, y) => {
  const dx = x - 540;
  const dy = 540 - y;
  const d = (dx ** 2 + dy ** 2) ** 0.5;
  let angle = calcAngle(dx, dy) + 0;
  if (dx >= 0 && dy <= 0) {
    angle = calcAngle(dy, dx) + 90;
  } else if (dx <= 0) {
    if (dy <= 0) {
      angle = calcAngle(dx, dy) + 180;
    } else {
      angle = calcAngle(dy, dx) + 270;
    }
  }
  return [d, angle];
};

const toVDA = (vx, vy, x, y) => {
  const dvxy = vx - vy;
  const vd = (vx ** 2 + vy ** 2) ** 0.5;
  // const va =
};

class Ball {
  constructor({ d, a, radius }) {
    // Current po
    this.d = d; // Distance to center
    this.a = a; // Angle
    // Ve
    this.vd = 0.5;
    this.va = -0.5;
    // Previous position
    this.pd = d - this.vd;
    this.pa = a + this.va;
    // Coordinate
    [this.x, this.y] = toXY(d, a);
    // Ball attribute
    this.radius = radius;
    this.mass = 1;
  }

  move() {
    this.vd = this.d - this.pd;
    this.va = this.a - this.pa;
    this.va -= GRAVITY;
    this.pd = this.d;
    this.pa = this.a;
    this.d += this.vd;
    this.a += this.va;
    // Coordinate
    [this.x, this.y] = toXY(this.d, this.a);
    this.checkWall();
  }

  checkWall() {
    const innerDistance = 220 + this.radius;
    const outerDistance = 540 - this.radius;
    if (this.y <= 540) {
      const topLeft = 505 - this.radius;
      const topRight = 575 + this.radius;
      const boundaryAngle =
        90 - (Math.acos((35 + this.radius) / this.d) * 180) / Math.PI;
      if (540 < this.x && this.x < topRight) {
        const away = (this.a - boundaryAngle) * BOUNCE;
        this.a = boundaryAngle - away;
        this.va = Math.abs(this.va) * BOUNCE;
        this.pa = this.a + this.va;
      }
      if (topLeft < this.x && this.x < 540) {
        const away = (this.a - boundaryAngle) * BOUNCE;
        this.a = boundaryAngle + away;
        this.va = -Math.abs(this.va) * BOUNCE;
        this.pa = this.a + this.va;
      }
    }
    if (this.d < innerDistance) {
      const away = (this.d - innerDistance) * BOUNCE;
      this.d = innerDistance + away;
      this.vd = Math.abs(this.vd) * BOUNCE;
      this.pd = this.d - this.vd;
    }
    if (this.d > outerDistance) {
      const away = (this.d - outerDistance) * BOUNCE;
      this.d = outerDistance - away;
      this.vd = -Math.abs(this.vd) * BOUNCE;
      this.pd = this.d - this.vd;
    }
    [this.x, this.y] = toXY(this.d, this.a);
  }

  collisions(balls) {
    var i = 0;
    var b, dd, dx, dy, nx, ny, p, cpx, cpy, px, py;
    let { x, y, a, d, va, vd, radius: r, mass: m } = this;
    let [vx, vy] = toVXY(va, vd, a, d, x, y);
    while (i < balls.length) {
      b = balls[i++];
      if (this !== b) {
        // Find distance between two origin
        const rr = r + b.radius;
        // If collapsed
        if (b.x - rr < x && x < b.x + rr && b.y - rr < y && y < b.y + rr) {
          // get distances
          dx = x - b.x;
          dy = y - b.y;
          dd = (dx * dx + dy * dy) ** 0.5;
          // If distance is smaller than minimum distance
          if (dd < rr) {
            nx = (b.x - x) / dd;
            ny = (b.y - y) / dd;
            p = (2 * ((vx - b.vx) * nx + (vy - b.vy) * ny)) / (m + b.mass);
            cpx = (x * b.radius + b.x * r) / rr;
            cpy = (y * b.radius + b.y * r) / rr;
            x = cpx + (r * (x - b.x)) / dd;
            y = cpy + (r * (y - b.y)) / dd;
            b.x = cpx + (b.radius * (b.x - x)) / dd;
            b.y = cpy + (b.radius * (b.y - y)) / dd;
            px = x - (vx -= p * b.mass * nx);
            py = y - (vy -= p * b.mass * ny);
            b.px = b.x - (b.vx += p * m * nx);
            b.py = b.y - (b.vy += p * m * ny);
          }
        }
      }
    }
    this.x = x;
    this.y = y;
    [this.d, this.a] = toDA(x, y);
    [this.pd, this.pa] = toDA(px, py);
    this.checkWall();
  }
}

const Appliances = () => {
  const [balls, setBalls] = useState(
    $setOf(BALL_COUNT, () => {
      const BALL_RADIUS = Math.floor(Math.random() * (60 - 19)) + 20;
      return new Ball({
        d: Math.random() * (540 - BALL_RADIUS * 2 - 220) + BALL_RADIUS + 220,
        a: Math.random() * (350 - 20) + 20,
        radius: BALL_RADIUS,
      });
    })
  );

  useEffect(() => {
    const id = setInterval(() => {
      var i = 0,
        j = resolveSteps;

      while (i < balls.length) {
        balls[i++].move();
      }

      while (j--) {
        i = 0;
        while (i < balls.length) {
          balls[i++].collisions(balls);
        }
      }

      setBalls([...balls]);
    }, tick);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g>
      {balls.map((ball, i) => (
        <circle
          key={i}
          cx={ball.x}
          cy={ball.y}
          r={ball.radius}
          fill="blue"
          stroke="white"
          strokeWidth="3"
        />
      ))}
    </g>
  );
};

export default Appliances;
