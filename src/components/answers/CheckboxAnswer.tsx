import React, { useEffect } from "react";
import AnswerBase, { AnswerBaseProps } from "./AnswerBase";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

interface CheckboxAnswerProps extends AnswerBaseProps {}

const CheckboxAnswer: React.FC<CheckboxAnswerProps> = ({
  question,
  answer,
  disable,
  onChange,
}) => {
  useEffect(() => {
    if (!Array.isArray(answer)) {
      onChange([]);
    }
  }, [answer,onChange]);

  return (
    <AnswerBase
      answer={answer}
      disable={disable}
      onChange={onChange}
      question={question}
    >
      {Array.isArray(answer) && (
        <FormControl>
          <FormGroup>
            {question.options &&
              question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      disabled={disable}
                      checked={
                        typeof option === "string" && answer.includes(option)
                      }
                      onChange={(event) => {
                        if (
                          event.target.checked &&
                          typeof option === "string"
                        ) {
                          onChange(answer.concat(option));
                        } else {
                          onChange(
                            answer.filter((answer) => answer !== option)
                          );
                        }
                      }}
                    />
                  }
                  label={option}
                ></FormControlLabel>
              ))}
          </FormGroup>
        </FormControl>
      )}
    </AnswerBase>
  );
};

export default CheckboxAnswer;
