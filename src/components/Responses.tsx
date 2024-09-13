import React from "react";
import { answerComponentMap, QuestionAnsweringModal } from "../types/form";
import { AnswerModal } from "../types/response";

interface ResponsesProps {
  questions: QuestionAnsweringModal[];
  answers: AnswerModal[];
}

const Responses: React.FC<ResponsesProps> = ({ questions, answers }) => {
  return (
    <div>
      {questions.map((question) => {
        const AnswerComponent = answerComponentMap[question.viewType];
        const answerFromResponse = answers.find(
          (answer) => answer.questionId === question.id
        );
        return answerFromResponse ? (
          <AnswerComponent
            disable={true}
            answer={answerFromResponse.answer}
            question={question}
            key={question.id}
          />
        ) : null;
      })}
    </div>
  );
};

export default Responses;
