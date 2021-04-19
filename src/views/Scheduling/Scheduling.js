import React from "react";
import BatteryLevel from "./components/BatteryLevel";
import PowerConsumption from "./components/PowerConsumption";
import PowerProduction from "./components/PowerProduction";

const Scheduling = () => {
  const batteryLevel = "12%";
  const powerConsumption = "0W";
  const powerProduction = "605W";

  return (
    <>
      <BatteryLevel batteryLevel={batteryLevel} />
      <PowerConsumption powerConsumption={powerConsumption} />
      <PowerProduction powerProduction={powerProduction} />
    </>
  );
};

export default Scheduling;
