import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { setInterval } from "../../utils/utils";
import { SortType } from "../../types/sort-type";
import { useState, ChangeEvent } from "react";
import { randomArr } from "./utils";
import { swap } from "../../utils/utils";
import { TElement } from "../../types/element-type";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState("select");
  const [directionType, setDirectionType] = useState("");
  const [array, setArray] = useState<TElement<number>[]>(randomArr());
  const [inProcessFlag, setInProcessFlag] = useState<boolean>(false);

  const generateArrBtnHandler = () => {
    setArray(randomArr());
  };

  const radioBtnHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingType(evt.target.value);
  };

  const selectionSort = async (
    arr: TElement<number>[],
    direction: Direction
  ) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let baseIndex = i;
      arr[i].state = ElementStates.Changing;
      setArray([...arr]);

      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await setInterval(1000);

        if (
          direction === Direction.Ascending &&
          arr[baseIndex].value > arr[j].value
        ) {
          baseIndex = j;
        }

        if (
          direction === Direction.Descending &&
          arr[baseIndex].value < arr[j].value
        ) {
          baseIndex = j;
        }

        arr[j].state = ElementStates.Default;
        setArray([...arr]);
      }

      swap<TElement<number>>(arr, baseIndex, i);
      arr[baseIndex].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setArray([...arr]);
  };

  const bubbleSort = async (arr: TElement<number>[], direction: Direction) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArray([...arr]);
        await setInterval(1000);

        if (
          direction === Direction.Ascending &&
          arr[j].value > arr[j + 1].value
        ) {
          swap(arr, j, j + 1);
        }
        if (
          direction === Direction.Descending &&
          arr[j].value < arr[j + 1].value
        ) {
          swap(arr, j, j + 1);
        }

        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
  };

  const startAscendingSort = async () => {
    setDirectionType(Direction.Ascending);
    setInProcessFlag(true);

    if (sortingType == SortType.SelectionSort) {
      await selectionSort(array, Direction.Ascending);
    } else if (sortingType == SortType.BubbleSort) {
      await bubbleSort(array, Direction.Ascending);
    }

    setInProcessFlag(false);
  };

  const startDescendingSort = async () => {
    setDirectionType(Direction.Descending);
    setInProcessFlag(true);

    if (sortingType == SortType.SelectionSort) {
      await selectionSort(array, Direction.Descending);
    } else if (sortingType == SortType.BubbleSort) {
      await bubbleSort(array, Direction.Descending);
    }

    setInProcessFlag(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <RadioInput
          label="Выбор"
          name="sortingType"
          value={SortType.SelectionSort}
          checked={sortingType === SortType.SelectionSort}
          disabled={inProcessFlag}
          onChange={radioBtnHandler}
        />
        <RadioInput
          label="Пузырек"
          name="sortingType"
          value={SortType.BubbleSort}
          checked={sortingType === SortType.BubbleSort}
          disabled={inProcessFlag}
          onChange={radioBtnHandler}
        />
        <div className={styles.direction}>
          <Button
            extraClass={styles.directionBtn}
            text="По возрастанию"
            onClick={startAscendingSort}
            sorting={Direction.Ascending}
            isLoader={inProcessFlag && directionType === Direction.Ascending}
            disabled={inProcessFlag && directionType !== Direction.Ascending}
          />
          <Button
            extraClass={styles.directionBtn}
            text="По убыванию"
            onClick={startDescendingSort}
            sorting={Direction.Descending}
            isLoader={inProcessFlag && directionType === Direction.Descending}
            disabled={inProcessFlag && directionType !== Direction.Descending}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={generateArrBtnHandler}
          disabled={inProcessFlag}
        />
      </div>

      <ul className={styles.list}>
        {array.map((el, index) => (
          <li key={index}>
            <Column index={el.value} state={el.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
