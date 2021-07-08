import { memo, ReactNode } from 'react';
import { pathGenerator } from '@virtue-equi/equi/scheduler/utils';

export interface PolarProps extends React.SVGProps<SVGPathElement> {
  name: string;
  data: number[];
  children?: ReactNode;
}

export const Polar = memo<PolarProps>(
  function (props: PolarProps) {
    const { name, data, children, ...rest } = props;

    return (
      <g>
        <path
          mask="url(#mask0)"
          opacity="0.8"
          d={pathGenerator(data)}
          fill={`url(#${name}color)`}
          stroke="white"
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
  },
  (prev, next) => prev.data === next.data
);

export default Polar;
