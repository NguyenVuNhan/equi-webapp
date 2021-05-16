import { motion } from "framer-motion";
import { memo } from "react";

export interface BubbleProps {
  name: string;
  isConsuming: boolean;
  x?: number;
}

const Bubble = ({
  name,
  isConsuming,
  x = Math.random() * 1080,
}: BubbleProps) => {
  const y = !isConsuming ? [0, 1080 + 100] : [1080 + 100, 0];
  return (
    <g>
      <clipPath id={name} width="1080" height="1080">
        <motion.circle
          r={40}
          cx="0"
          cy="0"
          style={{ x, y: 2000 }}
          animate={{
            y,
            transition: {
              delay: Math.random() * 10,
              duration: 9,
              ease: "linear",
              repeat: Infinity,
            },
          }}
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

export default memo<BubbleProps>(Bubble);
