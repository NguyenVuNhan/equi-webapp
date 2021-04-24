import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppStateContext } from "../../../app/App.context";
import Icon from "../../../components/Icon";
import {
  dateToAngle,
  deviceTypeToIcon,
  getApplianceTimeRange,
} from "../../../helpers";

const threshold = 5;
const defaultSize = 64;
const activeGrow = 64;

const Appliance = ({ appliance, onActive, onLeave }) => {
  const pos = useRef(dateToAngle(appliance.time_start));
  const { dialPosition } = useContext(AppStateContext);
  const originalX = useRef(540 + Math.sin((pos.current * Math.PI) / 180) * 360);
  const originalY = useRef(540 - Math.cos((pos.current * Math.PI) / 180) * 360);
  const r = useRef(defaultSize / 2);
  const [x, setX] = useState(originalX.current - r.current);
  const [y, setY] = useState(originalY.current - r.current);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Inactive --> Active
    if (!active) {
      if (
        pos.current - threshold <= dialPosition &&
        dialPosition <= pos.current + threshold
      ) {
        r.current = (defaultSize + activeGrow) / 2;
        setX(originalX.current - r.current);
        setY(originalY.current - r.current);
        setActive(true);
      }
      return;
    }

    // Active --> Inactive
    if (
      pos.current - threshold > dialPosition ||
      dialPosition > pos.current + threshold
    ) {
      r.current = defaultSize / 2;
      setX(originalX.current - r.current);
      setY(originalY.current - r.current);
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialPosition]);

  useEffect(() => {
    originalX.current = 540 + Math.sin((pos.current * Math.PI) / 180) * 360;
    originalY.current = 540 - Math.cos((pos.current * Math.PI) / 180) * 360;
  }, [appliance.time_start]);

  useEffect(() => {
    if (active) onActive && onActive(appliance);
    else onLeave && onLeave();
  }, [active, onActive]);

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

      <Icon
        name={deviceTypeToIcon(appliance.device_type)}
        width={r.current * 2}
        height={r.current * 2}
        fill="#E24C3A"
        style={{
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
      />

      {active && (
        <>
          <circle
            cx={x + r.current}
            cy={y + r.current}
            r={r.current}
            strokeWidth="4"
            stroke="white"
          />
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
};

Appliance.propTypes = {
  onActive: PropTypes.func,
  onLeave: PropTypes.func,
  appliance: PropTypes.shape({
    device_type: PropTypes.string.isRequired,
    time_start: PropTypes.instanceOf(Date),
    time_end: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default Appliance;
