import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface RadioLinearAnswerProps extends AnswerBaseProps {}

const RadioLinearAnswer: React.FC<RadioLinearAnswerProps> = ({
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
      <RadioGroup
        row={question.viewType === "LINEAR"}
        value={answer ? answer : null}
        onChange={(event) => onChange(event.target.value)}
      >
        {question.options?.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio disabled={disable} />}
            label={option}
          />
        ))}
      </RadioGroup>{" "}
    </AnswerBase>
  );
};

export default RadioLinearAnswer;
