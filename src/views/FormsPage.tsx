import { Container, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormItem from "../components/FormItem";
import usersApi from "../api/users";
import formsApi from "../api/forms";
import { toast } from "react-toastify";

const FormPage = () => {
  const [forms, setForms] = useState<{ id: string; filename: string }[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  useEffect(() => {
    const getForms = async () => {
      const forms = await usersApi.forms();
      // if (forms) setForms(forms);
    };
    getForms();
  }, []);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    formId: string
  ) => {
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
        await formsApi.deleteForm(selectedFormId);
        handleClose();
      }
    };
    deleteFromServerHandler();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `{window.location.origin}/forms/${selectedFormId}`
    );

    toast("copied link to your clipboard", { type: "success" });

    handleClose();
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
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
  );
};

export default FormPage;
