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

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [queue, setQueue] = useState(new Queue<TElement<string>>(7));
  const [circles, setCircles] = useState<(TElement<string> | null)[]>(
    queue.getElements()
  );

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleAddClick = async () => {
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
  }

  const handleDeleteClick = async () => {    
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
          maxLength={4}
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
          disabled={inputValue === ""}
        />
        <Button
          text="Удалить"
          extraClass={styles.btn}
          onClick={handleDeleteClick}
          disabled={queue.isEmpty()}
        />
        <Button
          text="Очистить"
          extraClass={styles.btn}
          onClick={handleClearClick}
          disabled={queue.isEmpty()}
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
