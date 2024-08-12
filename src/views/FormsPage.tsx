import { Container, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import FormItem from "../components/FormItem";

const formsData = [
  { id: 1, name: "Form 1" },
  { id: 2, name: "Form 2" },
  { id: 3, name: "Form 3" },
  { id: 4, name: "Form 4" },
];

const FormPage = () => {
  const [forms, setForms] = useState(formsData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    formId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedFormId(formId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFormId(null);
  };

  const handleDelete = () => {
    if (selectedFormId !== null) {
      setForms(forms.filter((form) => form.id !== selectedFormId));
      handleClose();
    }
  };

  const handleShare = () => {
    alert("Share feature not implemented yet!");
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
