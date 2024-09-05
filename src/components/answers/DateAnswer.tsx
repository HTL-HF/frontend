import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
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
      <DatePicker
        value={moment(answer)}
        onChange={(event) => onChange(event?.toISOString() || "")}
        disabled={disable}
      />
    </AnswerBase>
  );
};

export default DateAnswer;
