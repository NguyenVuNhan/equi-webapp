import React, { useEffect, useState } from "react";
import Icon from "../../../components/Icon";
import { deviceTypeToIcon } from "../../../helpers";

const Appliance = ({ x, y, r, active }) => {
  const [iconRadius, setIconRadius] = useState(r + 1);

  useEffect(() => {
    active && setIconRadius(r - 3);
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
      <Icon
        name={deviceTypeToIcon("Dishwasher") + "2"}
        width={iconRadius * 2}
        height={iconRadius * 2}
        fill="#e5e5e5"
        style={{
          transform: `translateX(${x - iconRadius}px) translateY(${
            y - iconRadius
          }px)`,
        }}
      />
    </>
  );
};

export default Appliance;
