import { CSSProperties, useState } from "react";
import { batteryLevel, powerConsumption, powerProduction } from "./batteryMock";
import Bubble from "./components/Bubble";
import "./Standby.css";

const StandBy = () => {
  const [battery, setBattery] = useState(batteryLevel);
  const waveHeight = 1080 * (1 - battery / 100);
  var waveColor = "#E24C3A";
  if (battery >= 70) {
    waveColor = "#B3D898";
  } else if (battery >= 45) {
    waveColor = "#F4E696";
  }

  return (
    <g style={{ "--wave-height": `${waveHeight}px` } as CSSProperties}>
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
            stop-color={waveColor}
            stopOpacity="1"
          />
          <stop offset="1" stop-color={waveColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array(6)
        .fill(1)
        .map((_, i) => (
          <Bubble
            key={i}
            name={`bubble${i}`}
            isConsuming={powerConsumption < powerProduction}
            waveHeight={waveHeight}
          />
        ))}

      <clipPath id="wave1ClipPath" width="1080" height="1080" className="wave1">
        <path d="M555.653 16.5892C393.218 -48.9268 78.5496 95.3515 -58.4801 175.68L-150 684.503L428.626 1000L1031.26 747.602C1093.94 522.056 1197.59 79.1516 1110.77 111.91C1002.25 152.857 758.697 98.4841 555.653 16.5892Z" />
      </clipPath>
      <clipPath id="wave2ClipPath" width="1080" height="1080" className="wave2">
        <path d="M383.5 123.099C122.3 21.0481 -15 37.2062 -51 58.0417L-0.5 678.003L444.5 995L1099 720.737L1123 0C985.333 83.5545 644.7 225.151 383.5 123.099Z" />
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
          <stop offset="1" stop-color={waveColor} />
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
        cx={540}
        cy={400}
        r={40}
        fill="green"
        onClick={() => setBattery(battery + 5)}
      />
      <circle
        cx={540}
        cy={680}
        r={40}
        fill="red"
        onClick={() => setBattery(battery - 5)}
      />
    </g>
  );
};

export default StandBy;
