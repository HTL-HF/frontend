import React from "react";
import QuestionBase from "./QuestionBase";
import { Select, MenuItem, Box, Typography, TextField } from "@mui/material";

const LinearScaleQuestion: React.FC<{
  onDelete: () => void;
  onRequiredChange: () => void;
}> = ({ onDelete, onRequiredChange }) => (
  <QuestionBase onDelete={onDelete} onRequiredChange={onRequiredChange}>
    <Box display="flex" alignItems="center">
      <TextField
        select
        defaultValue={0}
        variant="outlined"
        style={{ width: "60px", marginRight: "10px" }}
      >
        {[0, 1].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </TextField>
      <Typography>to</Typography>
      <TextField
        select
        defaultValue={2}
        variant="outlined"
        style={{ width: "60px", marginLeft: "10px" }}
      >
        {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  </QuestionBase>
);

export default LinearScaleQuestion;
