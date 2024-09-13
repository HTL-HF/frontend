import React from "react";
import { answerComponentMap, QuestionAnsweringModal } from "../../types/form";

interface AnswersProps {
  questions: QuestionAnsweringModal[];
  answers: {
    [id: string]: string | number | string[];
  };
  setAnswers: (answers: { [id: string]: string | number | string[] }) => void;
}

const Answers: React.FC<AnswersProps> = ({
  questions,
  answers,
  setAnswers,
}) => {
  return (
    <div>
      {questions.map((question) => {
        const AnswerComponent = answerComponentMap[question.viewType];
        return (
          <AnswerComponent
            disable={false}
            answer={answers[question.id]}
            onChange={(value) => {
              const newAnswers = { ...answers };
              newAnswers[question.id] = value;
              setAnswers(newAnswers);
            }}
            question={question}
            key={question.id}
          />
        );
      })}
    </div>
  );
};

export default Answers;
