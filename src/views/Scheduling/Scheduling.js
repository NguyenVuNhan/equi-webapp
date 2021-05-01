import React, { useState } from "react";
import DialTimeText from "../../components/DialTimeText";
import Polar from "../../components/Polar";
import Appliance from "./components/Appliance";
import AppliancePowerConsumption from "./components/AppliancePowerConsumption";
import ApplianceSchedule from "./components/ApplianceSchedule";
import BatteryLevel from "./components/BatteryLevel";
import PowerConsumption from "./components/PowerConsumption";
import PowerProduction from "./components/PowerProduction";
import {
  energyConsumption,
  energyProduction,
  batteryLevel,
  general_energy_data,
  scheduled_item_data,
} from "./dataMock";

const Scheduling = () => {
  const [appliance, setAppliance] = useState();

  return (
    <g>
      <DialTimeText />

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
      {scheduled_item_data.map((item, id) => (
        <Appliance
          key={id}
          appliance={item}
          onActive={setAppliance}
          onLeave={setAppliance}
        />
      ))}

      <path
        mask="url(#mask0)"
        d="M540 540 505 0 0 0 0 540 Z"
        fill="url(#linearColors1)"
      />

      <linearGradient id="linearColors1" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0"></stop>
        <stop offset="50%" stopColor="black" stopOpacity="0"></stop>
        <stop offset="60%" stopColor="black" stopOpacity="0.4"></stop>
        <stop offset="100%" stopColor="black" stopOpacity="0.85"></stop>
      </linearGradient>

      {/* <Appliance name="WashingMachineIcon" pos={45} /> */}
      {appliance ? (
        <>
          <AppliancePowerConsumption
            powerConsumption={appliance.power_consumption + " kWh"}
          />
          <ApplianceSchedule startTime={appliance.time_start} />
        </>
      ) : (
        <>
          <BatteryLevel
            batteryLevel={general_energy_data.current.battery_level + " %"}
          />
          <PowerConsumption
            powerConsumption={
              general_energy_data.current.total_consumption + " W"
            }
          />
          <PowerProduction
            powerProduction={
              general_energy_data.current.total_solar_production + " W"
            }
          />
        </>
      )}
    </g>
  );
};

export default Scheduling;
