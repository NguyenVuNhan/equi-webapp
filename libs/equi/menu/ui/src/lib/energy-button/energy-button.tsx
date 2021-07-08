import { ButtonProps } from '../button-props';

/* eslint-disable-next-line */
export type EnergyButtonProps = ButtonProps;

export function EnergyButton(props: EnergyButtonProps) {
  const { active, onClick } = props;
  return (
    <g>
      {active ? (
        <>
          <circle cx="273.5" cy="273.5" r="126.5" fill="url(#EnergySelected)" />
          <linearGradient
            id="EnergySelected"
            x1="169.5"
            y1="171"
            x2="400"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFEB76" />
            <stop offset="1" stopColor="#F4E696" stopOpacity="0.5" />
          </linearGradient>
        </>
      ) : (
        <circle
          opacity="0.5"
          cx="273.5"
          cy="273.5"
          r="119"
          stroke="white"
          strokeWidth="15"
        />
      )}

      <path
        d="M296.44 207.118C298.54 201.605 291.388 197.373 287.68 201.934L228.177 275.13C225.714 278.159 227.319 282.754 231.113 283.541L268.532 291.295L249.137 342.903C247.036 348.493 254.375 352.674 257.997 347.95L314.551 274.202C316.887 271.156 315.257 266.684 311.528 265.908L276.8 258.678L296.44 207.118Z"
        opacity={active ? 1 : 0.5}
        fill="white"
      />

      <circle
        cx="273.5"
        cy="273.5"
        r="126.5"
        fill="white"
        opacity="0"
        onClick={onClick}
      />
    </g>
  );
}

export default EnergyButton;
