import { ButtonProps } from '../button-props';

export type ScheduleButtonProps = ButtonProps;

export function ScheduleButton(props: ScheduleButtonProps) {
  const { active, onClick } = props;

  return (
    <g>
      {active ? (
        <>
          <circle cx="168.5" cy="541.5" r="119" fill="url(#ScheduleSelected)" />
          <linearGradient
            id="ScheduleSelected"
            x1="147"
            y1="681"
            x2="400"
            y2="934"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E24C3A" />
            <stop offset="1" stopColor="#E24C3A" stopOpacity="0.5" />
          </linearGradient>
        </>
      ) : (
        <circle
          opacity="0.5"
          cx="168.5"
          cy="541.5"
          r="119"
          stroke="white"
          stroke-width="15"
        />
      )}

      <g opacity={active ? 1 : 0.5}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M196.182 608.052C215.55 608.052 231.25 592.444 231.25 573.19C231.25 553.935 215.55 538.327 196.182 538.327C176.815 538.327 161.115 553.935 161.115 573.19C161.115 592.444 176.815 608.052 196.182 608.052ZM196.182 617C220.52 617 240.25 597.385 240.25 573.19C240.25 548.994 220.52 529.379 196.182 529.379C171.844 529.379 152.115 548.994 152.115 573.19C152.115 597.385 171.844 617 196.182 617Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M115 488.04H204.557C207.871 488.04 210.557 490.711 210.557 494.005V531.763C213.738 532.854 216.754 534.296 219.557 536.044V494.005C219.557 485.769 212.842 479.093 204.557 479.093H115C106.716 479.093 100 485.769 100 494.005V583.04C100 591.275 106.716 597.952 115 597.952H159.824C157.912 595.182 156.312 592.183 155.073 589.005H115C111.686 589.005 109 586.334 109 583.04V494.005C109 490.711 111.686 488.04 115 488.04Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M159.779 467C162.264 467 164.279 469.003 164.279 471.474V495.855C164.279 498.326 162.264 500.329 159.779 500.329C157.294 500.329 155.279 498.326 155.279 495.855V471.474C155.279 469.003 157.294 467 159.779 467Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M121.459 467C123.944 467 125.959 469.003 125.959 471.474V495.855C125.959 498.326 123.944 500.329 121.459 500.329C118.974 500.329 116.959 498.326 116.959 495.855V471.474C116.959 469.003 118.974 467 121.459 467Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M198.098 467C200.584 467 202.598 469.003 202.598 471.474V495.855C202.598 498.326 200.584 500.329 198.098 500.329C195.613 500.329 193.598 498.326 193.598 495.855V471.474C193.598 469.003 195.613 467 198.098 467Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M215.342 514.424H103.449V505.477H215.342V514.424Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M162.242 523.948H158.082C156.425 523.948 155.082 525.283 155.082 526.931V531.066C155.082 532.713 156.425 534.049 158.082 534.049H162.242C163.899 534.049 165.242 532.713 165.242 531.066V526.931C165.242 525.283 163.899 523.948 162.242 523.948ZM158.082 519.474C153.94 519.474 150.582 522.813 150.582 526.931V531.066C150.582 535.184 153.94 538.522 158.082 538.522H162.242C166.384 538.522 169.742 535.184 169.742 531.066V526.931C169.742 522.813 166.384 519.474 162.242 519.474H158.082Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M132.352 523.948H128.193C126.536 523.948 125.193 525.283 125.193 526.931V531.066C125.193 532.713 126.536 534.049 128.193 534.049H132.352C134.009 534.049 135.352 532.713 135.352 531.066V526.931C135.352 525.283 134.009 523.948 132.352 523.948ZM128.193 519.474C124.05 519.474 120.693 522.813 120.693 526.931V531.066C120.693 535.184 124.05 538.522 128.193 538.522H132.352C136.495 538.522 139.852 535.184 139.852 531.066V526.931C139.852 522.813 136.495 519.474 132.352 519.474H128.193Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M132.352 546.044H128.193C126.536 546.044 125.193 547.379 125.193 549.026V553.162C125.193 554.809 126.536 556.144 128.193 556.144H132.352C134.009 556.144 135.352 554.809 135.352 553.162V549.026C135.352 547.379 134.009 546.044 132.352 546.044ZM128.193 541.57C124.05 541.57 120.693 544.908 120.693 549.026V553.162C120.693 557.28 124.05 560.618 128.193 560.618H132.352C136.495 560.618 139.852 557.28 139.852 553.162V549.026C139.852 544.908 136.495 541.57 132.352 541.57H128.193Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M132.352 568.139H128.193C126.536 568.139 125.193 569.475 125.193 571.122V575.258C125.193 576.905 126.536 578.24 128.193 578.24H132.352C134.009 578.24 135.352 576.905 135.352 575.258V571.122C135.352 569.475 134.009 568.139 132.352 568.139ZM128.193 563.666C124.05 563.666 120.693 567.004 120.693 571.122V575.258C120.693 579.375 124.05 582.714 128.193 582.714H132.352C136.495 582.714 139.852 579.375 139.852 575.258V571.122C139.852 567.004 136.495 563.666 132.352 563.666H128.193Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M196.566 544.716C199.051 544.716 201.066 546.719 201.066 549.189L201.066 572.809C201.066 575.28 199.051 577.282 196.566 577.282C194.08 577.282 192.066 575.28 192.066 572.809L192.066 549.189C192.066 546.719 194.08 544.716 196.566 544.716Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M217.16 572.809C217.16 575.28 215.145 577.283 212.66 577.283H196.566C194.08 577.283 192.066 575.28 192.066 572.809C192.066 570.338 194.08 568.335 196.566 568.335H212.66C215.145 568.335 217.16 570.338 217.16 572.809Z"
          fill="white"
        />
      </g>

      <circle
        cx="168.5"
        cy="541.5"
        r="119"
        fill="white"
        opacity="0"
        onClick={onClick}
      />
    </g>
  );
}

export default ScheduleButton;
