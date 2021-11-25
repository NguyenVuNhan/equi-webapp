import { useDialAngle } from '@virtue-equi/equi-shared-features';
import { angleToTime } from '@virtue-equi/equi/scheduler/utils';
import { memo, useEffect, useState } from 'react';
import TextClock from '../text-clock/text-clock';
const dialRightBoundary = 8;
const dialLeftBoundary = 352;

export const DialTimeText = memo(
  () => {
    const dialPosition = useDialAngle();
    const [dialAppear, setDialAppear] = useState(false);

    useEffect(() => {
      if (
        (dialPosition < dialRightBoundary || dialPosition > dialLeftBoundary) &&
        dialAppear
      ) {
        setDialAppear(false);
      } else if (
        dialPosition > dialRightBoundary &&
        dialPosition < dialLeftBoundary &&
        !dialAppear
      ) {
        setDialAppear(true);
      }
    }, [dialAppear, dialPosition]);

    return (
      <text
        x={dialAppear ? '5' : '30'}
        y={dialAppear ? 520 : 490}
        fontSize={dialAppear ? 40 : 110}
        fontWeight="300"
        fill="white"
        textAnchor="start"
        transform={
          dialAppear
            ? `rotate(${90 + dialPosition} 540 540)`
            : 'rotate(90 540 540)'
        }
      >
        {dialAppear ? angleToTime(dialPosition) : <TextClock />}
      </text>
    );
  },
  // Never rerender this component based on it's parent.
  // It knows when to restart by itself
  () => true
);

export default DialTimeText;
