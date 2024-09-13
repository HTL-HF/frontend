import React from "react";
import { questionComponentMap, QuestionModel } from "../../types/form";

interface QuestionsProps {
  handleQuestionChange: (index: number, updatedQuestion: QuestionModel) => void;
  questions: QuestionModel[];
  handleQuestionDelete: (index: number) => void;
}
const Questions: React.FC<QuestionsProps> = ({
  questions,
  handleQuestionChange,
  handleQuestionDelete,
}) => {
  return (
    <>
      {questions.map((question, index) => {
        const QuestionComponent = questionComponentMap[question.viewType];

        return (
          <QuestionComponent
            key={index}
            question={question}
            onChange={(updatedQuestion: QuestionModel) =>
              handleQuestionChange(index, updatedQuestion)
            }
            onDelete={() => handleQuestionDelete(index)}
          />
        );
      })}
    </>
  );
};

export default Questions;
