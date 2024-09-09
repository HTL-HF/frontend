import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormAnswerModel } from "../types/form";
import { useNotification } from "../hooks/notifications";
import { sendGetForm } from "../api/forms";
import { sendDeleteResponse, sendGetResponses } from "../api/responses";
import { answerComponentMap } from "../types/form";
import { Container, Typography, Box, styled } from "@mui/material";
import { ResponsesResponseModal } from "../types/response";
import NavigatorBar from "../components/NavigatorBar";
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

const ResponsesPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState<FormAnswerModel | null>(null);
  const { showNotification } = useNotification();
  const navigator = useNavigate();
  const [responses, setResponses] = useState<ResponsesResponseModal[]>([]);
  const [responseIndex, setResponseIndex] = useState(1);

  const currentResponse = useMemo(
    () => responses[responseIndex - 1],
    [responses, responseIndex]
  );

  useEffect(() => {
    const getForm = async (id: string | undefined) => {
      if (!id) {
        navigator("/404");
      } else {
        const form = await sendGetForm(id, showNotification, navigator);
        if (!form) {
          navigator("/login");
        } else {
          setForm(form);
        }
      }
    };
    getForm(id);
  }, [id, showNotification, navigator]);

  useEffect(() => {
    const getResponses = async (id: string | undefined) => {
      if (!id) {
        navigator("/404");
      } else {
        const responses = await sendGetResponses(
          id,
          navigator,
          showNotification
        );

        if (!responses) {
          navigator("/login");
        } else {
          setResponses(responses);
        }
      }
    };
    getResponses(id);
  }, [id, showNotification, navigator]);

  const handleDeleteResponse = async () => {
    if (id) {
      if (
        await sendDeleteResponse(
          id,
          currentResponse.id,
          navigator,
          showNotification
        )
      ) {
        setResponses(
          responses.filter((response) => response.id !== currentResponse.id)
        );
        console.log(responseIndex);
        setResponseIndex(responseIndex > 1 ? responseIndex - 1 : 1);

        showNotification("deleted response successfully", "success");
      }
    }
  };

  useEffect(() => console.log(responseIndex), [responseIndex]);
  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      {form && currentResponse && (
        <StyledBox>
          <StyledBox>
            <Typography variant="h3" gutterBottom>
              {form.title}
            </Typography>

            {form.description && (
              <Typography variant="body1">{form.description}</Typography>
            )}
          </StyledBox>
          <NavigatorBar
            onDelete={handleDeleteResponse}
            onChangeIndex={setResponseIndex}
            startIndex={1}
            endIndex={responses.length}
            currentIndex={responseIndex}
          />
          {form.questions.map((question) => {
            const AnswerComponent = answerComponentMap[question.viewType];
            const answerFromResponse = currentResponse.answers.find(
              (answer) => answer.questionId === question.id
            );
            return answerFromResponse ? (
              <AnswerComponent
                disable={true}
                answer={answerFromResponse.answer}
                question={question}
                key={question.id}
              />
            ) : null;
          })}
        </StyledBox>
      )}
    </Container>
  );
};

export default ResponsesPage;
