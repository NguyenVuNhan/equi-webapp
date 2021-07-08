import { memo } from 'react';
import { Bubble } from '@virtue-equi/equi/standby/ui';

export interface BatteryBubbleProps {
  isConsuming: boolean;
}

export const BatteryBubble = memo<BatteryBubbleProps>(
  function (props: BatteryBubbleProps) {
    const { isConsuming } = props;

    return (
      <g>
        {Array(10)
          .fill(1)
          .map((_, i) => (
            <Bubble
              key={i}
              name={`bubble${i}`}
              isConsuming={isConsuming}
              delay={Math.random() * 10 + i}
            />
          ))}
      </g>
    );
  },
  (prev, next) => prev.isConsuming === next.isConsuming
);

export default BatteryBubble;
