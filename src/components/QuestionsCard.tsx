import React, { useState } from "react";
import { QuestionType, Quiz, questionPropsType } from "../types/quiz-types";
import styles from "./cards.module.css";

const QuestionCard: React.FC<questionPropsType> = ({
  question,
  options,
  callback,
}) => {
  let [selectedAns, setSelectedAns] = useState("");

  const handleSelection = (ev: any) => {
    // console.log(ev.target.value);
    setSelectedAns(ev.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h4>{question} </h4>
      </div>
      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
      >
        {options.map((opt: string, ind: number) => {
          return (
            <div key={ind}>
              <label>
                <input
                  onChange={handleSelection}
                  type="radio"
                  required
                  name="opt"
                  value={opt}
                  checked={selectedAns === opt}
                />
                {opt}
              </label>
            </div>
          );
        })}

        <input className={styles.but} type="submit" />
      </form>
    </div>
  );
};

export default QuestionCard;
