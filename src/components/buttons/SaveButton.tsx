import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Fab } from "@mui/material";

const SaveButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      <Fab
        color="primary"
        style={{ position: "fixed", top: 38, right: 16 }}
        onClick={onClick}
      >
        <SaveIcon />
      </Fab>
    </div>
  );
};

export default SaveButton;
