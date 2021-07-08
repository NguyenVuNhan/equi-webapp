import DataBubble from '../../components/DataBubble';
import { useContext, useEffect, useRef, useState } from 'react';
import { RotatorContext } from '@virtue-equi/equi/shared/feature/rotator';
import { ApplianceBall, arrangeAppliances } from '../../helpers';
import Appliance from './components/Appliance';
import { appliances } from './mockData';

const Appliances = () => {
  const [balls, setBalls] = useState<ApplianceBall[]>([]);
  const { dialPosition } = useContext(RotatorContext);
  const [active, setActive] = useState(0);
  const pDialPosition = useRef(0);

  useEffect(() => {
    const b = arrangeAppliances(appliances);
    setBalls(b);
  }, []);

  useEffect(() => {
    const diff = dialPosition - pDialPosition.current;
    if (Math.abs(diff) > 20) {
      let newActive = active + (diff > 0 ? 1 : -1);
      newActive =
        newActive < 0
          ? 0
          : newActive < balls.length
          ? newActive
          : balls.length - 1;

      pDialPosition.current = dialPosition;
      setActive(newActive);
    }
  }, [dialPosition]);

  return (
    <g>
      <DataBubble
        name="AppliancePower"
        text={appliances[active]?.power_consumption + ' kWh'}
        gradientColor={
          <>
            <stop stopColor="#75C7CC" />
            <stop offset="1" stopColor="#75C7CC" stopOpacity="0.3" />
          </>
        }
        icon={
          <path
            d="M40.8784 12.3512C41.4988 10.7473 39.386 9.51585 38.2906 10.8429L20.7128 32.1381C19.9854 33.0194 20.4594 34.3563 21.5803 34.5851L32.634 36.841L26.9047 51.8557C26.2842 53.4819 28.452 54.6981 29.522 53.324L46.2287 31.8681C46.9187 30.9819 46.4371 29.6809 45.3355 29.4551L35.0767 27.3518L40.8784 12.3512Z"
            fill="white"
          />
        }
      />
      {balls.map(({ x, y, r, type }, i) => (
        <Appliance
          key={i}
          x={540 + x}
          y={540 - y}
          r={r + 0.5}
          active={active === i}
          type={type}
        />
      ))}
    </g>
  );
};

export default Appliances;
