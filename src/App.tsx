import React, { useEffect, useState } from "react";
import "./App.css";
import { getQuizDetail } from "./services/quiz-service";
import { Quiz, QuestionType } from "./types/quiz-types";
import QuestionCard from "./components/QuestionsCard";

function App() {
  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [goal, setGoal] = useState(0);
  let [showResult, setShowResult] = useState(false);
  const pass = {
    color: "green",
  };
  let [count, SetCount] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetail(5, "easy");
      console.log(questions);
      setQuiz(questions);
    }
    fetchData();
  }, []);
  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: QuestionType = quiz[currentStep];
    console.log(
      " correct ans: " +
        currentQuestion.correct_answer +
        " user select " +
        userAns
    );

    if (userAns == currentQuestion.correct_answer) {
      setGoal(++goal);
    }
    console.log(goal);

    if (currentStep !== quiz.length - 1) setCurrentStep(++currentStep);
    else {
      // alert("quiz completed");

      setShowResult(true);
    }
  };

  if (showResult && goal >= 2) {
    return (
      <div className="result">
        <h1> Result</h1>
        <h2 className="pass"> PASSED</h2>
        <p>
          you score is {goal} out of {quiz.length}
        </p>
      </div>
    );
  }
  if (showResult && goal <= 2) {
    return (
      <div className="result">
        <h1> Result</h1>
        <h2 className="fail"> FAILED</h2>
        <p>
          you score is {goal} out of {quiz.length}
        </p>
      </div>
    );
  }
  if (!quiz.length) return <h3>loading..</h3>;

  return (
    <div>
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
