import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import FormMenu from "./FormMenu";

interface FormItemProps {
  form: { id: string; filename: string };
  onMenuClick: (event: React.MouseEvent<HTMLElement>, formId: string) => void;
  anchorEl: HTMLElement | null;
  selectedFormId: string | null;
  onClose: () => void;
  onDelete: () => void;
  onShare: () => void;
}

const FormItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  height: "150px",
  textAlign: "center",
}));

const FormItem: React.FC<FormItemProps> = ({
  form,
  onMenuClick,
  anchorEl,
  selectedFormId,
  onClose,
  onDelete,
  onShare,
}) => {
  return (
    <FormItemContainer>
      <Typography variant="h6" noWrap>
        {form.filename}
      </Typography>

      <IconButton
        onClick={(event) => onMenuClick(event, form.id)}
        style={{ marginTop: "auto" }}
      >
        <MoreVertIcon />
      </IconButton>
      <FormMenu
        form={form}
        anchorEl={anchorEl}
        selectedFormId={selectedFormId}
        onClose={onClose}
        onDelete={onDelete}
        onShare={onShare}
      />
    </FormItemContainer>
  );
};

export default FormItem;
