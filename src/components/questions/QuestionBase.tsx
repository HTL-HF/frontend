import React, { ReactNode } from "react";
import {
  TextField,
  Switch,
  Box,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { QuestionModel } from "../../types/form";
import DeleteButton from "../buttons/DeleteButton";
import QuestionBox from "./QuestionBox";



interface QuestionBaseProps {
  question: QuestionModel;
  onChange: (updatedQuestion: QuestionModel) => void;
  onDelete: () => void;
  children?: ReactNode;
}

const QuestionBase: React.FC<QuestionBaseProps> = ({
  question,
  onChange,
  onDelete,
  children,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...question, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...question, description: e.target.value });
  };

  const handleRequiredChange = () => {
    onChange({ ...question, required: !question.required });
  };

  return (
    <QuestionBox>
      <Typography variant="subtitle1" gutterBottom>
        {question.viewType.replace(/_/g, " ")}
      </Typography>
      <TextField
        label="Title"
        placeholder="Title"
        variant="outlined"
        fullWidth
        required
        value={question.title}
        onChange={handleTitleChange}
      />
      <TextField
        label="Description"
        placeholder="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={question.description}
        onChange={handleDescriptionChange}
      />
      {children}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={question.required}
              onChange={handleRequiredChange}
              color="primary"
            />
          }
          label="Required"
          style={{ marginLeft: 0 }}
        />
        <DeleteButton onClick={onDelete} />
      </Box>
    </QuestionBox>
  );
};

export default QuestionBase;
