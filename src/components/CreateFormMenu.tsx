import React, { ReactNode } from "react";
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
import MenuComponent from "./MenuComponent";

interface CreateFormMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onAddQuestion: (viewType: QuestionModel["viewType"]) => void;
}

const createFormItems: {
  type: QuestionModel["viewType"];
  label: string;
  icon: ReactNode;
}[] = [
  { type: "SHORT", label: "Short Answer", icon: <ShortTextIcon /> },
  { type: "LONG", label: "Long Answer", icon: <SubjectIcon /> },
  { type: "CHECKBOX", label: "Multiple Select", icon: <CheckBoxIcon /> },
  { type: "RADIO", label: "Single Select", icon: <RadioButtonCheckedIcon /> },
  { type: "DROPDOWN", label: "Dropdown", icon: <ArrowDropDownCircleIcon /> },
  { type: "TIME", label: "Time", icon: <AccessTimeIcon /> },
  { type: "DATE", label: "Date", icon: <CalendarTodayIcon /> },
  { type: "LINEAR", label: "Linear Scale", icon: <LinearScaleIcon /> },
];

const CreateFormMenu: React.FC<CreateFormMenuProps> = ({
  anchorEl,
  onClose,
  onAddQuestion,
}) => {
  return (
    <MenuComponent
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      menuItems={createFormItems.map(({ label, type, icon }) => {
        return { label, icon, action: () => onAddQuestion(type) };
      })}
    />
  );
};

export default CreateFormMenu;
