import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DeleteButton;
