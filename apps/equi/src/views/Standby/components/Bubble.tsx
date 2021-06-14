import { motion, useAnimation } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

export interface BubbleProps {
  name: string;
  isConsuming: boolean;
  x?: number;
  delay?: number;
}

const Bubble = ({
  name,
  isConsuming,
  x = Math.random() * 1080,
  delay = 0,
}: BubbleProps) => {
  const y = !isConsuming ? [0, 1080 + 100] : [1080 + 100, 0];
  const [r, setR] = useState(Math.random() * 20 + 10);
  // useInterval(() => {
  //   setR(Math.random() * 20 + 10);
  // }, 9000 + delay * 1000);
  const control = useAnimation();

  useEffect(() => {
    control
      .start({
        y,
        transition: {
          delay,
          duration: 9,
          jjjkkkease: 'linear',
        },
      })
      .then(() => {
        control.stop();
        setR(Math.random() * 20 + 10);
      });
  }, [r]);

  return (
    <g>
      <clipPath id={name} width="1080" height="1080">
        <motion.circle
          r={r}
          cx="0"
          cy="0"
          style={{ x, y: 2000 }}
          animate={control}
          onAnimationComplete={() => console.log('Complete')}
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
};

export default memo<BubbleProps>(Bubble, () => false);
