import React from "react";

const MenuItem4 = ({ active, onClick }) => {
  return (
    <g>
      {active ? (
        <>
          <linearGradient
            id="CancelSelected"
            x1="684"
            y1="147"
            x2="937"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ECECEC" />
            <stop offset="1" stopColor="#D1D3D4" stopOpacity="0.5" />
          </linearGradient>
          <circle
            cx="810.5"
            cy="273.5"
            r="126.5"
            fill="url(#CancelSelected)"
            fillOpacity="0.5"
          />
        </>
      ) : (
        <circle
          opacity="0.5"
          cx="810.5"
          cy="273.5"
          r="119"
          stroke="white"
          strokeWidth="15"
        />
      )}

      <path
        opacity={active ? 1 : 0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M762.036 230.71C760.084 232.663 760.084 235.829 762.036 237.781L797.165 272.91L762.036 308.038C760.084 309.991 760.084 313.157 762.036 315.109L769.71 322.783C771.663 324.736 774.828 324.736 776.781 322.783L811.91 287.655L847.038 322.783C848.991 324.736 852.157 324.736 854.109 322.783L861.783 315.109C863.735 313.157 863.735 309.991 861.783 308.038L826.654 272.91L861.783 237.781C863.735 235.829 863.735 232.663 861.783 230.71L854.109 223.037C852.156 221.084 848.991 221.084 847.038 223.037L811.91 258.165L776.781 223.037C774.828 221.084 771.663 221.084 769.71 223.037L762.036 230.71Z"
        fill="white"
      />
      <circle
        cx="810.5"
        cy="273.5"
        r="126.5"
        fill="white"
        fillOpacity="0"
        onClick={onClick}
      />
    </g>
  );
};

export default MenuItem4;
