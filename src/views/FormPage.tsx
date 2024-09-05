import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendGetForm } from "../api/forms";
import { useNotification } from "../hooks/notifications";
import { answerComponentMap, FormAnswerModel } from "../types/form";
import { Container, Typography, Box, styled } from "@mui/material";

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
  const [answers, setAnswers] = useState<{ [id: string]: string | number | string[] }>({});

  useEffect(() => {
    const getForm = async (id: string | undefined) => {
      if (!id) {
        navigator("/404");
      } else {
        const form = await sendGetForm(id, showNotification, navigator);
        if (!form) {
          navigator("/404");
        } else {
          setForm(form);
        }
      }
    };
    getForm(id);
  }, [id, showNotification, navigator]);

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
        </StyledBox>
      )}
    </Container>
  );
};

export default FormPage;
