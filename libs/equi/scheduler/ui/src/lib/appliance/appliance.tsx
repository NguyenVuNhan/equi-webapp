import {
  AppliancePosition,
  useApplianceState,
} from '@virtue-equi/equi/scheduler/feature/appliance-state';
import {
  dateToAngle,
  getApplianceTimeRange,
} from '@virtue-equi/equi/scheduler/utils';
import { getDeviceIcon } from '@virtue-equi/equi/shared/utils/helper';
import { IAppliance } from '@virtue-equi/shared/interfaces';
import { useMemo } from 'react';

const threshold = 5;
const defaultSize = 64;
const activeGrow = 64;

export interface ApplianceProps {
  onActive?: (appliance: IAppliance) => void;
  onLeave?: (appliance: undefined) => void;
  appliance: IAppliance;
}

export function Appliance(props: ApplianceProps) {
  const { appliance, onActive, onLeave } = props;
  const initPosition = useMemo<AppliancePosition>(() => {
    const angle = dateToAngle(appliance.time_start);

    return {
      x: 540 + Math.sin((angle * Math.PI) / 180) * 360,
      y: 540 - Math.cos((angle * Math.PI) / 180) * 360,
      angle,
    };
  }, [appliance.time_start]);
  const {
    active,
    position: { x, y, angle },
    radious,
  } = useApplianceState(appliance, initPosition);

  return (
    <g>
      <line
        id="line1"
        x1="540"
        x2="900"
        y1="540"
        y2="540"
        mask="url(#mask0)"
        stroke="#E24C3A"
        transform={`rotate(${-90 + angle} 540 540)`}
        strokeWidth="3"
      />

      <circle
        cx={x + radious}
        cy={y + radious}
        r={radious}
        fill="#E24C3A"
        strokeWidth={active ? 4 : 0}
        stroke="white"
      />

      <image
        href={getDeviceIcon(appliance.device_type)}
        width={radious * 2}
        height={radious * 2}
        style={{
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
      />

      {active && (
        <>
          <text
            x={x + radious}
            y={y + radious * 2 + 25}
            width={radious * 2}
            fontSize="20"
            fontWeight="500"
            fill="white"
            textAnchor="middle"
          >
            {appliance.device_type.toUpperCase()}
          </text>
          <text
            x={x + radious}
            y={y + radious * 2 + 45}
            width={radious * 2}
            fontSize="16"
            fontWeight="300"
            fill="white"
            textAnchor="middle"
          >
            {getApplianceTimeRange(appliance)}
          </text>
        </>
      )}
    </g>
  );
}

export default Appliance;
