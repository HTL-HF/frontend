import React, { useState } from "react";
import QuestionBase from "./QuestionBase";
import { TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const OptionQuestion: React.FC<{
  onDelete: () => void;
  onRequiredChange: () => void;
}> = ({ onDelete, onRequiredChange }) => {
  const [options, setOptions] = useState<string[]>(["Option 1"]);

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  return (
    <QuestionBase onDelete={onDelete} onRequiredChange={onRequiredChange}>
      {options.map((option, index) => (
        <TextField
          key={index}
          placeholder={option}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "10px" }}
        />
      ))}
      <IconButton aria-label="add-option" onClick={handleAddOption}>
        <AddIcon />
      </IconButton>
    </QuestionBase>
  );
};

export default OptionQuestion;
