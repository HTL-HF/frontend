import React from "react";
import { Menu, MenuItem } from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { QuestionModel } from "../types/form";

interface CreateFormMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onAddQuestion: (viewType: QuestionModel["viewType"]) => void;
}

const CreateFormMenu: React.FC<CreateFormMenuProps> = ({
  anchorEl,
  onClose,
  onAddQuestion,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={() => onAddQuestion("SHORT")}>
        <ShortTextIcon />
        Short Answer
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("LONG")}>
        <SubjectIcon />
        Long Answer
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("CHECKBOX")}>
        <CheckBoxIcon />
        Multiple Select
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("RADIO")}>
        <RadioButtonCheckedIcon />
        Single Select
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("DROPDOWN")}>
        <ArrowDropDownCircleIcon />
        Dropdown
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("TIME")}>
        <AccessTimeIcon />
        Time
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("DATE")}>
        <CalendarTodayIcon />
        Date
      </MenuItem>
      <MenuItem onClick={() => onAddQuestion("LINEAR")}>
        <LinearScaleIcon />
        Linear Scale
      </MenuItem>
    </Menu>
  );
};

export default CreateFormMenu;
