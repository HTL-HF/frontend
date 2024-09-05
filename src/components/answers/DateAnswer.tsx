import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

interface DateAnswerProps extends AnswerBaseProps {}

const DateAnswer: React.FC<DateAnswerProps> = ({
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
        <DatePicker
          value={moment(answer)}
          onChange={(event) => (event ? onChange(event.toISOString()) : "")}
        />
      </FormControl>
    </AnswerBase>
  );
};

export default DateAnswer;
