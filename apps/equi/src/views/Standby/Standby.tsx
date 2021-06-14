import { gradientMapper } from 'helpers';
import { CSSProperties, useState } from 'react';
import { batteryLevel, powerConsumption, powerProduction } from './batteryMock';
import Bubble from './components/Bubble';
import './Standby.css';

const StandByWave = () => {
  const [battery, setBattery] = useState(batteryLevel);
  const waveHeight = 1080 * (1 - (battery * 0.8) / 100);
  const waveColor =
    battery <= 60
      ? gradientMapper('#E24C3A', '#F4E696', battery / 60)
      : gradientMapper('#F4E696', '#B3D898', (battery - 60) / 40);

  return (
    <g style={{ '--wave-height': `${waveHeight}px` } as CSSProperties}>
      <defs>
        <linearGradient
          id="bubbleFill"
          x1="50%"
          y1={`${0}`}
          x2="50%"
          y2={`${waveHeight + 200}`}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={1 - 100 / waveHeight}
            stopColor={waveColor}
            stopOpacity="1"
          />
          <stop offset="1" stopColor={waveColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <clipPath id="wave1ClipPath" width="1080" height="1080" className="wave1">
        <path d="M556 13C393.6 -35.8 79 71.6666 -58 131.5L-149.5 1074.5L429 1309.5L1031.5 1121.5C1094.17 953.5 1197.8 59.6 1111 84C1002.5 114.5 759 74 556 13Z" />
      </clipPath>
      <clipPath id="wave2ClipPath" width="1080" height="1080" className="wave2">
        <path d="M383.5 97C122.3 17 -15 29.6667 -51 46L-0.5 1097.5L444.5 1346L1099 1131L1123 0.5C985.333 66 644.7 177 383.5 97Z" />
      </clipPath>
      <defs>
        <linearGradient
          id="wave1Fill"
          x1="50%"
          y1={`${62 + waveHeight}`}
          x2="50%"
          y2={`${845 + waveHeight}`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={waveColor} stopOpacity="0.3" />
          <stop offset="1" stopColor={waveColor} />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient
          id="wave2Fill"
          x1="50%"
          y1={`${845 + waveHeight}`}
          x2="50%"
          y2={`${waveHeight - 87}`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={waveColor} />
          <stop offset="1" stopColor={waveColor} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect
        x={0}
        y={0}
        width={1080}
        height={1080}
        fill="url(#wave1Fill)"
        mask="url(#mask0)"
        clipPath="url(#wave2ClipPath)"
      />
      <rect
        x={0}
        y={0}
        width={1080}
        height={1080}
        fill="url(#wave2Fill)"
        mask="url(#mask0)"
        clipPath="url(#wave1ClipPath)"
      />

      {/* Battery level controller */}
      <circle
        cx={40}
        cy={40}
        r={40}
        fill="green"
        onClick={() =>
          setBattery((battery) => (battery >= 100 ? battery : battery + 5))
        }
      />
      <circle
        cx={150}
        cy={40}
        r={40}
        fill="red"
        onClick={() =>
          setBattery((battery) => (battery < 0 ? battery : battery - 5))
        }
      />
    </g>
  );
};

const StandBy = () => (
  <>
    <StandByWave />
    {Array(10)
      .fill(1)
      .map((_, i) => (
        <Bubble
          key={i}
          name={`bubble${i}`}
          isConsuming={powerConsumption > powerProduction}
          delay={Math.random() * 10 + i}
        />
      ))}
  </>
);
export default StandBy;
