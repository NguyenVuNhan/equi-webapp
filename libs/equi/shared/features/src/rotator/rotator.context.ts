import { createContext } from 'react';

export interface IRotatorContext {
  dialPosition: number;
  setDialPosition: (pos: number) => void;
  click: boolean;
  setClick: (value: boolean) => void;
}

const initial: IRotatorContext = {
  dialPosition: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDialPosition: () => {},
  click: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setClick: () => {},
};

export const RotatorContext = createContext<IRotatorContext>(initial);
