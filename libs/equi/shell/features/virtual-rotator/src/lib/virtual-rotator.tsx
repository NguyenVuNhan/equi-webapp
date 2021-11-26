import {
  setDialAngleChange,
  useRotatorContext,
} from '@virtue-equi/equi-shared-features';
import { useTimeout } from '@virtue-equi/equi/shared/utils/hooks';
import { calcAngle } from '@virtue-equi/equi/shell/utils';
import React, { useEffect, useRef, useState } from 'react';

// Button timing variables
const DCgap = 250; // max ms between clicks for a double click event
const holdTime = 500; // ms hold period: how long to wait for press+hold event

export function VirtualRotator() {
  const { handleClick } = useRotatorContext();
  const [mouseInside, setMouseInside] = useState(false);
  const [click, setClick] = useState(false);
  const lastMouseDownTime = useRef<number | undefined>();
  const lastMouseUpTime = useRef<number | undefined>();
  const lastClickTimeout = useRef<number | undefined>();

  // Simulate button hold behaviour
  useTimeout(() => handleClick('holdEvent'), holdTime, click);

  // Simulate single and double click behaviour
  useEffect(() => {
    const now = Date.now();
    if (click) {
      lastMouseDownTime.current = now;
    } else if (lastMouseDownTime.current) {
      if (lastMouseUpTime.current && now - lastMouseUpTime.current <= DCgap) {
        handleClick('doubleClickEvent');
        clearTimeout(lastClickTimeout.current);
      } else if (now - lastMouseDownTime.current < holdTime) {
        lastClickTimeout.current = setTimeout(() => {
          handleClick('clickEvent');
          clearTimeout(lastClickTimeout.current);
          lastClickTimeout.current = undefined;
        }, DCgap) as unknown as number;
      }
      lastMouseUpTime.current = now;
    }
  }, [click, handleClick]);

  const onMouseMove: React.MouseEventHandler<SVGCircleElement> = (ev) => {
    if (mouseInside && ev.buttons === 1) {
      const rect = ev.currentTarget.getBoundingClientRect();
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

      setDialAngleChange(angle);
    }
  };

  return (
    <g>
      <circle
        onMouseMove={onMouseMove}
        onMouseEnter={() => setMouseInside(true)}
        onMouseLeave={() => setMouseInside(false)}
        r={200}
        cx="540"
        cy="540"
        fill="black"
      />
      <circle
        cx="540"
        cy="540"
        r="80"
        fill="gray"
        onMouseDown={() => setClick(true)}
        onMouseUp={() => setClick(false)}
      />
    </g>
  );
}

export default VirtualRotator;
