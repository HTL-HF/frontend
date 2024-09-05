import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { FormControl } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";

interface TimeAnswerProps extends AnswerBaseProps {}

const TimeAnswer: React.FC<TimeAnswerProps> = ({
  question,
  answer,
  disable,
  onChange,
}) => {
  console.log(answer);
  return (
    <AnswerBase
      answer={answer}
      disable={disable}
      onChange={onChange}
      question={question}
    >
      <FormControl required={question.required}>
        <TimePicker
          value={answer ? moment(answer, "hh:mm a") : null}
          onChange={(event) => (event ? onChange(event.format("hh:mm a")) : "")}
        />
      </FormControl>
    </AnswerBase>
  );
};

export default TimeAnswer;
