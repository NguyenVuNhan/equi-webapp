import React from "react";

const BatteryLevel = ({ batteryLevel }) => {
  const textLength = batteryLevel.length * 17 + 30;

  return (
    <g
      style={{
        transform: `translateX(${439 - textLength}px) translateY(80px)`,
      }}
    >
      <mask
        id="BatteryLevelMask"
        mask-type="alpha"
        x="0"
        y="0"
        width={`${70 + textLength}px `}
        height="300px"
      >
        <rect width={`${65 + textLength}`} height="150" fill="black" />
      </mask>

      <g mask="url(#BatteryLevelMask)">
        <rect
          width={`${100 + textLength}`}
          height="64"
          rx="32"
          fill="url(#BatteryLevelColor)"
        />

        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.9525 10.8373C31.9525 9.67238 32.962 8.72803 34.2072 8.72803L39.1531 8.72803C40.3983 8.72803 41.4078 9.67238 41.4078 10.8373L41.4078 12.1301L46.7693 12.1301C49.2598 12.1301 51.2788 14.0188 51.2788 16.3486L51.2788 46.6948C51.2788 49.0247 49.2598 50.9134 46.7693 50.9134L26.6949 50.9134C24.2044 50.9134 22.1854 49.0247 22.1854 46.6948L22.1854 16.3486C22.1854 14.0188 24.2044 12.1301 26.6949 12.1301L31.9525 12.1301L31.9525 10.8373ZM27.6768 16.5527C27.0542 16.5527 26.5494 17.0249 26.5494 17.6074L26.5494 27.4393L46.9148 27.4393L46.9148 17.6074C46.9148 17.0249 46.41 16.5527 45.7874 16.5527L27.6768 16.5527Z"
          fill="white"
        />

        <text x="65" y="45" font-size="35" fill="white">
          {batteryLevel}
        </text>
        <defs>
          <linearGradient
            id="BatteryLevelColor"
            x1="0"
            y1="0"
            x2="154"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#B3D898" />
            <stop offset="1" stop-color="#B3D898" stop-opacity="0.5" />
          </linearGradient>
        </defs>
      </g>
    </g>
  );
};

export default BatteryLevel;
