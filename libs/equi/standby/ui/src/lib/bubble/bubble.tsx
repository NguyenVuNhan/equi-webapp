import { motion, useAnimation } from 'framer-motion';
import { memo, useEffect, useMemo, useState } from 'react';

export interface BubbleProps {
  name: string;
  isConsuming: boolean;
  x?: number;
  delay?: number;
}

export function Bubble(props: BubbleProps) {
  const { name, isConsuming, x = Math.random() * 1080, delay = 0 } = props;
  const y = useMemo(() => (!isConsuming ? [0, 1080 + 100] : [1080 + 100, 0]), [
    isConsuming,
  ]);
  const [r, setR] = useState(Math.random() * 20 + 10);
  const control = useAnimation();

  useEffect(() => {
    control
      .start({
        y,
        transition: {
          delay,
          duration: 9,
          ease: 'linear',
        },
      })
      .then(() => {
        control.stop();
        setR(Math.random() * 20 + 10);
      });
  }, [control, delay, r, y]);

  return (
    <g>
      <clipPath id={name} width="1080" height="1080">
        <motion.circle
          r={r}
          cx="0"
          cy="0"
          style={{ x, y: 2000 }}
          animate={control}
        />
      </clipPath>
      <rect
        width={1080}
        height={1080}
        fill="url(#bubbleFill)"
        mask="url(#mask0)"
        clipPath={`url(#${name})`}
      />
    </g>
  );
}

export default Bubble;
