import React, { ReactNode } from "react";
import {
  TextField,
  Switch,
  IconButton,
  Box,
  Typography,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { QuestionModel } from "../types/form";

const QuestionBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: "relative",
}));

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
        style={{ marginBottom: "10px" }}
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
        style={{ marginBottom: "10px" }}
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
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </QuestionBox>
  );
};

export default QuestionBase;
