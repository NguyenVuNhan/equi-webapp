import React from "react";
import { pathGenerator } from "../../helpers";
import PropTypes from "prop-types";

const Polar = ({ name, data, children, ...rest }) => {
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
};

Polar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  name: PropTypes.string.isRequired,
};

export default Polar;
