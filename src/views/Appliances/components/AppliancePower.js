import React from "react";
import PropTypes from "prop-types";

const AppliancePower = ({ powerConsumption }) => {
  const textLength = powerConsumption.length * 17 + 30;

  return (
    <g
      style={{
        transform: `translateX(${453 - textLength}px) translateY(130px)`,
      }}
    >
      <mask
        id="AppliancePowerMask"
        mask-type="alpha"
        x="0"
        y="0"
        width={`${70 + textLength}px `}
        height="300px"
      >
        <rect width={`${55 + textLength}`} height="150" fill="black" />
      </mask>

      <g mask="url(#AppliancePowerMask)">
        <rect
          width={`${100 + textLength}`}
          height="64"
          rx="32"
          fill="url(#AppliancePowerConsumptionColor)"
        />

        <path
          d="M40.8784 12.3512C41.4988 10.7473 39.386 9.51585 38.2906 10.8429L20.7128 32.1381C19.9854 33.0194 20.4594 34.3563 21.5803 34.5851L32.634 36.841L26.9047 51.8557C26.2842 53.4819 28.452 54.6981 29.522 53.324L46.2287 31.8681C46.9187 30.9819 46.4371 29.6809 45.3355 29.4551L35.0767 27.3518L40.8784 12.3512Z"
          fill="white"
        />

        <text x="55" y="45" fontSize="35" fill="white">
          {powerConsumption}
        </text>

        <defs>
          <linearGradient
            id="AppliancePowerConsumptionColor"
            x1="0"
            y1="0"
            x2="154"
            y2="64"
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

AppliancePower.propTypes = {
  powerConsumption: PropTypes.string.isRequired,
};

export default AppliancePower;
