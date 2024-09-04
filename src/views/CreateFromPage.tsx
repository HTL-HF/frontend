import React, { useState } from "react";
import { Container, TextField, Box } from "@mui/material";
import CreateFormMenu from "../components/CreateFormMenu";
import { FormModel, questionComponentMap, QuestionModel } from "../types/form";
import AddButton from "../components/buttons/AddButton";
import SaveButton from "../components/buttons/SaveButton";
import { useNotification } from "../hooks/notifications";
import { sendCreateForm } from "../api/forms";
import { useNavigate } from "react-router-dom";

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

  const handleAddQuestion = (viewType: QuestionModel["viewType"]) => {
    const newQuestion: QuestionModel = {
      title: "",
      required: false,
      options:
        viewType === "LINEAR"
          ? [0, 2]
          : viewType === "CHECKBOX" ||
            viewType === "RADIO" ||
            viewType === "DROPDOWN"
          ? [""]
          : undefined,
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
          (q) =>
            !q.title ||
            (q.options && q.options.some((option) => !option && option !== 0))
        )
      ) {
        showNotification("All required fields must be filled!", "error");
        return;
      }

      if (await sendCreateForm(form, showNotification)) {
        navigator("/forms");
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

      {form.questions.map((question, index) => {
        const QuestionComponent = questionComponentMap[question.viewType];

        return (
          <QuestionComponent
            key={index}
            question={question}
            onChange={(updatedQuestion: QuestionModel) =>
              handleQuestionChange(index, updatedQuestion)
            }
            onDelete={() => handleQuestionDelete(index)}
          />
        );
      })}

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
