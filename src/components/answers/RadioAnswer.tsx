import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioAnswerProps extends AnswerBaseProps {}

const RadioAnswer: React.FC<RadioAnswerProps> = ({
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
      <FormControl required={question.required}>
        <RadioGroup
          value={answer}
          onChange={(event) => onChange(event.target.value)}
        >
          {question.options &&
            question.options.map((option, index) => (
              <FormControlLabel
                value={option}
                disabled={disable}
                key={index}
                control={<Radio />}
                label={option}
              ></FormControlLabel>
            ))}
        </RadioGroup>
      </FormControl>
    </AnswerBase>
  );
};

export default RadioAnswer;
