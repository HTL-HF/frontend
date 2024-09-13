import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormAnswerModel } from "../types/form";
import { useNotification } from "../hooks/notifications";
import { sendGetForm } from "../api/forms";
import { sendDeleteResponse, sendGetResponses } from "../api/responses";
import { Container, Typography, Box, styled } from "@mui/material";
import { ResponsesResponseModal } from "../types/response";
import NavigatorBar from "../components/NavigatorBar";
import paths from "../configs/pathsConfig";
import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import { getErrorMessage } from "../utils/notifications";
import Responses from "../components/Responses";
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

  useEffect(() => {
    const getResponses = async (id: string | undefined) => {
      if (!id) {
        navigator(paths.notFound);
      } else {
        try {
          const responses = await sendGetResponses(id);

          setResponses(responses);
        } catch (err) {
          if (err instanceof AxiosError) {
            const statusMap = {
              [StatusCodes.UNAUTHORIZED]: "You need to login!",
              [StatusCodes.NOT_FOUND]: "No such form",
              [StatusCodes.FORBIDDEN]: "Your not the owner of the form!",
            };

            showNotification(getErrorMessage(err, statusMap), "error");

            if (err.response?.status === StatusCodes.NOT_FOUND) {
              navigator(paths.forms);
            } else if (err.response?.status === StatusCodes.FORBIDDEN) {
              navigator(paths.home);
            }
          }
        }
      }
    };
    getResponses(id);
  }, [id, showNotification, navigator]);

  const handleDeleteResponse = async () => {
    if (id) {
      try {
        await sendDeleteResponse(id, currentResponse.id);
        setResponses(
          responses.filter((response) => response.id !== currentResponse.id)
        );
        setResponseIndex(responseIndex > 1 ? responseIndex - 1 : 1);

        showNotification("deleted response successfully", "success");
      } catch (err) {
        if (err instanceof AxiosError) {
          const statusMap = {
            [StatusCodes.UNAUTHORIZED]: "You need to login!",
            [StatusCodes.FORBIDDEN]: "You are not owner of this form",
            [StatusCodes.NOT_FOUND]: "No such form or response",
          };

          showNotification(getErrorMessage(err, statusMap), "error");

          if (err.response?.status === StatusCodes.NOT_FOUND) {
            navigator(paths.forms);
          }
        }
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
          <Responses
            questions={form.questions}
            answers={currentResponse.answers}
          />
        </StyledBox>
      )}
    </Container>
  );
};

export default ResponsesPage;
