import { Box, styled, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { QuestionAnsweringModal } from "../../types/form";

const AnswerBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: "relative",
}));

export interface AnswerBaseProps {
  question: QuestionAnsweringModal;
  children?: ReactNode;
  answer: number | string | string[];
  disable: boolean;
  onChange: (value: string | number | string[]) => void;
}

const AnswerBase: React.FC<AnswerBaseProps> = ({ question, children }) => {
  return (
    <AnswerBox>
      <Typography variant="h5" marginBottom="16px">
        {question.title} {question.required ? "*" : ""}
      </Typography>
      {question.description && (
        <Typography variant="body1" marginBottom="16px">
          {question.description}
        </Typography>
      )}
      {children}
    </AnswerBox>
  );
};

export default AnswerBase;
