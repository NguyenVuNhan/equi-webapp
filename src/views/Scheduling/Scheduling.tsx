import DataBubble from "components/DataBubble";
import { useState } from "react";
import DialTimeText from "../../components/DialTimeText";
import Polar from "../../components/Polar";
import Appliance from "./components/Appliance";
import * as AppliancePowerConsumption from "./components/AppliancePowerConsumption";
import * as ApplianceSchedule from "./components/ApplianceSchedule";
import * as BatteryLevel from "./components/BatteryLevel";
import * as PowerConsumption from "./components/PowerConsumption";
import * as PowerProduction from "./components/PowerProduction";
import {
  batteryLevel,
  energyConsumption,
  energyProduction,
  general_energy_data,
  scheduled_item_data,
} from "./dataMock";
import { TimePrettier } from "helpers";

const Scheduling = () => {
  const [appliance, setAppliance] = useState<Appliance>();

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

      {appliance ? (
        <>
          <DataBubble
            name="AppliancePowerConsumption"
            text={appliance.power_consumption + " kWh"}
            textX={65}
            icon={AppliancePowerConsumption.Icon}
            gradientColor={AppliancePowerConsumption.GradientColor}
          />
          <DataBubble
            name="ApplianceSchedule"
            text={TimePrettier(appliance.time_start)}
            textX={65}
            y={220}
            icon={ApplianceSchedule.Icon}
            gradientColor={ApplianceSchedule.GradientColor}
          />
        </>
      ) : (
        <>
          <DataBubble
            name="BatteryLevel"
            text={general_energy_data.current.battery_level + " %"}
            textX={65}
            y={80}
            icon={BatteryLevel.Icon}
            gradientColor={BatteryLevel.GradientColor}
          />
          <DataBubble
            name="PowerConsumption"
            text={general_energy_data.current.total_consumption + " W"}
            textX={65}
            y={160}
            icon={PowerConsumption.Icon}
            gradientColor={PowerConsumption.GradientColor}
          />
          <DataBubble
            name="PowerProduction"
            text={general_energy_data.current.total_solar_production + " W"}
            textX={65}
            y={240}
            icon={PowerProduction.Icon}
            gradientColor={PowerProduction.GradientColor}
          />
        </>
      )}
    </g>
  );
};

export default Scheduling;
