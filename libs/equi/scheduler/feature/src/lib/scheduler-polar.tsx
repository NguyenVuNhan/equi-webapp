import { useEnphaseSeries } from '@virtue-equi/equi-shared-features';
import { Polar } from '@virtue-equi/equi/scheduler/ui';

const SchedulerPolar = () => {
  const { battery, production, consumption } = useEnphaseSeries();
  console.log(consumption);

  return (
    <>
      <Polar name="energy_production" stroke="#75C7CC" data={production}>
        <stop offset="0.391621" stopColor="#75C7CC" />
        <stop offset="1" stopColor="#75C7CC" stopOpacity="0" />
      </Polar>
      <Polar name="energy_consumption" stroke="#F4E696" data={consumption}>
        <stop offset="0.395478" stopColor="#F4E696" />
        <stop offset="0.732477" stopColor="#F4E696" stopOpacity="0" />
      </Polar>
      <Polar
        name="battery_level"
        data={battery}
        strokeDasharray="7"
        stroke="#B3D898"
      />
    </>
  );
};

export default SchedulerPolar;
