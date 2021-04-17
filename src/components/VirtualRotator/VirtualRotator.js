import React, { useContext, useState } from "react";
import { AppStateContext } from "../../app/App.context";
import { calcAngle } from "../../helpers";

const VirtualRotator = () => {
  const { dialPosition, setDialPosition } = useContext(AppStateContext);
  const circumference = Math.PI * (200 * 2);
  const [mouseInside, setMouseInside] = useState(false);

  const onMouseMove = (ev) => {
    if (mouseInside && (ev.buttons ?? ev.which) === 1) {
      const rect = ev.target.getBoundingClientRect();
      const cx = rect.height / 2;
      const cy = rect.width / 2;
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      const dx = x - cx;
      const dy = cy - y;

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

      setDialPosition(angle);
    }
  };

  return (
    <circle
      onMouseMove={onMouseMove}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
      r={200}
      cx="540"
      cy="540"
      fill="black"
      stroke="#ce4b99"
      strokeWidth="20"
      transform={`rotate(${-100 + dialPosition} 540 540)`}
      strokeDasharray={`${circumference}`}
      strokeDashoffset={`${circumference * (1 - 5 / 100)}`}
      strokeLinecap="round"
    />
  );
};

export default VirtualRotator;
