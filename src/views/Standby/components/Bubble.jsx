import { motion } from "framer-motion";

const Bubble = ({
  name,
  waveHeight,
  isConsuming,
  x = Math.random() * 1080,
}) => {
  const y = !isConsuming
    ? [0, waveHeight, waveHeight + 100]
    : [waveHeight + 100, 100, 0];
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
              duration: 7 * (1 - waveHeight / 1080),
              ease: "linear",
              repeat: Infinity,
              times: [0, 0.8, 1],
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

export default Bubble;
