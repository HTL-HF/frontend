import React, { useState } from "react";
import {
  Container,
  TextField,
  Fab,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CreateFormMenu from "../components/CreateFormMenu";
import ShortLongAnswer from "../components/ShortLongAnswer";
import OptionQuestion from "../components/OptionQuestion";
import LinearScaleQuestion from "../components/LinearScaleQuestion";
import { FormModel, QuestionModel } from "../types/form";
import QuestionBase from "../components/QuestionBase";

const CreateFormPage = () => {
  const [form, setForm] = useState<FormModel>({
    filename: "New Form",
    title: "",
    description: "",
    questions: [],
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAddButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddQuestion = (viewType: QuestionModel["viewType"]) => {
    const newQuestion: QuestionModel = {
      title: "",
      description: "",
      required: false,
      options:
        viewType === "LINEAR"
          ? [0, 2]
          : viewType === "CHECKBOX" ||
            viewType === "RADIO" ||
            viewType === "DROPDOWN"
          ? [""]
          : undefined,
      type: viewType === "SHORT" || viewType === "LONG" ? "STRING" : "NUMBER",
      viewType,
    };
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setAnchorEl(null);
  };

  const handleQuestionChange = (
    index: number,
    updatedQuestion: QuestionModel
  ) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index] = updatedQuestion;
    setForm((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleQuestionDelete = (index: number) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions.splice(index, 1);
    setForm((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSave = () => {
    if (form.questions.some((q) => q.required && !q.title)) {
      alert("All required fields must be filled!");
      return;
    }
    console.log("Form Data:", form);
    // Implement saving logic here
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Fab
        color="primary"
        style={{ position: "fixed", top: 38, right: 16 }}
        onClick={handleSave}
      >
        <SaveIcon />
      </Fab>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <TextField
          label="Title"
          placeholder="Title"
          variant="outlined"
          fullWidth
          required
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ marginBottom: "20px" }}
        />
      </Box>
      <TextField
        label="Description"
        placeholder="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        style={{ marginBottom: "20px" }}
      />

      {form.questions.map((question, index) => {
        const questionProps = {
          question,
          onChange: (updatedQuestion: QuestionModel) =>
            handleQuestionChange(index, updatedQuestion),
          onDelete: () => handleQuestionDelete(index),
        };

        switch (question.viewType) {
          case "SHORT":
          case "LONG":
            return <ShortLongAnswer key={index} {...questionProps} />;
          case "CHECKBOX":
          case "RADIO":
          case "DROPDOWN":
            return <OptionQuestion key={index} {...questionProps} />;
          case "LINEAR":
            return <LinearScaleQuestion key={index} {...questionProps} />;
          case "DATE":
          case "TIME":
            return <QuestionBase key={index} {...questionProps} />;
          default:
            return null;
        }
      })}

      <Fab
        color="primary"
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleAddButtonClick}
      >
        <AddIcon />
      </Fab>

      <CreateFormMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onAddQuestion={handleAddQuestion}
      />
    </Container>
  );
};

export default CreateFormPage;
