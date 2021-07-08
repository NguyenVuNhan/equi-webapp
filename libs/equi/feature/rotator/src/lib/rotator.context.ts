import { createContext } from 'react';

export interface IRotatorContext {
  dialPosition: number;
  setDialPosition: (pos: number) => void;
  click: boolean;
  resetClick: () => void;
}

const initial: IRotatorContext = {
  dialPosition: 0,
  setDialPosition: (_pos: number) => {
    return;
  },
  click: false,
  resetClick: () => {
    return;
  },
};

export const RotatorContext = createContext<IRotatorContext>(initial);
