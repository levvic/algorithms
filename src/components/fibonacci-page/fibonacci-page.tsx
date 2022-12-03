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
import { CONST_1, MAX_INPUT_VALUE_FIB } from "../../constants/restrictions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { fibonacciInput, fibonacciBtn } from "../../constants/dom-content";

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
      await setInterval(SHORT_DELAY_IN_MS);
      setCircles((state) => [...state, arr[i]]);
    }

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          max={MAX_INPUT_VALUE_FIB}
          min={CONST_1}
          step={CONST_1}
          type="number"
          placeholder="Введите число"
          extraClass={styles.input}
          onChange={(e) => onInputChange(e)}
          value={inputValue}
          dataCy={fibonacciInput}
          isLimitText
        />
        <Button
          text="Рассчитать"
          isLoader={isLoading}
          onClick={renderFibSeq}
          dataCy={fibonacciBtn}
          disabled={inputValue === 0 || inputValue > MAX_INPUT_VALUE_FIB}
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
