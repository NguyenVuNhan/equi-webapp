import { createContext } from 'react';

export type ClickEvent =
  | 'doubleClickEvent'
  | 'clickEvent'
  | 'holdEvent'
  | 'rotateLeftEvent'
  | 'rotateRightEvent';

export interface IRotatorContext {
  dialPosition: number;
  setDialPosition: (pos: number) => void;
  handleClick: (event: ClickEvent) => void;
}

const initial: IRotatorContext = {
  dialPosition: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDialPosition: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClick: () => {},
};

export const RotatorContext = createContext<IRotatorContext>(initial);
