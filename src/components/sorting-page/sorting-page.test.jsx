import { randomArr } from "./utils";

describe('Generate random array', () => {
    it('Correct length of generated array', () => {
      const arr = randomArr(1,2,10,100);
      expect(arr.length < 10).toEqual(arr.length > 100);
    });
  });