import { Container, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormItem from "../components/FormItem";
import { useNotification } from "../hooks/notifications";
import { sendGetForms } from "../api/users";
import { sendDeleteForm } from "../api/forms";
import AddButton from "../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import paths from "../configs/pathsConfig";
import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "../utils/notifications";

const FormPage = () => {
  const [forms, setForms] = useState<{ id: string; title: string }[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const pageNavigator = useNavigate();

  useEffect(() => {
    const getForms = async () => {
      try {
        setForms(await sendGetForms());
      } catch (err) {
        const statusMap = {
          [StatusCodes.UNAUTHORIZED]: "You need to log in to access this.",
        };

        showNotification(getErrorMessage(err, statusMap), "error");
        pageNavigator(paths.login);
      }
    };
    getForms();
  }, [pageNavigator, showNotification]);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    formId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFormId(formId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFormId(null);
  };

  const handleDelete = () => {
    const deleteFromServerHandler = async () => {
      if (selectedFormId !== null) {
        setForms(forms.filter((form) => form.id !== selectedFormId));
        try {
          await sendDeleteForm(selectedFormId);
          showNotification("deleted form successfully", "success");

          handleClose();
        } catch (err) {
          const statusMap = {
            [StatusCodes.UNAUTHORIZED]: "You need to login",
          };
          showNotification(getErrorMessage(err, statusMap), "error");
        }
      }
    };
    deleteFromServerHandler();
  };

  const handleShare = () => {
    if (selectedFormId) {
      navigator.clipboard.writeText(
        `${window.location.origin}${paths.form(selectedFormId)}`
      );

      showNotification("copied link to your clipboard", "success");
    }
    handleClose();
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          My Forms
        </Typography>
        <Grid container spacing={2}>
          {forms.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <FormItem
                form={form}
                onMenuClick={handleMenuClick}
                anchorEl={anchorEl}
                selectedFormId={selectedFormId}
                onClose={handleClose}
                onDelete={handleDelete}
                onShare={handleShare}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <AddButton onClick={() => pageNavigator(paths.createForm)} />
    </>
  );
};

export default FormPage;
