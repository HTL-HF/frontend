import { FormControl, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { QuestionAnsweringModal } from "../../types/form";
import QuestionBox from "../questions/QuestionBox";

export interface AnswerBaseProps {
  question: QuestionAnsweringModal;
  children?: ReactNode;
  answer: number | string | string[];
  disable: boolean;
  onChange: (value: string | number | string[]) => void;
}

const AnswerBase: React.FC<AnswerBaseProps> = ({ question, children }) => {
  return (
    <QuestionBox>
      <Typography variant="h5" marginBottom="16px">
        {question.title} {question.required ? "*" : ""}
      </Typography>
      {question.description && (
        <Typography variant="body1" marginBottom="16px">
          {question.description}
        </Typography>
      )}
      <FormControl>{children}</FormControl>
    </QuestionBox>
  );
};

export default AnswerBase;
