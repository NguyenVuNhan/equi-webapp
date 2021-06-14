import { useEffect, useState } from 'react';
import { ApplianceBall, deviceTypeToIcon } from 'helpers';

export interface ApplianceProps extends ApplianceBall {
  active: boolean;
}

function Appliance(props: ApplianceProps) {
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
        href={`${process.env.PUBLIC_URL}/assets/${deviceTypeToIcon(type)}.svg`}
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

export default Appliance;
