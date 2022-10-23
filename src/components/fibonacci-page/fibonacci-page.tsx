import React from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { useState, FormEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { setInterval } from "../../utils/utils";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [circles, setCircles] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCircles([]);
    setInputValue(Number(e.currentTarget.value));
  };  

  const renderFibSeq = async () => {
    setIsLoading(true);
    const arr = getFibonacciNumbers(inputValue);

    for (let i = 0; i < arr.length; i++) {
      await setInterval(500);
      setCircles((state) => [...state, arr[i]]);
    }

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          max="19"
          min="1"
          step="1"
          type="number"
          placeholder="Введите число"
          extraClass={styles.input}
          onChange={(e) => onInputChange(e)}
          value={inputValue}
          isLimitText
        />
        <Button
          text="Рассчитать"
          isLoader={isLoading}
          onClick={renderFibSeq}
          disabled={inputValue === 0 || inputValue > 19}
        />
      </form>
      <ul className={styles.list}>
        {circles.map((el, index) => (
          <li key={index}>
            <Circle
              letter={String(el)}
              state={ElementStates.Default}
              tail={String(index)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
