import React from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linked-list";
import { setInterval } from "../../utils/utils";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useState } from "react";

type TCircleEl = {
  value: string;
  state: ElementStates;
  head: string | React.ReactElement | null;
  tail: string | React.ReactElement | null;
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");

  const randomStringArr = (minLen: number, maxLen: number) => {
    const limit = Math.floor(Math.random() * (maxLen + 1 - minLen)) + minLen;
    const randomArr = [];
    for (let i = 0; i < limit; i++) {
      randomArr.push(Math.floor(Math.random() * 100).toString());
    }
    return randomArr;
  };

  const initialRandomArr = new LinkedList<string>(randomStringArr(3, 6));
  const [linkedList, setLinkedList] =
    useState<LinkedList<string>>(initialRandomArr);

  const [loadingInProgress, setloadingInProgress] = useState({
    addToHead: false,
    addToTail: false,
    removeHead: false,
    removeTail: false,
    addByIndex: false,
    removeByIndex: false,
    disabled: false,
  });

  const convertToCircleObj = (array: Array<string>): Array<TCircleEl> => {
    return array.map((el, i) => {
      const circle = {
        value: el,
        state: ElementStates.Default,
      };

      if (array.length === 1) {
        return { ...circle, head: HEAD, tail: TAIL };
      } else if (i === 0) {
        return { ...circle, head: HEAD, tail: null };
      } else if (i === array.length - 1) {
        return { ...circle, head: null, tail: TAIL };
      }
      return { ...circle, head: null, tail: null };
    });
  };

  const [circles, setCircles] = useState<Array<TCircleEl>>(
    convertToCircleObj(linkedList.toArray())
  );

  const onInputValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const onInputIndexChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputIndex(e.currentTarget.value);
  };

  const handleRemoveHead = async () => {
    const head = linkedList.getHead();
    if (head === null) {
      return;
    } else {
      setloadingInProgress({
        ...loadingInProgress,
        removeHead: true,
        disabled: true,
      });

      const listCopy = linkedList;
      let circlesToRender = circles;

      addSmallCircle(circlesToRender, circlesToRender[0].value, 0, TAIL);
      circlesToRender[0].value = "";
      setCircles([...circlesToRender]);
      await setInterval(500);
      listCopy.deleteHead();
      setLinkedList(listCopy);
      circlesToRender = convertToCircleObj(linkedList.toArray());
      setCircles([...circlesToRender]);

      setloadingInProgress({
        ...loadingInProgress,
        removeHead: false,
        disabled: false,
      });
    }
  };

  const handleRemoveTail = async () => {
    setloadingInProgress({
      ...loadingInProgress,
      removeTail: true,
      disabled: true,
    });

    const listCopy = linkedList;
    let circlesToRender = circles;
    const length = circlesToRender.length;

    addSmallCircle(
      circlesToRender,
      circlesToRender[length - 1].value,
      length - 1,
      TAIL
    );
    circlesToRender[length - 1].value = "";
    setCircles([...circlesToRender]);
    await setInterval(500);
    listCopy.deleteTail();
    setLinkedList(listCopy);
    circlesToRender = convertToCircleObj(linkedList.toArray());
    setCircles([...circlesToRender]);

    setloadingInProgress({
      ...loadingInProgress,
      removeTail: false,
      disabled: false,
    });
  };

  const addSmallCircle = (
    array: TCircleEl[],
    value: string,
    index: number,
    location: "head" | "tail"
  ) => {
    if (location === HEAD) {
      array[index].head = (
        <Circle letter={value} isSmall state={ElementStates.Changing} />
      );
    }
    if (location === TAIL) {
      array[index].tail = (
        <Circle letter={value} isSmall state={ElementStates.Changing} />
      );
    }
  };

  const handleAddToHead = async () => {
    setloadingInProgress({
      ...loadingInProgress,
      addToHead: true,
      disabled: true,
    });

    const input = inputValue;
    setInputValue("");
    const listCopy = linkedList;
    let circlesToRender = circles;

    listCopy.prepend(input);
    setLinkedList(listCopy);
    circlesToRender = convertToCircleObj(linkedList.toArray());

    addSmallCircle(circlesToRender, input, 0, HEAD);
    setCircles([...circlesToRender]);
    await setInterval(500);

    circlesToRender[0].state = ElementStates.Modified;
    setCircles([...circlesToRender]);
    await setInterval(500);

    setCircles([...convertToCircleObj(linkedList.toArray())]);

    setloadingInProgress({
      ...loadingInProgress,
      addToHead: false,
      disabled: false,
    });
  };

  const handleAddToTail = async () => {
    setloadingInProgress({
      ...loadingInProgress,
      addToTail: true,
      disabled: true,
    });

    const input = inputValue;
    setInputValue("");
    const listCopy = linkedList;
    let circlesToRender = circles;

    listCopy.append(input);
    setLinkedList(listCopy);
    circlesToRender = convertToCircleObj(linkedList.toArray());
    addSmallCircle(circlesToRender, input, circlesToRender.length - 1, HEAD);
    setCircles([...circlesToRender]);
    await setInterval(500);

    circlesToRender[circlesToRender.length - 1].state = ElementStates.Modified;
    setCircles([...circlesToRender]);
    await setInterval(500);

    setCircles([...convertToCircleObj(linkedList.toArray())]);

    setloadingInProgress({
      ...loadingInProgress,
      addToTail: false,
      disabled: false,
    });
  };

  const handleAddByIndex = async () => {
    if (
      parseInt(inputIndex) < 0 ||
      parseInt(inputIndex) > linkedList.getSize() - 1
    ) {
      console.log("Введите корректный индекс");
      setInputIndex("");
      return;
    }
    setloadingInProgress({
      ...loadingInProgress,
      addByIndex: true,
      disabled: true,
    });

    const index = parseInt(inputIndex);
    const value = inputValue;
    const listCopy = linkedList;
    let circlesToRender = circles;
    setInputValue("");
    setInputIndex("");

    if (index === 0) {
      addSmallCircle(circlesToRender, value, 0, HEAD);
      setCircles([...circlesToRender]);
      listCopy.prepend(value);
      await setInterval(500);

      setLinkedList(listCopy);
      circlesToRender = convertToCircleObj(linkedList.toArray());
      circlesToRender[0].state = ElementStates.Modified;
      setCircles([...circlesToRender]);
      await setInterval(500);

      setCircles([...convertToCircleObj(linkedList.toArray())]);
    } else {
      let curr = listCopy.getHead();
      let currIndex = 0;
      while (currIndex < index) {
        if (currIndex - 1 >= 0) {
          circlesToRender[currIndex - 1].head = null;
          circlesToRender[currIndex - 1].state = ElementStates.Changing;
        }

        addSmallCircle(circlesToRender, value, currIndex, HEAD);
        setCircles([...circlesToRender]);
        await setInterval(500);

        currIndex++;

        if (curr?.next && currIndex !== index) {
          curr = curr?.next;
        }
      }
      if (curr) {
        if (currIndex - 1 >= 0) {
          circlesToRender[currIndex - 1].head = null;
          circlesToRender[currIndex - 1].state = ElementStates.Changing;
        }

        addSmallCircle(circlesToRender, value, currIndex, HEAD);
        setCircles([...circlesToRender]);
        await setInterval(500);

        listCopy.addByIndex(value, index);
        setLinkedList(listCopy);
        circlesToRender = convertToCircleObj(linkedList.toArray());
        setCircles([...circlesToRender]);
        circlesToRender[currIndex].state = ElementStates.Modified;
        setCircles([...circlesToRender]);
        await setInterval(500);

        setCircles([...convertToCircleObj(linkedList.toArray())]);
      }
    }

    setloadingInProgress({
      ...loadingInProgress,
      addByIndex: false,
      disabled: false,
    });
  };

  const handleRemoveByIndex = async () => {
    if (
      parseInt(inputIndex) < 0 ||
      parseInt(inputIndex) > linkedList.getSize() - 1
    ) {
      setInputIndex("");
      return;
    }

    setloadingInProgress({
      ...loadingInProgress,
      removeByIndex: true,
      disabled: true,
    });

    const index = parseInt(inputIndex);
    const listCopy = linkedList;
    let circlesToRender = circles;
    setInputIndex("");
    const head = listCopy.getHead();

    if (index >= 0 && index < listCopy.getSize() && head) {
      let curr = head;
      let currIndex = 0;

      if (index === 0) {
        circlesToRender[0].state = ElementStates.Changing;
        setCircles([...circlesToRender]);
        await setInterval(500);
        circlesToRender[0].state = ElementStates.Default;
        addSmallCircle(circlesToRender, circlesToRender[0].value, 0, TAIL);
        circlesToRender[0].value = "";
        setCircles([...circlesToRender]);
        await setInterval(500);
        listCopy.deleteHead();
        setLinkedList(listCopy);
        circlesToRender = convertToCircleObj(linkedList.toArray());
        setCircles([...circlesToRender]);
      } else {
        while (currIndex < index) {
          circlesToRender[currIndex].state = ElementStates.Changing;
          setCircles([...circlesToRender]);
          await setInterval(500);
          currIndex++;
          if (curr.next) {
            curr = curr?.next;
          }
        }
        circlesToRender[currIndex].state = ElementStates.Changing;
        setCircles([...circlesToRender]);
        await setInterval(500);
        circlesToRender[currIndex].state = ElementStates.Default;
        addSmallCircle(
          circlesToRender,
          circlesToRender[currIndex].value,
          currIndex,
          TAIL
        );
        circlesToRender[currIndex].value = "";
        setCircles([...circlesToRender]);
        await setInterval(500);
        listCopy.deleteByIndex(index);
        setLinkedList(listCopy);
        circlesToRender = convertToCircleObj(linkedList.toArray());
        setCircles([...circlesToRender]);
      }
    }

    setloadingInProgress({
      ...loadingInProgress,
      removeByIndex: false,
      disabled: false,
    });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form}>
        <div className={styles.row}>
          <Input
            maxLength={4}
            isLimitText
            placeholder="Введите значение"
            extraClass={styles.input}
            onChange={(e) => onInputValueChange(e)}
            value={inputValue}
          />
          <Button
            text="Добавить в head"
            extraClass={styles.btn}
            onClick={handleAddToHead}
            disabled={inputValue === "" || loadingInProgress.disabled}
            isLoader={loadingInProgress.addToHead}
          />
          <Button
            text="Добавить в tail"
            extraClass={styles.btn}
            onClick={handleAddToTail}
            disabled={inputValue === "" || loadingInProgress.disabled}
            isLoader={loadingInProgress.addToTail}
          />
          <Button
            text="Удалить из head"
            extraClass={styles.btn}
            onClick={handleRemoveHead}
            disabled={
              linkedList.toArray().length === 0 || loadingInProgress.disabled
            }
            isLoader={loadingInProgress.removeHead}
          />
          <Button
            text="Удалить из tail"
            extraClass={styles.btn}
            onClick={handleRemoveTail}
            disabled={
              linkedList.toArray().length === 0 || loadingInProgress.disabled
            }
            isLoader={loadingInProgress.removeTail}
          />
        </div>
        <div className={styles.row}>
          <Input
            min={0}
            max={5}
            step={1}
            type="number"
            placeholder="Введите индекс"
            extraClass={styles.input}
            onChange={(e) => onInputIndexChange(e)}
            value={inputIndex}
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.btnIndex}
            onClick={handleAddByIndex}
            disabled={
              inputValue === "" ||
              inputIndex === "" ||
              loadingInProgress.disabled ||
              parseInt(inputIndex) < 0 ||
              parseInt(inputIndex) > linkedList.getSize() - 1
            }
            isLoader={loadingInProgress.addByIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.btnIndex}
            onClick={handleRemoveByIndex}
            disabled={
              inputIndex === "" ||
              loadingInProgress.disabled ||
              parseInt(inputIndex) < 0 ||
              parseInt(inputIndex) > linkedList.getSize() - 1
            }
            isLoader={loadingInProgress.removeByIndex}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {circles.map((element, index) => {
          return (
            <li key={index} className={styles.listItem}>
              <Circle
                letter={element.value}
                head={element.head}
                tail={element.tail}
                index={index}
                extraClass={styles.circle}
                state={element.state}
              />
              {index < circles.length - 1 && <ArrowIcon />}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
