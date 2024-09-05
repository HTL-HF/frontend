import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { FormControl, TextField } from "@mui/material";

interface AnswerShortProps extends AnswerBaseProps {}

const ShortAnswer: React.FC<AnswerShortProps> = ({
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
      <FormControl>
        <TextField
          required={question.required}
          disabled={disable}
          value={answer}
          onChange={(e) => {
            onChange(
              question.type === "number"
                ? Number(e.target.value)
                : e.target.value
            );
          }}
          type={question.type}
        />
      </FormControl>
    </AnswerBase>
  );
};

export default ShortAnswer;
