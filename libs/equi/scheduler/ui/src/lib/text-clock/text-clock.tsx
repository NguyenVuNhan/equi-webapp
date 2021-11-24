import { useClock } from '@virtue-equi/equi-shared-features';

export function TextClock() {
  const clock = useClock();

  return (
    <>
      {clock.hour} : {clock.minute}
    </>
  );
}

export default TextClock;
