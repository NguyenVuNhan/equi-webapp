import { createContext } from 'react';

export type ClickEvent =
  | 'doubleClickEvent'
  | 'clickEvent'
  | 'holdEvent'
  | 'rotateLeftEvent'
  | 'rotateRightEvent';

export interface IRotatorContext {
  handleClick: (event: ClickEvent) => void;
}

const initial: IRotatorContext = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClick: () => {},
};

export const RotatorContext = createContext<IRotatorContext>(initial);
