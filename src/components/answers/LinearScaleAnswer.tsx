import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface LinearScaleAnswerProps extends AnswerBaseProps {}

const LinearScaleAnswer: React.FC<LinearScaleAnswerProps> = ({
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
          row
          value={answer?answer:null}
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

export default LinearScaleAnswer;
