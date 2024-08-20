import React, { ReactNode } from "react";
import QuestionBase from "./QuestionBase";
import { QuestionModel } from "../types/form";
import { Box, Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";

interface LinearScaleQuestionProps {
  question: QuestionModel;
  onChange: (updatedQuestion: QuestionModel) => void;
  onDelete: () => void;
}

const LinearScaleQuestion: React.FC<LinearScaleQuestionProps> = ({ question, onChange, onDelete }) => {
  const handleMinChange = (event: SelectChangeEvent) => {
    const updatedOptions = [Number(event.target.value), question.options![1]];
    onChange({ ...question, options: updatedOptions });
  };

  const handleMaxChange = (event: SelectChangeEvent) => {
    const updatedOptions = [question.options![0], Number(event.target.value)];
    onChange({ ...question, options: updatedOptions });
  };

  return (
    <QuestionBase question={question} onChange={onChange} onDelete={onDelete}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography>Scale from</Typography>
        <Select value={String(question.options![0])} onChange={handleMinChange} style={{ margin: "0 10px" }}>
          {Array.from([0,1]).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Typography>to</Typography>
        <Select value={String(question.options![1])} onChange={handleMaxChange} style={{ margin: "0 10px" }}>
          {Array.from({ length: 9 }, (_, i) => i + 2).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </QuestionBase>
  );
};

export default LinearScaleQuestion;
