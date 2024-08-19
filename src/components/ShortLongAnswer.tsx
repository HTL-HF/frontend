import React from "react";
import QuestionBase from "./QuestionBase";
import { Switch, FormControlLabel, Typography } from "@mui/material";

const ShortLongAnswer: React.FC<{
  onDelete: () => void;
  onRequiredChange: () => void;
  onInputTypeChange: () => void;
}> = ({ onDelete, onRequiredChange, onInputTypeChange }) => (
  <QuestionBase onDelete={onDelete} onRequiredChange={onRequiredChange}>
    <Switch
      checked={false}
      onChange={onInputTypeChange}
      color="primary"
      name="numeric-input"
      inputProps={{ "aria-label": "numeric input switch" }}
    />
    <Typography style={{ marginLeft: "10px" }}>Numeric Input</Typography>
  </QuestionBase>
);

export default ShortLongAnswer;
