import React, { useEffect, useState } from "react";
import { IconButton, TextField, Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";

interface ResponsesNavigatorProps {
  currentIndex: number;
  startIndex: number;
  endIndex: number;
  onChangeIndex: (newIndex: number) => void;
  onDelete: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const NavigatorBar: React.FC<ResponsesNavigatorProps> = ({
  currentIndex,
  startIndex,
  endIndex,
  onChangeIndex,
  onDelete,
}) => {
  const [inputValue, setInputValue] = useState<number>(currentIndex);

  // Sync inputValue with currentIndex whenever it changes
  useEffect(() => {
    setInputValue(currentIndex);
  }, [currentIndex]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= startIndex && value <= endIndex) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    onChangeIndex(inputValue);
  };

  const goBack = () => {
    if (currentIndex > startIndex) {
      onChangeIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < endIndex) {
      onChangeIndex(currentIndex + 1);
    }
  };

  return (
    <StyledBox>
      <Box display="flex" alignItems="center">
        <IconButton onClick={goBack} disabled={currentIndex === startIndex}>
          <ArrowBack />
        </IconButton>

        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            min: startIndex,
            max: endIndex,
            style: { textAlign: "center" },
          }}
          style={{ width: "60px", margin: "0 10px" }}
        />

        <Typography variant="body1" style={{ marginRight: "10px" }}>
          / {endIndex}
        </Typography>

        <IconButton onClick={goForward} disabled={currentIndex === endIndex}>
          <ArrowForward />
        </IconButton>
      </Box>

      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </StyledBox>
  );
};

export default NavigatorBar;
