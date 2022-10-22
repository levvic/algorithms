import { ElementStates } from "../../types/element-states";

export const randomArr = (minValue: number = 0, maxValue: number = 100, minLen: number = 3, maxLen: number = 17) => {
    const arr: { value: number; state: ElementStates }[] = [];
    const arrLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  
    for (let i = 0; i <= arrLength - 1; i++) {
      arr.push({
        value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue,
        state: ElementStates.Default,
      });
    }
  
    return arr;
  }