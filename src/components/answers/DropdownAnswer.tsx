import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { FormControl, MenuItem, Select } from "@mui/material";

interface DropdownAnswerProps extends AnswerBaseProps {}

const DropdownAnswer: React.FC<DropdownAnswerProps> = ({
  question,
  answer,
  disable,
  onChange,
}) => {
  if (!answer && question.options) {
    onChange(question.options[0]);
  }
  return (
    <AnswerBase
      answer={answer}
      disable={disable}
      onChange={onChange}
      question={question}
    >
      {question.options && (
        <FormControl>
          <Select
            defaultValue={question.options[0]}
            required={question.required}
            disabled={disable}
            value={answer ? answer : question.options[0]}
            onChange={(event) => onChange(event.target.value)}
          >
            {question.options &&
              question.options.map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </AnswerBase>
  );
};

export default DropdownAnswer;
