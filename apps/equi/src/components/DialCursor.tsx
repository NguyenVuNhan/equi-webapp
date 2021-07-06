import { useContext } from 'react';
import { AppStateContext } from '../app/App.context';

function DialCursor() {
  const { dialPosition } = useContext(AppStateContext);

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