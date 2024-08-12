import { Box, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import React from "react";
import FormMenu from "./FormMenu";

interface FormItemProps {
  form: { id: number; name: string };
  onMenuClick: (event: React.MouseEvent<HTMLElement>, formId: number) => void;
  anchorEl: HTMLElement | null;
  selectedFormId: number | null;
  onClose: () => void;
  onDelete: () => void;
  onShare: () => void;
}

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      border={1}
      borderRadius={4}
      style={{ height: "150px", textAlign: "center" }}
    >
      <Typography variant="h6" noWrap>
        {form.name}
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
    </Box>
  );
};

export default FormItem;
