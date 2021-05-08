import React, { useContext, useEffect, useRef, useState } from "react";
import { AppStateContext } from "../../app/App.context";
import { arrangeAppliances } from "../../helpers";
import Appliance from "./components/Appliance";
import AppliancePower from "./components/AppliancePower";
import { appliances } from "./mockData";

const Appliances = () => {
  const [balls, setBalls] = useState([]);
  const { dialPosition, setDialPosition } = useContext(AppStateContext);
  const [active, setActive] = useState(0);
  const pDialPosition = useRef(0);

  useEffect(() => {
    const b = arrangeAppliances(appliances);
    setBalls(b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const diff = dialPosition - pDialPosition.current;
    if (Math.abs(diff) > 20) {
      let newActive = active + (diff > 0 ? 1 : -1);
      newActive =
        newActive < 0
          ? 0
          : newActive < balls.length
          ? newActive
          : balls.length - 1;

      pDialPosition.current = dialPosition;
      setActive(newActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialPosition]);

  return (
    <g>
      <AppliancePower
        powerConsumption={appliances[active].power_consumption + " kWh"}
      />
      {balls.map(({ x, y, r }, i) => (
        <Appliance
          key={i}
          x={540 + x}
          y={540 - y}
          r={r + 0.5}
          active={active === i}
        />
      ))}
    </g>
  );
};

export default Appliances;
