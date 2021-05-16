import { useEffect, useState } from "react";
import { ApplianceBall, deviceTypeToIcon } from "helpers";

export interface ApplianceProps extends ApplianceBall {
  active: boolean;
}

function Appliance(props: ApplianceProps) {
  const { x, y, r, active } = props;

  const [iconRadius, setIconRadius] = useState(r + 1);

  useEffect(() => {
    active ? setIconRadius(r - 3) : setIconRadius(r + 1);
  }, [active, r]);

  return (
    <>
      {active && (
        <circle
          cx={x}
          cy={y}
          r={r}
          fill="none"
          stroke="white"
          strokeWidth="6"
        />
      )}

      <image
        href={`${process.env.PUBLIC_URL}/assets/${deviceTypeToIcon(
          "Dishwasher"
        )}2.svg`}
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
