import { createContext } from 'react';

export interface IPowerStateContext {
  totalProduction: number;
  totalConsumption: number;
}

const initial: IPowerStateContext = {
  totalConsumption: 0,
  totalProduction: 0,
};

export const PowerStateContext = createContext<IPowerStateContext>(initial);
