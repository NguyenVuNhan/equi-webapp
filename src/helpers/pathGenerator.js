const smoothing = 0.2;

const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const controlPoint = (current, previous, next, reverse) => {
  const p = previous || current;
  const n = next || current;

  const o = line(p, n);

  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;

  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

const bezierCommand = (point, i, a) => {
  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point);

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
};

const svgPath = (points, command) => {
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a)}`,
    ""
  );
  return d;
};

export const pathGenerator = (data) => {
  let path = [[540, 540 - data[0]]];

  for (let i = 1; i < 288; i += 1) {
    const hypotenuse = data[i];
    const angle = (i * 1.25 * Math.PI) / 180;
    let x = 540,
      y = 540;

    switch (i * 1.25) {
      case 90:
        x += hypotenuse;
        break;
      case 180:
        y += hypotenuse;
        break;
      case 270:
        x -= hypotenuse;
        break;
      default:
        x += Math.sin(angle) * hypotenuse;
        y -= Math.cos(angle) * hypotenuse;
        break;
    }

    path.push([x, y]);
  }

  return svgPath(path, bezierCommand) + " Z";
};
