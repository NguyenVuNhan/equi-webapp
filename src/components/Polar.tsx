import React from "react";
import { pathGenerator } from "../helpers";

interface PolarProps extends React.SVGProps<SVGPathElement> {
  name: string;
  data: number[];
  children?: React.ReactNode;
}

function Polar(props: PolarProps) {
  const { name, data, children, ...rest } = props;

  return (
    <g>
      <path
        mask="url(#mask0)"
        opacity="0.8"
        d={pathGenerator(data)}
        fill={`url(#${name}color)`}
        stroke="pink"
        strokeWidth="2px"
        {...rest}
      />
      <defs>
        <radialGradient
          id={`${name}color`}
          cx="540"
          cy="540"
          r={Math.max(...data) + 180}
          gradientUnits="userSpaceOnUse"
        >
          {children}
        </radialGradient>
      </defs>
    </g>
  );
}

export default Polar;
