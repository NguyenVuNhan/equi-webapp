import { useInterval } from '@virtue-equi/equi/shared/utils/hooks';
import { ReactNode, useMemo, useState } from 'react';
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

  useInterval(() => {
    Promise.all([getTotalProduction(), getTotalConsumption()])
      .then(([totalConsumption, totalProduction]) => {
        totalConsumption && setTotalConsumption(totalConsumption);

        totalProduction && setTotalProduction(totalProduction);
      })
      // TODO: Handle error
      .catch(console.error);
  }, 5000);

  const value = useMemo(
    () => ({ totalConsumption, totalProduction }),
    [totalConsumption, totalProduction]
  );

  return (
    <PowerStateContext.Provider value={value}>
      {children}
    </PowerStateContext.Provider>
  );
}

export default PowerStateProvider;
