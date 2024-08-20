import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface AddButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <StyledFab onClick={onClick}>
      <AddIcon />
    </StyledFab>
  );
};

export default AddButton;
