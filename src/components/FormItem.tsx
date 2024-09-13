import React, { useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  MoreVert,
  Delete,
  Share,
  OpenInNew,
  BarChart,
} from "@mui/icons-material";
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
  const menuItems = useMemo(
    () => [
      { label: "Delete", icon: <Delete />, action: onDelete },
      {
        label: "Open",
        icon: <OpenInNew />,
        action: () => {
          navigator(paths.form(form.id));
        },
      },
      { label: "Share", icon: <Share />, action: onShare },
      {
        label: "Responses",
        icon: <BarChart />,
        action: () => navigator(paths.responses(form.id)),
      },
    ],
    [form.id, navigator, onShare, onDelete]
  );

  const open = useMemo(
    () => Boolean(anchorEl && selectedFormId === form.id),
    [anchorEl, selectedFormId, form.id]
  );

  return (
    <FormItemContainer>
      <Typography variant="h6" noWrap>
        {form.title}
      </Typography>

      <IconButton
        onClick={(event) => onMenuClick(event, form.id)}
        style={{ marginTop: "auto" }}
      >
        <MoreVert />
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
