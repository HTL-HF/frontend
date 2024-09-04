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
  const generateScale = (min: number, max: number) => {
    const scale = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    return scale;
  };
  console.log(question.options);
  const [min, setMin] = useState<number>(Number(question.options![0]));
  const [max, setMax] = useState<number>(
    Number(question.options![question.options!.length - 1])
  );

  useEffect(() => {
    onChange({ ...question, options: generateScale(min, max) });
  }, [min, max]);

  return (
    <QuestionBase question={question} onChange={onChange} onDelete={onDelete}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography>Scale from</Typography>
        <Select
          value={String(min)}
          onChange={(event) => setMin(Number(event.target.value))}
          style={{ margin: "0 10px" }}
          required
        >
          {Array.from([0, 1]).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Typography>to</Typography>
        <Select
          value={String(max)}
          onChange={(event) => setMax(Number(event.target.value))}
          style={{ margin: "0 10px" }}
          required
        >
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
