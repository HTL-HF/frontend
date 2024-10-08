import React from "react";
import QuestionBase from "./QuestionBase";
import { QuestionModel } from "../../types/form";
import { Switch, FormControlLabel } from "@mui/material";

interface ShortLongAnswerProps {
  question: QuestionModel;
  onChange: (updatedQuestion: QuestionModel) => void;
  onDelete: () => void;
}

const OpenQuestion: React.FC<ShortLongAnswerProps> = ({
  question,
  onChange,
  onDelete,
}) => {
  const handleTypeChange = () => {
    onChange({
      ...question,
      type: question.type === "string" ? "number" : "string",
    });
  };

  return (
    <QuestionBase question={question} onChange={onChange} onDelete={onDelete}>
      <FormControlLabel
        control={
          <Switch
            checked={question.type === "number"}
            onChange={handleTypeChange}
            color="primary"
          />
        }
        label="Number Input"
        style={{ marginLeft: 0, marginBottom: "10px" }}
      />
    </QuestionBase>
  );
};

export default OpenQuestion;
