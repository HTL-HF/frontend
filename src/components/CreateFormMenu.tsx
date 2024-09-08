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

const createFormItems: {
  type: QuestionModel["viewType"];
  label: string;
  icon: ReactNode;
}[] = [
  { type: "SHORT", label: "Short Answer", icon: <ShortText /> },
  { type: "LONG", label: "Long Answer", icon: <Subject /> },
  { type: "CHECKBOX", label: "Multiple Select", icon: <CheckBox /> },
  { type: "RADIO", label: "Single Select", icon: <RadioButtonChecked /> },
  { type: "DROPDOWN", label: "Dropdown", icon: <ArrowDropDownCircle /> },
  { type: "TIME", label: "Time", icon: <AccessTime /> },
  { type: "DATE", label: "Date", icon: <CalendarToday /> },
  { type: "LINEAR", label: "Linear Scale", icon: <LinearScale /> },
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
