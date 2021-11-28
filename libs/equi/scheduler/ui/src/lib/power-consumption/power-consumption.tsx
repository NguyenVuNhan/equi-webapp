import { usePowerConsumptionStatus } from '@virtue-equi/equi-shared-features';
import { DataBubble } from '@virtue-equi/equi/shared/ui';
import { memo } from 'react';

export interface PowerConsumptionProps {
  y: number;
}

export const PowerConsumption = memo((props: PowerConsumptionProps) => {
  const { y } = props;
  const consumption = usePowerConsumptionStatus();

  return (
    <DataBubble
      name="PowerConsumption"
      text={consumption}
      textX={65}
      y={y}
      icon={
        <path
          d="M40.8786 12.3512C41.4989 10.7473 39.3861 9.51585 38.2907 10.8429L20.7129 32.1381C19.9855 33.0194 20.4595 34.3563 21.5804 34.5851L32.6342 36.841L26.9049 51.8557C26.2843 53.4819 28.4522 54.6981 29.5221 53.324L46.2288 31.8681C46.9188 30.9819 46.4372 29.6809 45.3356 29.4551L35.0769 27.3518L40.8786 12.3512Z"
          fill="white"
        />
      }
      gradientColor={
        <>
          <stop stopColor="#75C7CC" />
          <stop offset="1" stopColor="#75C7CC" stopOpacity="0.3" />
        </>
      }
    />
  );
});

export default PowerConsumption;
