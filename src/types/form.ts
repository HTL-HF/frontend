import LinearScaleQuestion from "../components/questions/LinearScaleQuestion";
import OptionQuestion from "../components/questions/OptionQuestion";
import QuestionBase from "../components/questions/QuestionBase";
import OpenQuestion from "../components/questions/OpenQuestion";
import ShortAnswer from "../components/answers/ShortAnswer";
import LongAnswer from "../components/answers/LongAnswer";
import CheckboxAnswer from "../components/answers/CheckboxAnswer";
import RadioAnswer from "../components/answers/RadioAnswer";
import DropdownAnswer from "../components/answers/DropdownAnswer";
import DateAnswer from "../components/answers/DateAnswer";
import TimeAnswer from "../components/answers/TimeAnswer";
import LinearScaleAnswer from "../components/answers/LinearScaleAnswer";

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

export type QuestionAnsweringModal = QuestionModel & { id: string };

export type FormAnswerModel = Omit<FormModel, "questions"> & {
  questions: QuestionAnsweringModal[];
};
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

export const answerComponentMap = {
  SHORT: ShortAnswer,
  LONG: LongAnswer,
  CHECKBOX: CheckboxAnswer,
  RADIO: RadioAnswer,
  DROPDOWN: DropdownAnswer,
  LINEAR: LinearScaleAnswer,
  DATE: DateAnswer,
  TIME: TimeAnswer,
};
