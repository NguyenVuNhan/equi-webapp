import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppStateContext } from "../../../app/App.context";
import Icon from "../../../components/Icon";

const threshold = 5;
const defaultSize = 64;
const activeGrow = 64;

const Appliance = ({ name, pos }) => {
  const { dialPosition } = useContext(AppStateContext);
  const originalX = useRef(540 + Math.sin((pos * Math.PI) / 180) * 360);
  const originalY = useRef(540 - Math.cos((pos * Math.PI) / 180) * 360);
  const r = useRef(defaultSize / 2);
  const [x, setX] = useState(originalX.current - r.current);
  const [y, setY] = useState(originalY.current - r.current);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) {
      if (pos - threshold <= dialPosition && dialPosition <= pos + threshold) {
        r.current = (defaultSize + activeGrow) / 2;
        setX(originalX.current - r.current);
        setY(originalY.current - r.current);
        setActive(true);
      }
    } else {
      if (pos - threshold > dialPosition || dialPosition > pos + threshold) {
        r.current = defaultSize / 2;
        setX(originalX.current - r.current);
        setY(originalY.current - r.current);
        setActive(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, dialPosition]);

  useEffect(() => {
    originalX.current = 540 + Math.sin((pos * Math.PI) / 180) * 360;
    originalY.current = 540 - Math.cos((pos * Math.PI) / 180) * 360;
  }, [pos]);

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
        transform={`rotate(${-90 + pos} 540 540)`}
        strokeWidth="3"
      />

      <Icon
        name={name}
        width={r.current * 2}
        height={r.current * 2}
        fill="#E24C3A"
        style={{
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
      />

      {active && (
        <circle
          cx={x + r.current}
          cy={y + r.current}
          r={r.current}
          strokeWidth="4"
          stroke="white"
        />
      )}
    </g>
  );
};

Appliance.propTypes = {
  name: PropTypes.string.isRequired,
  pos: PropTypes.number.isRequired,
};

export default Appliance;
