import { useInterval } from '@virtue-equi/equi/shared/utils/hooks';
import { ReactNode, useState } from 'react';
import { PowerStateContext } from './power-state.context';
import {
  getTotalConsumption,
  getTotalProduction,
} from '@virtue-equi/equi-shared-data-access';

export interface PowerStateProviderProps {
  children?: ReactNode;
}

export function PowerStateProvider(props: PowerStateProviderProps) {
  const { children } = props;
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalProduction, setTotalProduction] = useState(0);

  useInterval(
    () => {
      getTotalProduction().then(
        (totalProduction) =>
          totalProduction && setTotalProduction(totalProduction)
      );

      getTotalConsumption().then(
        (totalConsumption) =>
          totalConsumption && setTotalConsumption(totalConsumption)
      );
    },
    5000,
    { startNow: true }
  );

  return (
    <PowerStateContext.Provider value={{ totalConsumption, totalProduction }}>
      {children}
    </PowerStateContext.Provider>
  );
}

export default PowerStateProvider;
