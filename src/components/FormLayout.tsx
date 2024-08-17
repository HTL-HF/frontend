import React, { ReactNode } from "react";
import { Container, Box, Typography, Button } from "@mui/material";

interface FormLayoutProps {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  buttonText: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  onSubmit,
  buttonText,
}) => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {children}

        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormLayout;
