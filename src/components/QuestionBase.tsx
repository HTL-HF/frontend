import React from "react";
import { TextField, Switch, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const QuestionBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: "relative",
}));

// Base Component for Questions
const QuestionBase: React.FC<{
  onDelete: () => void;
  onRequiredChange: () => void;
  children: React.ReactNode;
}> = ({ children, onDelete, onRequiredChange }) => (
  <QuestionBox>
    <IconButton
      aria-label="delete"
      style={{ position: "absolute", top: 10, right: 10 }}
      onClick={onDelete}
    >
      <DeleteIcon />
    </IconButton>
    <TextField
      label="Title"
      placeholder="Title"
      variant="outlined"
      fullWidth
      required
      style={{ marginBottom: "10px" }}
    />
    <TextField
      label="Description"
      placeholder="Description"
      variant="outlined"
      fullWidth
      multiline
      rows={2}
      style={{ marginBottom: "10px" }}
    />
    {children}
    <Switch
      checked={false}
      onChange={onRequiredChange}
      color="primary"
      name="required"
      inputProps={{ "aria-label": "required switch" }}
      style={{ position: "absolute", bottom: 10, right: 10 }}
    />
  </QuestionBox>
);

export default QuestionBase;
