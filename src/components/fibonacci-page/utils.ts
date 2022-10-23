export const getFibonacciNumbers = (n: number) => {
    const arr: number[] = [];
    let prev = 1;
    let next = 1;
    for (let i = 0; i < n; i++) {
      arr.push(prev);
      let temp = next;
      next = prev + next;
      prev = temp;
    }
    arr.push(prev);
    return arr;
  };