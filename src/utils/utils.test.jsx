import { swap } from "./utils";

describe('Swap items in array', () => {
    it('Change position of two elements in array', () => {
      const arr = [1,5,6,78];
      swap(arr, 1,2);
      expect(arr[1]).toEqual(6);
    });
  });