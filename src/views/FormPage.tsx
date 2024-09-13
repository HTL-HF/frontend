import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendGetForm } from "../api/forms";
import { useNotification } from "../hooks/notifications";
import { FormAnswerModel } from "../types/form";
import { Container, Typography, styled } from "@mui/material";
import SaveButton from "../components/buttons/SaveButton";
import { ResponseModal } from "../types/response";
import moment from "moment";
import { sendResponse } from "../api/responses";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../utils/notifications";
import QuestionBox from "../components/questions/QuestionBox";
import Answers from "../components/answers/Answers";
import paths from "../configs/pathsConfig";

const StyledBox = styled(QuestionBox)(() => ({
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
        navigator(paths.notFound);
      } else {
        try {
          const form = await sendGetForm(id);
          if (!form) {
            navigator(paths.notFound);
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
              navigator(paths.notFound);
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

        try {
          await sendResponse(form.id, response);
          showNotification("sent answers", "success");
          navigator("/");
        } catch (err) {
          if (err instanceof AxiosError) {
            const statusMap = {
              [StatusCodes.UNAUTHORIZED]:
                "your Token is invalid try to logout and log back in",
              [StatusCodes.NOT_ACCEPTABLE]: err.response?.data,
            };

            showNotification(getErrorMessage(err, statusMap), "error");
          }
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
          <Answers
            questions={form.questions}
            answers={answers}
            setAnswers={setAnswers}
          />
          <SaveButton onClick={handleSaveResponse} />
        </StyledBox>
      )}
    </Container>
  );
};

export default FormPage;
