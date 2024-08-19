import React, { useState } from "react";
import {
  Container,
  TextField,
  Fab,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import ShortLongAnswer from "../components/ShortLongAnswer";
import OptionQuestion from "../components/OptionQuestion";
import LinearScaleQuestion from "../components/LinearScaleQuestion";
import QuestionBase from "../components/QuestionBase";

const AddButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const CreateFormPage = () => {
  const [questions, setQuestions] = useState<React.ReactNode[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAddButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addQuestion = (question: React.ReactNode) => {
    setQuestions([...questions, question]);
    handleMenuClose();
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <TextField
        label="Title"
        placeholder="Title"
        variant="outlined"
        fullWidth
        required
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Description"
        placeholder="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        style={{ marginBottom: "20px" }}
      />

      {questions.map((question, index) => (
        <React.Fragment key={index}>{question}</React.Fragment>
      ))}

      <AddButton aria-label="add" onClick={handleAddButtonClick}>
        <AddIcon />
      </AddButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() =>
            addQuestion(
              <ShortLongAnswer
                onDelete={() => {}}
                onRequiredChange={() => {}}
                onInputTypeChange={() => {}}
              />
            )
          }
        >
          <ShortTextIcon />
          Short Answer
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <ShortLongAnswer
                onDelete={() => {}}
                onRequiredChange={() => {}}
                onInputTypeChange={() => {}}
              />
            )
          }
        >
          <SubjectIcon />
          Long Answer
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <OptionQuestion onDelete={() => {}} onRequiredChange={() => {}} />
            )
          }
        >
          <CheckBoxIcon />
          Multiple Select
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <OptionQuestion onDelete={() => {}} onRequiredChange={() => {}} />
            )
          }
        >
          <RadioButtonCheckedIcon />
          Single Select
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <OptionQuestion onDelete={() => {}} onRequiredChange={() => {}} />
            )
          }
        >
          <ArrowDropDownCircleIcon />
          Dropdown
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <LinearScaleQuestion
                onDelete={() => {}}
                onRequiredChange={() => {}}
              />
            )
          }
        >
          <LinearScaleIcon />
          Linear Scale
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <QuestionBase onDelete={() => {}} onRequiredChange={() => {}}>
                <Typography>Time Question</Typography>
              </QuestionBase>
            )
          }
        >
          <AccessTimeIcon />
          Time
        </MenuItem>
        <MenuItem
          onClick={() =>
            addQuestion(
              <QuestionBase onDelete={() => {}} onRequiredChange={() => {}}>
                <Typography>Date Question</Typography>
              </QuestionBase>
            )
          }
        >
          <CalendarTodayIcon />
          Date
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default CreateFormPage;
