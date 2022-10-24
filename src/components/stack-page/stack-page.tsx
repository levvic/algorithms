import React from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { useState } from "react";
import { Stack } from "./stack";
import { TElement } from "../../types/element-type";
import { ElementStates } from "../../types/element-states";
import { setInterval } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_ELEMENTS, MAX_INPUT_LENGTH } from "../../constants/restrictions";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stack, setStack] = useState(new Stack<TElement<string>>());
  const [circles, setCircles] = useState<TElement<string>[]>([]);
  const [loadingFlag, setLoadingFlag] = useState({
    add: false,
    delete: false,
  });

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleAddClick = async () => {
    setLoadingFlag({
      ...loadingFlag,
      add: true,
    });
    const stackCopy = stack;
    stackCopy.push({ value: inputValue, state: ElementStates.Changing });
    setInputValue("");
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    await setInterval(SHORT_DELAY_IN_MS);
    stackCopy.peek()!.state = ElementStates.Default;
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    setLoadingFlag({
      ...loadingFlag,
      add: false,
    });
  };

  const handleDeleteClick = async () => {
    setLoadingFlag({
      ...loadingFlag,
      delete: true,
    });
    const stackCopy = stack;
    stackCopy.peek()!.state = ElementStates.Changing;
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    await setInterval(SHORT_DELAY_IN_MS);
    stackCopy.pop();
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    setLoadingFlag({
      ...loadingFlag,
      delete: false,
    });
  };

  const handleClearClick = async () => {
    const stackCopy = stack;
    stackCopy.clear();
    setStack(stackCopy);
    setCircles([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.form}>
        <Input
          maxLength={MAX_INPUT_LENGTH}
          isLimitText
          placeholder="Введите текст"
          extraClass={styles.input}
          onChange={(e) => onInputChange(e)}
          value={inputValue}
        />
        <Button
          text="Добавить"
          extraClass={styles.btn}
          onClick={handleAddClick}
          disabled={inputValue === "" || stack.getSize() > MAX_ELEMENTS || loadingFlag.delete}
          isLoader={loadingFlag.add}
        />
        <Button
          text="Удалить"
          extraClass={styles.btn}
          onClick={handleDeleteClick}
          disabled={stack.getSize() === 0 || loadingFlag.add}
          isLoader={loadingFlag.delete}
        />
        <Button
          text="Очистить"
          extraClass={styles.btn}
          onClick={handleClearClick}
          disabled={stack.getSize() === 0 || loadingFlag.add || loadingFlag.delete}
        />
      </div>
      <ul className={styles.list}>
        {circles.map((element, index) => {
          return (
            <li className={styles.listItem} key={index}>
              <Circle
                letter={element.value}
                index={index}
                head={index === stack.getSize() - 1 ? "top" : null}
                state={element.state}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
