import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { TextField } from "@mui/material";

interface LongAnswerProps extends AnswerBaseProps {}

const LongAnswer: React.FC<LongAnswerProps> = ({
  question,
  answer,
  disable,
  onChange,
}) => {
  return (
    <AnswerBase
      answer={answer}
      disable={disable}
      onChange={onChange}
      question={question}
    >
      <TextField
        required={question.required}
        disabled={disable}
        value={answer}
        multiline
        InputProps={{
          sx: {
            "& .MuiOutlinedInput-root": {
              "& textarea": {
                overflowY: "auto",
                resize: "none",
              },
            },
          },
        }}
        onChange={(e) => {
          onChange(
            question.type === "number" ? Number(e.target.value) : e.target.value
          );
        }}
        type={question.type}
        minRows={5}
      />
    </AnswerBase>
  );
};

export default LongAnswer;
