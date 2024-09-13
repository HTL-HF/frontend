import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "../../themes/mainTheme";


interface AddButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Fab
      onClick={onClick}
      style={{ bottom: theme.spacing(2), right: theme.spacing(2) }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
