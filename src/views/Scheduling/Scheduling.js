import React from "react";
import Polar from "../../components/Polar";
import Appliance from "./components/Appliance";
import BatteryLevel from "./components/BatteryLevel";
import PowerConsumption from "./components/PowerConsumption";
import PowerProduction from "./components/PowerProduction";
import { energyConsumption, energyProduction, batteryLevel } from "./dataMock";

const Scheduling = () => {
  const currentBatteryLevel = "12%";
  const currentPowerConsumption = "0W";
  const currentPowerProduction = "605W";

  return (
    <g>
      <Polar name="energy_production" data={energyProduction}>
        <stop offset="0.391621" stopColor="#75C7CC" />
        <stop offset="1" stopColor="#75C7CC" stopOpacity="0" />
      </Polar>

      <Polar name="energy_consumption" data={energyConsumption}>
        <stop offset="0.395478" stopColor="#F4E696" />
        <stop offset="0.732477" stopColor="#F4E696" stopOpacity="0" />
      </Polar>

      <Polar
        name="battery_level"
        data={batteryLevel}
        strokeDasharray="7"
        stroke="#B3D898"
      />

      <Appliance name="DishWasherIcon" pos={300} />
      <Appliance name="WashingMachineIcon" pos={45} />

      <BatteryLevel batteryLevel={currentBatteryLevel} />
      <PowerConsumption powerConsumption={currentPowerConsumption} />
      <PowerProduction powerProduction={currentPowerProduction} />
    </g>
  );
};

export default Scheduling;
