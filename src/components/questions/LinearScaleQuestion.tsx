import React, { useEffect, useState } from "react";
import QuestionBase from "./QuestionBase";
import { QuestionModel } from "../../types/form";
import { Box, Select, MenuItem, Typography } from "@mui/material";

interface LinearScaleQuestionProps {
  question: QuestionModel;
  onChange: (updatedQuestion: QuestionModel) => void;
  onDelete: () => void;
}

const LinearScaleQuestion: React.FC<LinearScaleQuestionProps> = ({
  question,
  onChange,
  onDelete,
}) => {
  const [min, setMin] = useState<number>(Number(question.options![0]));
  const [max, setMax] = useState<number>(Number(question.options![question.options!.length - 1]));

  const generateScale = (min: number, max: number) =>
    Array.from({ length: max - min + 1 }, (_, i) => i + min);

  useEffect(() => {
    onChange({ ...question, options: generateScale(min, max) });
  }, [min, max, onChange,question]);

  const renderScaleOption = (options: number[]) =>
    options.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));

  return (
    <QuestionBase question={question} onChange={onChange} onDelete={onDelete}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography>Scale from</Typography>
        <Select
          value={String(min)}
          onChange={(e) => setMin(Number(e.target.value))}
          sx={{ mx: 1 }}
          required
        >
          {renderScaleOption([0, 1])}
        </Select>
        <Typography>to</Typography>
        <Select
          value={String(max)}
          onChange={(e) => setMax(Number(e.target.value))}
          sx={{ mx: 1 }}
          required
        >
          {renderScaleOption(Array.from({ length: 9 }, (_, i) => i + 2))}
        </Select>
      </Box>
    </QuestionBase>
  );
};

export default LinearScaleQuestion;
