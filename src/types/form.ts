import LinearScaleQuestion from "../components/questions/LinearScaleQuestion";
import OptionQuestion from "../components/questions/OptionQuestion";
import QuestionBase from "../components/questions/QuestionBase";
import OpenQuestion from "../components/questions/OpenQuestion";

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
