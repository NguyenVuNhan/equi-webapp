import { clicked$, useDialAngle } from '@virtue-equi/equi-shared-features';
import {
  dateToAngle,
  getApplianceTimeRange,
} from '@virtue-equi/equi/scheduler/utils';
import { getDeviceIcon } from '@virtue-equi/equi/shared/utils/helper';
import { IAppliance } from '@virtue-equi/shared/interfaces';
import { useEffect, useRef, useState } from 'react';
import { useApplianceState } from '@virtue-equi/equi/scheduler/feature/appliance-state';

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
  const pos = useRef(dateToAngle(appliance.time_start));
  const originalX = useRef(540 + Math.sin((pos.current * Math.PI) / 180) * 360);
  const originalY = useRef(540 - Math.cos((pos.current * Math.PI) / 180) * 360);
  const r = useRef(defaultSize / 2);
  const [x, setX] = useState(originalX.current - r.current);
  const [y, setY] = useState(originalY.current - r.current);
  const [active, setActive] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const dialPosition = useDialAngle();

  useEffect(() => {
    if (!isScheduling) {
      // If not in scheduling mode
      if (!active) {
        if (
          // Inactive --> Active
          pos.current - threshold <= dialPosition &&
          dialPosition <= pos.current + threshold
        ) {
          r.current = (defaultSize + activeGrow) / 2;
          setX(originalX.current - r.current);
          setY(originalY.current - r.current);
          setActive(true);
        }
        return;
      } else if (
        pos.current - threshold > dialPosition ||
        dialPosition > pos.current + threshold
      ) {
        // Active --> Inactive
        r.current = defaultSize / 2;
        setX(originalX.current - r.current);
        setY(originalY.current - r.current);
        setActive(false);
      }
    } else {
      // If in scheduling mode
      originalX.current = 540 + Math.sin((dialPosition * Math.PI) / 180) * 360;
      originalY.current = 540 - Math.cos((dialPosition * Math.PI) / 180) * 360;
      pos.current = dialPosition;
      setX(originalX.current - r.current);
      setY(originalY.current - r.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialPosition]);

  useEffect(() => {
    const clickedSubscriber = clicked$.subscribe(() => {
      if (active) {
        setIsScheduling((value) => {
          return !value;
        });
      }
    });
    return () => {
      clickedSubscriber.unsubscribe();
    };
  }, [active]);

  useEffect(() => {
    originalX.current = 540 + Math.sin((pos.current * Math.PI) / 180) * 360;
    originalY.current = 540 - Math.cos((pos.current * Math.PI) / 180) * 360;
  }, [appliance.time_start]);

  useEffect(() => {
    if (active) onActive && onActive(appliance);
    else onLeave && onLeave(undefined);
  }, [active, appliance, onActive, onLeave]);

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
        transform={`rotate(${-90 + pos.current} 540 540)`}
        strokeWidth="3"
      />

      <circle
        cx={x + r.current}
        cy={y + r.current}
        r={r.current}
        fill="#E24C3A"
        strokeWidth={active || isScheduling ? 4 : 0}
        stroke="white"
      />

      <image
        href={getDeviceIcon(appliance.device_type)}
        width={r.current * 2}
        height={r.current * 2}
        style={{
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
      />

      {active && (
        <>
          <text
            x={x + r.current}
            y={y + r.current * 2 + 25}
            width={r.current * 2}
            fontSize="20"
            fontWeight="500"
            fill="white"
            textAnchor="middle"
          >
            {appliance.device_type.toUpperCase()}
          </text>
          <text
            x={x + r.current}
            y={y + r.current * 2 + 45}
            width={r.current * 2}
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
