import { ElementStates } from "./element-states"; 

export type TElement<T> = {
    value: T;
    state: ElementStates;
  };