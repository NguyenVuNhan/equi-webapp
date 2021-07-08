import { useContext } from 'react';
import { RotatorContext } from '@virtue-equi/equi/shared/feature/rotator';

/* eslint-disable-next-line */
export interface DialCursorProps {}

export function DialCursor(props: DialCursorProps) {
  const { dialPosition } = useContext(RotatorContext);

  return (
    <line
      id="line1"
      x1="540"
      x2="1080"
      y1="540"
      y2="540"
      mask="url(#mask0)"
      stroke="white"
      transform={`rotate(${-90 + dialPosition} 540 540)`}
      strokeWidth="10"
    />
  );
}

export default DialCursor;
