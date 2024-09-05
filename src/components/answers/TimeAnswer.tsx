import React from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";

interface TimeAnswerProps extends AnswerBaseProps {}

const TimeAnswer: React.FC<TimeAnswerProps> = ({
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
      <TimePicker
        value={answer ? moment(answer, "hh:mm a") : null}
        onChange={(event) => onChange(event?.format("hh:mm a") || "")}
        disabled={disable}
      />
    </AnswerBase>
  );
};

export default TimeAnswer;
