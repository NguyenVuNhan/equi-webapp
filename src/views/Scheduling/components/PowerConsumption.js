import React from "react";
import PropTypes from "prop-types";

const PowerConsumption = ({ powerConsumption }) => {
  const textLength = powerConsumption.length * 17 + 30;

  return (
    <g
      style={{
        transform: `translateX(${439 - textLength}px) translateY(160px)`,
      }}
    >
      <mask
        id="PowerConsumptionMask"
        mask-type="alpha"
        x="0"
        y="0"
        width={`${70 + textLength}px `}
        height="300px"
      >
        <rect width={`${65 + textLength}`} height="150" fill="black" />
      </mask>

      <g mask="url(#PowerConsumptionMask)">
        <rect
          width={`${100 + textLength}`}
          height="64"
          rx="32"
          fill="url(#powerConsumptionColor)"
        />

        <path
          d="M40.8786 12.3512C41.4989 10.7473 39.3861 9.51585 38.2907 10.8429L20.7129 32.1381C19.9855 33.0194 20.4595 34.3563 21.5804 34.5851L32.6342 36.841L26.9049 51.8557C26.2843 53.4819 28.4522 54.6981 29.5221 53.324L46.2288 31.8681C46.9188 30.9819 46.4372 29.6809 45.3356 29.4551L35.0769 27.3518L40.8786 12.3512Z"
          fill="white"
        />

        <text x="65" y="45" fontSize="35" fill="white">
          {powerConsumption}
        </text>
        <defs>
          <linearGradient
            id="powerConsumptionColor"
            x1="0"
            y1="0"
            x2="136.979"
            y2="37.7864"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#75C7CC" />
            <stop offset="1" stopColor="#75C7CC" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </g>
    </g>
  );
};

PowerConsumption.propsTypes = {
  powerConsumption: PropTypes.string.isRequired,
};

export default PowerConsumption;
