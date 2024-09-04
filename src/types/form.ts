import LinearScaleQuestion from "../components/LinearScaleQuestion";
import OptionQuestion from "../components/OptionQuestion";
import QuestionBase from "../components/QuestionBase";
import OpenQuestion from "../components/OpenQuestion";

export interface QuestionModel {
  title: string;
  description?: string;
  required: boolean;
  options?: (string | number)[];
  type: "string" | "number";
  viewType:
    | "SHORT"
    | "LONG"
    | "CHECKBOX"
    | "RADIO"
    | "DROPDOWN"
    | "TIME"
    | "DATE"
    | "LINEAR";
}

export interface FormModel {
  title: string;
  description?: string;
  questions: QuestionModel[];
}

export const questionComponentMap = {
  SHORT: OpenQuestion,
  LONG: OpenQuestion,
  CHECKBOX: OptionQuestion,
  RADIO: OptionQuestion,
  DROPDOWN: OptionQuestion,
  LINEAR: LinearScaleQuestion,
  DATE: QuestionBase,
  TIME: QuestionBase,
};
