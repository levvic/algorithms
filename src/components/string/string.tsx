import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyles from "./string.module.css";
import { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { setInterval } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "../../types/element-type";
import { reverseBtn, reverseInput } from "../../constants/dom-content";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [elements, setElements] = useState<TElement<string>[]>([]);
  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateCircles = () => {
    setCircles(elements.map((el, index) => {
      return (
        <li key={index} >
        <Circle 
          letter = {el.value}
          state = {el.state}
        />
      </li>
      )
    }));
  }

  const onBtnClick = async () => {
    setIsLoading(true);
    updateCircles();

    const mid = elements.length % 2 === 0 ? Math.floor(elements.length / 2) - 1: Math.floor(elements.length / 2);

    let temp: TElement<string>;    
    for (let i = 0; i <= mid; i++) {
      setTimeout(function() {
        elements[i].state = ElementStates.Changing;
        elements[elements.length - i - 1].state = ElementStates.Changing;
        setElements(elements);
        updateCircles();
        setTimeout(function() {
          temp = elements[elements.length - i - 1];
          elements[elements.length - i - 1] = elements[i];
          elements[i] = temp;
          elements[i].state = ElementStates.Modified;
          elements[elements.length - i - 1].state = ElementStates.Modified;
          setElements(elements);
          updateCircles();
        }, DELAY_IN_MS)
      }, DELAY_IN_MS);
      await setInterval(DELAY_IN_MS);
    }

    setIsLoading(false);
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setElements(
      e.currentTarget.value.split("").map((el) => {
        return {
          value: el,
          state: ElementStates.Default,
        };
      })
    );
  };

  return (
    <SolutionLayout title="Строка">
      <form className={stringStyles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          maxLength={11}
          extraClass={stringStyles.input}
          onChange={(e) => onInputChange(e)}
          value={inputValue}
          dataCy={reverseInput}
        />
        <Button
          disabled={inputValue === ""}
          isLoader={isLoading}
          text="Развернуть"
          onClick={onBtnClick}
          dataCy={reverseBtn}
        />
      </form>
      <ul className={stringStyles.list}>{circles}</ul>
    </SolutionLayout>
  );
};
