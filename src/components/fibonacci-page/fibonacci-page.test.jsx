import { getFibonacciNumbers } from "./utils";

describe('Get Fibonacci sequence', () => {
    it('Correct length of Fibonacci sequence', () => {
      const fibSeq = getFibonacciNumbers(42);
      expect(fibSeq[41]).toEqual(267914296);
    });
  });