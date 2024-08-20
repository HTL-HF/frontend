import React from "react";
import QuestionBase from "./QuestionBase";
import { QuestionModel } from "../types/form";
import { TextField, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteButton from "./buttons/DeleteButton";

interface OptionQuestionProps {
  question: QuestionModel;
  onChange: (updatedQuestion: QuestionModel) => void;
  onDelete: () => void;
}

const OptionQuestion: React.FC<OptionQuestionProps> = ({
  question,
  onChange,
  onDelete,
}) => {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions[index] = value;
    onChange({ ...question, options: updatedOptions });
  };

  const handleAddOption = () => {
    const updatedOptions = [...(question.options || []), ""];
    onChange({ ...question, options: updatedOptions });
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions.splice(index, 1);
    onChange({ ...question, options: updatedOptions });
  };

  return (
    <QuestionBase question={question} onChange={onChange} onDelete={onDelete}>
      {(question.options || []).map((option, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <TextField
            label={`Option ${index + 1}`}
            placeholder="Option"
            variant="outlined"
            fullWidth
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={{ marginRight: "10px" }}
            required
          />
          {index !== 0 && (
            <DeleteButton onClick={() => handleDeleteOption(index)} />
          )}
        </Box>
      ))}
      <IconButton aria-label="add" color="primary" onClick={handleAddOption}>
        <AddIcon />
      </IconButton>
    </QuestionBase>
  );
};

export default OptionQuestion;
