import { ButtonProps } from '../button-props';

export type CloseButtonProps = ButtonProps;

export function CloseButton(props: CloseButtonProps) {
  const { active, onClick } = props;

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
            cx="913.5"
            cy="541.5"
            r="119"
            fill="url(#CancelSelected)"
            fillOpacity="0.5"
          />
        </>
      ) : (
        <circle
          opacity="0.5"
          cx="913.5"
          cy="541.5"
          r="119"
          stroke="white"
          stroke-width="15"
        />
      )}

      <path
        opacity={active ? 1 : 0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M865.036 498.71C863.084 500.663 863.084 503.829 865.036 505.781L900.165 540.91L865.036 576.038C863.084 577.991 863.084 581.157 865.036 583.109L872.71 590.783C874.663 592.736 877.828 592.736 879.781 590.783L914.91 555.654L950.038 590.783C951.991 592.736 955.157 592.736 957.109 590.783L964.783 583.109C966.735 581.157 966.735 577.991 964.783 576.038L929.654 540.91L964.783 505.781C966.735 503.829 966.735 500.663 964.783 498.71L957.109 491.037C955.156 489.084 951.991 489.084 950.038 491.037L914.91 526.165L879.781 491.036C877.828 489.084 874.663 489.084 872.71 491.036L865.036 498.71Z"
        fill="white"
      />
      <circle
        cx="913.5"
        cy="541.5"
        r="119"
        fill="white"
        fillOpacity="0"
        onClick={onClick}
      />
    </g>
  );
}

export default CloseButton;
