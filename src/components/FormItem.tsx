import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";
import MenuComponent from "./MenuComponent";
import { useNavigate } from "react-router-dom";
import paths from "../configs/pathsConfig";

interface FormItemProps {
  form: { id: string; title: string };
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
  const navigator = useNavigate();
  const menuItems = [
    { label: "Delete", icon: <DeleteIcon />, action: onDelete },
    {
      label: "Open",
      icon: <OpenInNewIcon />,
      action: () => {
        navigator(paths.form(form.id));
      },
    },
    { label: "Share", icon: <ShareIcon />, action: onShare },
  ];

  const open = Boolean(anchorEl && selectedFormId === form.id);

  return (
    <FormItemContainer>
      <Typography variant="h6" noWrap>
        {form.title}
      </Typography>

      <IconButton
        onClick={(event) => onMenuClick(event, form.id)}
        style={{ marginTop: "auto" }}
      >
        <MoreVertIcon />
      </IconButton>

      <MenuComponent
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        menuItems={menuItems}
      />
    </FormItemContainer>
  );
};

export default FormItem;
