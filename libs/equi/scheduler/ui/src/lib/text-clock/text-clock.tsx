import { getCurrentTime } from '@virtue-equi/equi/scheduler/utils';
import { useInterval } from '@virtue-equi/equi/shared/utils/hooks';
import { useState } from 'react';

export function TextClock() {
  const [time, setTime] = useState(getCurrentTime());

  useInterval(() => setTime(getCurrentTime()), 1000);

  return <>{time}</>;
}

export default TextClock;
