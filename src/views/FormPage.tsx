import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendGetForm } from "../api/forms";
import { useNotification } from "../hooks/notifications";
import { answerComponentMap, FormAnswerModel } from "../types/form";
import { Container, Typography, Box, styled } from "@mui/material";
import SaveButton from "../components/buttons/SaveButton";
import { ResponseModal } from "../types/response";
import moment from "moment";
import { sendResponse } from "../api/responses";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../utils/notifications";

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: "relative",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  wordBreak: "break-word",
}));

const FormPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState<FormAnswerModel | null>(null);
  const { showNotification } = useNotification();
  const navigator = useNavigate();
  const [answers, setAnswers] = useState<{
    [id: string]: string | number | string[];
  }>({});

  useEffect(() => {
    const getForm = async (id: string | undefined) => {
      if (!id) {
        navigator("/404");
      } else {
        try {
          const form = await sendGetForm(id);
          if (!form) {
            navigator("/404");
          } else {
            setForm(form);
          }
        } catch (err) {
          if (err instanceof AxiosError) {
            const statusMap = {
              [StatusCodes.UNAUTHORIZED]: "You need to login",
            };

            showNotification(getErrorMessage(err, statusMap), "error");
            
            if (err.response?.status == StatusCodes.NOT_FOUND) {
              navigator("/404");
            }
          }
        }
      }
    };
    getForm(id);
  }, [id, showNotification, navigator]);

  const handleSaveResponse = () => {
    const saveResponse = async () => {
      if (form) {
        const response: ResponseModal = {
          submittedAt: moment.now(),
          answers: [],
        };

        for (const question of form.questions) {
          const answer = answers[question.id];

          if (!answer && question.required && typeof answer !== "number") {
            showNotification(
              "not all required questions have been answered",
              "error"
            );
            return;
          }

          if (answer || typeof answer === "number") {
            if (
              (Array.isArray(answer) && answer.length > 0) ||
              !Array.isArray(answer)
            ) {
              response.answers.push({
                questionId: question.id,
                answer: answer,
              });
            }
          }
        }

        if (await sendResponse(form.id, response, showNotification)) {
          showNotification("sent answers", "success");
          navigator("/");
        }
      }
    };

    saveResponse();
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      {form && (
        <StyledBox>
          <StyledBox>
            <Typography variant="h3" gutterBottom>
              {form.title}
            </Typography>

            {form.description && (
              <Typography variant="body1">{form.description}</Typography>
            )}
          </StyledBox>
          {form.questions.map((question) => {
            const AnswerComponent = answerComponentMap[question.viewType];
            return (
              <AnswerComponent
                disable={false}
                answer={answers[question.id]}
                onChange={(value) => {
                  const newAnswers = { ...answers };
                  newAnswers[question.id] = value;
                  setAnswers(newAnswers);
                }}
                question={question}
                key={question.id}
              />
            );
          })}
          <SaveButton onClick={handleSaveResponse} />
        </StyledBox>
      )}
    </Container>
  );
};

export default FormPage;
