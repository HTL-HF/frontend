import React, { ReactNode } from "react";
import {
  ShortText,
  LinearScale,
  Subject,
  CheckBox,
  RadioButtonChecked,
  ArrowDropDownCircle,
  AccessTime,
  CalendarToday,
} from "@mui/icons-material";
import { QuestionModel } from "../types/form";
import MenuComponent from "./MenuComponent";

interface CreateFormMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onAddQuestion: (viewType: QuestionModel["viewType"]) => void;
}

const formQuestions: {
  viewType: QuestionModel["viewType"];
  label: string;
  icon: ReactNode;
}[] = [
  { viewType: "SHORT", label: "Short Answer", icon: <ShortText /> },
  { viewType: "LONG", label: "Long Answer", icon: <Subject /> },
  { viewType: "CHECKBOX", label: "Multiple Select", icon: <CheckBox /> },
  { viewType: "RADIO", label: "Single Select", icon: <RadioButtonChecked /> },
  { viewType: "DROPDOWN", label: "Dropdown", icon: <ArrowDropDownCircle /> },
  { viewType: "TIME", label: "Time", icon: <AccessTime /> },
  { viewType: "DATE", label: "Date", icon: <CalendarToday /> },
  { viewType: "LINEAR", label: "Linear Scale", icon: <LinearScale /> },
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
      menuItems={formQuestions.map(({ label, viewType: type, icon }) => {
        return { label, icon, action: () => onAddQuestion(type) };
      })}
    />
  );
};

export default CreateFormMenu;
