import React, { useState } from "react";
import { Container, TextField, Box } from "@mui/material";
import CreateFormMenu from "../components/CreateFormMenu";
import { FormModel, QuestionModel } from "../types/form";
import AddButton from "../components/buttons/AddButton";
import SaveButton from "../components/buttons/SaveButton";
import { useNotification } from "../hooks/notifications";
import { sendCreateForm } from "../api/forms";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store/rootReducer";
import paths from "../configs/pathsConfig";
import Questions from "../components/questions/Questions";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../utils/notifications";

const CreateFormPage = () => {
  const { showNotification } = useNotification();
  const navigator = useNavigate();
  const [form, setForm] = useState<FormModel>({
    title: "",
    questions: [],
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAddButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getOptions = (viewType: QuestionModel["viewType"]) => {
    switch (viewType) {
      case "LINEAR":
        return [0, 2];
      case "CHECKBOX":
      case "RADIO":
      case "DROPDOWN":
        return [""];
      default:
        return undefined;
    }
  };

  const handleAddQuestion = (viewType: QuestionModel["viewType"]) => {
    const newQuestion: QuestionModel = {
      title: "",
      required: false,
      options: getOptions(viewType),
      type: viewType === "LINEAR" ? "number" : "string",
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
    const save = async () => {
      if (
        !form.title ||
        form.questions.some(
          (question) =>
            !question.title ||
            (question.options &&
              question.options.some((option) => !option && option !== 0))
        )
      ) {
        showNotification("All required fields must be filled!", "error");
        return;
      }
      try {
        await sendCreateForm(form);
        navigator(paths.forms);
      } catch (err) {
        if (err instanceof AxiosError) {
          const statusMap = {
            [StatusCodes.UNAUTHORIZED]: "You need to login",
            [StatusCodes.NOT_ACCEPTABLE]: err.response?.data,
          };

          showNotification(getErrorMessage(err, statusMap), "error");
        }
      }
    };

    save();
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <SaveButton onClick={handleSave} />
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
      />

      <Questions
        questions={form.questions}
        handleQuestionChange={handleQuestionChange}
        handleQuestionDelete={handleQuestionDelete}
      />

      <AddButton onClick={handleAddButtonClick} />

      <CreateFormMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onAddQuestion={handleAddQuestion}
      />
    </Container>
  );
};

export default CreateFormPage;
