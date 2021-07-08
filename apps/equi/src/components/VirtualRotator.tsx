import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RotatorContext } from '@virtue-equi/equi/feature/rotator';
import { calcAngle } from '../helpers';

const VirtualRotator = () => {
  const history = useHistory();
  const { setDialPosition } = useContext(RotatorContext);
  const [mouseInside, setMouseInside] = useState(false);

  const toMenu = () => {
    history.push('/menu');
  };

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

      setDialPosition(angle);
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
      <circle cx="540" cy="540" r="80" fill="gray" onClick={toMenu} />
    </g>
  );
};

export default VirtualRotator;
