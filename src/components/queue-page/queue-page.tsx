import React from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { setInterval } from "../../utils/utils";
import { useState } from "react";
import { TElement } from "../../types/element-type";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_ELEMENTS, MAX_INPUT_LENGTH } from "../../constants/restrictions";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [queue, setQueue] = useState(new Queue<TElement<string>>(MAX_ELEMENTS));
  const [circles, setCircles] = useState<(TElement<string> | null)[]>(
    queue.getElements()
  );
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
    const queueCopy = queue;
    queueCopy.enqueue({value: inputValue, state: ElementStates.Changing});
    setInputValue('');
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    await setInterval(SHORT_DELAY_IN_MS);
    const lastElement = queueCopy.getElements()[queueCopy.getTail()];
    if (lastElement !== null) {
      lastElement.state = ElementStates.Default;
    }
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    setLoadingFlag({
      ...loadingFlag,
      add: false,
    });
  }

  const handleDeleteClick = async () => {  
    setLoadingFlag({
      ...loadingFlag,
      delete: true,
    });  
    const queueCopy = queue;
    const firstElement = queueCopy.peek();
    if (firstElement !== null) {
      firstElement.state = ElementStates.Changing;
    }    
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    await setInterval(SHORT_DELAY_IN_MS);
    queueCopy.dequeue();
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    setLoadingFlag({
      ...loadingFlag,
      delete: false,
    });
  }

  const handleClearClick = () => {
    const queueCopy = queue;
    queueCopy.clear();
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
  }

  return (
    <SolutionLayout title="Очередь">
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
          disabled={inputValue === "" || loadingFlag.delete || (!queue.isEmpty() && queue.getElements()[MAX_ELEMENTS-1] != null)}
          isLoader={loadingFlag.add}
        />
        <Button
          text="Удалить"
          extraClass={styles.btn}
          onClick={handleDeleteClick}
          disabled={queue.isEmpty() || loadingFlag.add}
          isLoader={loadingFlag.delete}
        />
        <Button
          text="Очистить"
          extraClass={styles.btn}
          onClick={handleClearClick}
          disabled={queue.isEmpty() || loadingFlag.delete || loadingFlag.add}
        />
      </div>
      <ul className={styles.list}>
        
        {queue.isEmpty() &&
          circles.map((element, index) => {
            return (
              <li className={styles.listItem} key={index}>
                <Circle letter="" index={index} />
              </li>
            );
          })}

        {!queue.isEmpty() &&
          circles.map((element, index) => {
            return (
              <li className={styles.listItem} key={index}>
                <Circle
                  letter={element ? element.value : ""}
                  index={index}
                  head={queue.getHead() === index ? "top" : null}
                  tail={queue.getTail() === index ? "tail" : null}
                  state={element ? element.state : ElementStates.Default}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
