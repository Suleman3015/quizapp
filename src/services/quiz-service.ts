import React from "react";
import { QuestionType, Quiz } from "../types/quiz-types";

export const getQuizDetail = async (
  questions: number,
  level: string
): Promise<QuestionType[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${questions}&difficulty=${level}&type=multiple`
  );
  let { results } = await res.json();
  const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

  const quiz: QuestionType[] = results.map((questionObj: Quiz) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      correct_answer: questionObj.correct_answer,
      option: shuffleArray(
        questionObj.incorrect_answers.concat(questionObj.correct_answer)
      ),
    };
  });
  return quiz;
};
