import { useState, useEffect } from 'react';
import { getDeviceIcon } from '@virtue-equi/equi/shared/utils/helper';
import { IApplianceBubble } from '@virtue-equi/equi/appliances/utils';

export interface ApplianceBubbleProps extends IApplianceBubble {
  active: boolean;
}

export function ApplianceBubble(props: ApplianceBubbleProps) {
  const { x, y, r, active, type } = props;

  const [iconRadius, setIconRadius] = useState(r + 1);

  useEffect(() => {
    active ? setIconRadius(r - 3) : setIconRadius(r + 1);
  }, [active, r]);

  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="url(#applianceFill)"
        stroke="white"
        strokeWidth={active ? 6 : 0}
      />

      <defs>
        <linearGradient
          id="applianceFill"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75C7CC" />
          <stop offset="1" stopColor="#75C7CC" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <image
        href={getDeviceIcon(type)}
        width={iconRadius * 2}
        height={iconRadius * 2}
        style={{
          transform: `translateX(${x - iconRadius}px) translateY(${
            y - iconRadius
          }px)`,
        }}
      />
    </>
  );
}

export default ApplianceBubble;
