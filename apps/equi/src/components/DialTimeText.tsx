import { useContext, useEffect, useState } from 'react';
import { RotatorContext } from '@virtue-equi/equi/shared/feature/rotator';
import { angleToTime } from '../helpers';

const dialRightBoundary = 8;
const dialLeftBoundary = 352;

const DialTimeText = () => {
  const { dialPosition } = useContext(RotatorContext);
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
  }, [dialPosition]);

  return (
    <text
      x="30"
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
      {angleToTime(dialPosition, dialAppear)}
    </text>
  );
};

export default DialTimeText;
